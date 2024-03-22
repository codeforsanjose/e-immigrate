import mongoose from 'mongoose';
import { User } from './user.js';
import { WithDefaultMongooseId } from './core/types.js';



export type ExcelReportEntity = {
    data: Buffer;
    filename: string;
    dateGenerated: Date;
    issuper?: boolean;
    user: mongoose.Schema.Types.ObjectId;
};
export type ExcelReportEntityWithId = WithDefaultMongooseId<ExcelReportEntity>;


const excelReportSchema = new mongoose.Schema<ExcelReportEntity>({
    data: { type: Buffer, required: true },
    filename: { type: String, required: true },
    dateGenerated: { type: Date, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: User },
});

export const ExcelReports = mongoose.model<ExcelReportEntity>('ExcelReports', excelReportSchema);
