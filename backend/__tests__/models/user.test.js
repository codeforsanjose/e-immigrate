const { describe, expect, it } = require('@jest/globals');
const useFakeDatabase = require('./util');
const User = require('../../models/user');
const {
    Error: { MongoServerError, ValidationError },
} = require('mongoose');

describe('User Model', () => {
    useFakeDatabase(User);
    it('Fails on missing phone number', () =>
        expect(() =>
            User.create({ name: 'test', document: 'test' })
        ).rejects.toThrowError(ValidationError));
    it('Fails on duplicate phone numbers', async () => {
        const user1 = new User({ phoneNumber: 1234567890 });
        const user2 = new User({ phoneNumber: user1.phoneNumber });
        await user1.save();
        return expect(user2.save()).rejects.toThrowError(MongoServerError);
    });
    it('Successfully creates a user', () => {
        const name = 'test';
        const phoneNumber = 1234567890;
        const document = 'test';
        const user1 = new User({ name, phoneNumber, document });
        expect(user1.name).toBe(name);
        expect(user1.phoneNumber).toBe(phoneNumber);
        expect(user1.document).toBe(document);
    });
});
