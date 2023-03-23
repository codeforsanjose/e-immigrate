const Admin = require('../../models/admin');
const { describe, expect, it } = require('@jest/globals');
const {
    Error: { ValidationError, MongoServerError },
    Types: { ObjectId },
} = require('mongoose');
const useFakeDatabase = require('./util');

describe('Admin Model', () => {
    useFakeDatabase(Admin);
    it('Fails on missing fields', () => {
        expect(
            Admin.create({ name: 'name', password: 'password' })
        ).rejects.toThrow(ValidationError);
        expect(
            Admin.create({ email: 'test@email.com', password: 'password' })
        ).rejects.toThrow(ValidationError);
        expect(
            Admin.create({ name: 'name', email: 'test@email.com' })
        ).rejects.toThrow(ValidationError);
    });
    it('Fails on bad email pattern', () => {
        expect(() =>
            Admin.create({ email: 'email', name: 'name', password: 'password' })
        ).rejects.toThrow(ValidationError);
    });
    it('Fails on duplicates', async () => {
        const admin1 = new Admin({
            _id: ObjectId(),
            email: 'test@email.com',
            name: 'name',
            password: 'password',
        });
        const admin2 = new Admin({
            _id: ObjectId(),
            email: admin1.email,
            name: 'name',
            password: 'password',
        });
        await admin1.save();
        return expect(admin2.save()).rejects.toThrowError(MongoServerError);
    });
    it('Successfully creates', async () => {
        const _id = ObjectId();
        const email = 'test@email.com';
        const name = 'test';
        const password = 'password';
        const issuper = true;
        const questionnaires = ['test'];
        const admin = new Admin({
            _id,
            email,
            name,
            password,
            issuper,
            questionnaires,
        });
        const doc = await admin.save();
        expect(doc._id).toBe(_id);
        expect(doc.email).toBe(email);
        expect(doc.password).toBe(password);
        expect(doc.issuper).toBe(issuper);
        expect(doc.questionnaires).toStrictEqual(questionnaires);
    });
});
