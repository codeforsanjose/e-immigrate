const {
    MongoMemoryServer: { create },
} = require('mongodb-memory-server');
const mongoose = require('mongoose');
function useFakeDatabase(Model) {
    let server;
    beforeAll(async () => {
        server = await create();
        await mongoose.connect(server.getUri());
        mongoose.set('strictQuery', true);
    });
    afterAll(async () => {
        await mongoose.disconnect();
        await server.stop();
    });
    afterEach(() => Model.deleteMany({}));
}

module.exports = useFakeDatabase;
