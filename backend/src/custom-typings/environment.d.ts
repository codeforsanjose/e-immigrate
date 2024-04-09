declare global {
    namespace NodeJS {
        interface ProcessEnv {
            JWT_KEY: string;
            MONGO_URI: string;
            SENDGRID_API_KEY: string;
            SENDER_EMAIL: string;
            PORT?: string | number;
            /**
             *  Set this to the string 'yes' to enable registration.
             *
             * @type {string}
             * @memberof ProcessEnv
             */
            ALLOW_REGISTRATIONS?: string;
            PINO_MINIMUM_LOG_LEVEL?: string;
        }
    }
}
export {}