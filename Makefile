SHELL := /bin/bash -e -o pipefail

# Location of Docker images and Helm charts
AWS_ACCOUNT_ID ?= 000000000000
AWS_REGION ?= us-west-2

# Docker image build arguments
BUILD_ID := $(shell git rev-parse --short HEAD)
REFERENCE := $(shell git rev-parse HEAD)
COMMIT_SHA := ${REFERENCE}

# AWS EKS / Helm deployments
DEPLOYMENT ?= eimmigrate-dev
EKS_CLUSTER_NAME := shared-cluster-prod

.EXPORT_ALL_VARIABLES:

#   Docker local development
## ------------------------
build: aws-cli-creds
build: ## Build Docker image
	docker buildx bake --print
	docker buildx bake

run: ## Run the app
	docker compose up -d

start-db: ## Start Postgres DB
	docker compose up ra-master-db -d

logs: ## Tail docker compose logs
	docker compose logs -f

dump-mongo:
	docker run --rm \
	-v ./dump:/dump \
	mongo:latest \
	/bin/sh -c 'mongodump --uri="$(MONGO_USERNAME):$(MONGO_PASSWORD)@$(MONGO_URL)" --db $(MONGO_DB) --out=/dump'

restore-mongo: ## Restore DB from dump file
	docker run --rm \
	-v ./dump:/dump \
	mongo:latest \
	/bin/sh -c 'mongorestore --host=host.docker.internal -u eimmigrate -p eimmigrate --db=$(MONGO_DB) --authenticationDatabase=admin --verbose /dump/$(MONGO_DB)'


#   Docker utility commands
## ------------------------
buildx: ## Create Docker buildx instance
	-docker buildx create \
		--name cfsj \
		--bootstrap --use \
		--driver docker-container \
		--platform linux/amd64,linux/arm64

clean: ## Clean up old images, stopped containers, and other build artifacts for this service.
	-docker system prune -f -a --filter label='org.opensourcesanjose.app=eimmigrate' ${EXTRA_CLEAN_ARGS}

scorched-earth: ## Factory reset. This will also remove the database volume!
	-docker compose down
	make clean
	docker volume rm ra-master-db-data ra-master-redis-data ra-master-cache ra-master-tmp

login-ecr: ## Log into AWS Elastic Container Registry (ECR)
	aws ecr get-login-password --region us-west-2 | \
	docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com


#   Helm/Kubectl commands
## ------------------------
login-eks-cluster: ## Update kubeconfig for AWS EKS Cluster
	aws eks --region us-west-2 update-kubeconfig \
		--name ${EKS_CLUSTER_NAME}

deploy: login-eks-cluster
deploy: ## Deploy Helm chart into AWS EKS
	helm dependency update deployments/${DEPLOYMENT}
	helm upgrade \
		--set global.image.tag=${COMMIT_SHA} \
		${DEPLOYMENT} deployments/${DEPLOYMENT} \
		--install --wait \
		--dependency-update \
		--namespace ${DEPLOYMENT}

deploy-status: login-eks-cluster
deploy-status: ## View status of Helm release/deploy
	helm status \
		${DEPLOYMENT} \
		--namespace ${DEPLOYMENT} \
		--show-resources

logs-%: login-eks-cluster
logs-%: ## Tail logs for k8s deployment
	kubectl logs deploy/$* -c $* -n ${DEPLOYMENT} -f

aws-cli-creds:
ifndef CI
	export AWS_ACCESS_KEY_ID=$(shell aws configure get cfsj.aws_access_key_id)
	export AWS_SECRET_ACCESS_KEY=$(shell aws configure get cfsj.aws_secret_access_key)
endif

help: ## Show this help.
	@sed -ne '/@sed/!s/## //p' $(MAKEFILE_LIST) | \
	sed -E 's/^([a-zA-Z0-9%_-]+):\s+(\w+)/$(GREEN)\1$(END_COLOR):~\u\2/' | \
	sed -E 's/(.*)(EX:)(.*)/\1$(YELLOW)\2\3$(END_COLOR)/' | \
	column -s '~' -t
