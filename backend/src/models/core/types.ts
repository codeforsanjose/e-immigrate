import mongoose from 'mongoose';

export type EntityWithUnderscoreId = {
    _id: mongoose.Types.ObjectId;
};

type BaseEntity = Record<string, unknown>;
export type WithDefaultMongooseId<T extends BaseEntity> = EntityWithUnderscoreId & T;
export type WithMongooseTimestamps<T extends BaseEntity> = T & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
};


export type GetEntityModel<TModel> = 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    TModel extends mongoose.Model<infer TRawDocType, infer TQueryHelpers, infer _, infer _, infer THydratedDocumentType> 
        ? NonNullable<Awaited<mongoose.QueryWithHelpers<THydratedDocumentType | null, THydratedDocumentType, TQueryHelpers, TRawDocType, 'findOne'>>>
        : never
;