SHELL := /bin/bash -e -o pipefail

# Location of Docker images and Helm charts
AWS_ECR_REGISTRY := 402056942761.dkr.ecr.us-east-1.amazonaws.com

# Docker image build arguments
BUILD_ID := $(shell git rev-parse --short HEAD)
REFERENCE := $(shell git rev-parse HEAD)
COMMIT_SHA := ${REFERENCE}

# Docker local development
# MASTER_TEAM_NAME ?= livgolf
MASTER_TEAM_NAME := livgolf

# AWS EKS / Helm deployments
DEPLOYMENT ?= demo-dev
EKS_CLUSTER_NAME := shared-cluster-$(shell echo ${DEPLOYMENT} | cut -d'-' -f2)

.EXPORT_ALL_VARIABLES:


#   Docker local development
## ------------------------
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
		--name recentive \
		--bootstrap --use \
		--driver docker-container \
		--platform linux/amd64,linux/arm64

clean: ## Clean up old images, stopped containers, and other build artifacts for this service.
	-docker system prune -f -a --filter label='tech.recentive.app=ra-master' ${EXTRA_CLEAN_ARGS}

scorched-earth: ## Factory reset. This will also remove the database volume!
	-docker compose down
	make clean
	docker volume rm ra-master-db-data ra-master-redis-data ra-master-cache ra-master-tmp

login-ecr: ## Log into AWS Elastic Container Registry (ECR)
	aws ecr get-login-password --region us-east-1 | \
	docker login --username AWS --password-stdin ${AWS_ECR_REGISTRY}

help: ## Show this help.
	@sed -ne '/@sed/!s/## //p' $(MAKEFILE_LIST) | \
	sed -E 's/^([a-zA-Z0-9%_-]+):\s+(\w+)/$(GREEN)\1$(END_COLOR):~\u\2/' | \
	sed -E 's/(.*)(EX:)(.*)/\1$(YELLOW)\2\3$(END_COLOR)/' | \
	column -s '~' -t
