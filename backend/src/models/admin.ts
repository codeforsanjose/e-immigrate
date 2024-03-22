import mongoose from 'mongoose';
import { WithDefaultMongooseId } from './core/types.js';

export type AdminEntity = {
    email: string;
    name: string;
    password: string;
    issuper?: boolean;
    /**
     *  list of questionnaires.title
     *
     * @type {Array<string>}
     */
    questionnaires?: Array<string>;
};
export type AdminEntityWithId = WithDefaultMongooseId<AdminEntity>;

const adminSchema = new mongoose.Schema<AdminEntity>({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    issuper: {
        type: Boolean,
        required: false,
    },
    questionnaires: {
        // list of questionnaires.title
        type: [String],
        required: false,
    },
});

export const Admin = mongoose.model<AdminEntity>('Admin', adminSchema);
