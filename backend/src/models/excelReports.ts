import mongoose from 'mongoose';
import { User } from './user.js';

const Schema = mongoose.Schema;

const excelReportSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    data: { type: Buffer, required: true },
    filename: { type: String, required: true },
    dateGenerated: Date,
    user: { type: mongoose.Schema.Types.ObjectId, ref: User },
});

export const ExcelReports = mongoose.model('ExcelReports', excelReportSchema);
