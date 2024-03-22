declare global {
    namespace NodeJS {
        interface ProcessEnv {
            JWT_KEY: string;
            MONGO_URI: string;
            SENDGRID_API_KEY: string;
            SENDER_EMAIL: string;
            PORT?: string | number;
        }
    }
}
export {}