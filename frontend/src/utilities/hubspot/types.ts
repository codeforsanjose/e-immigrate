export type CreateHubspotFormInput = {
    portalId: string;
    formId: string;
    target: string;
};
export type HbsptGlobal = {
    forms: {
        create: (value: CreateHubspotFormInput) => void;
    };
};