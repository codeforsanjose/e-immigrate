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
