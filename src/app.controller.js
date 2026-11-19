const { connectDB } = require('./DB/connection.db');
const collectionRouter = require('./modules/collection/collection.controller');
const bookRouter = require('./modules/books/book.controller');
const logRouter = require('./modules/logs/log.controller');

const bootstrap = async (app, express) => {
    app.use(express.json());

    // Do not start accepting requests until MongoDB is connected.
    await connectDB();

    app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));
    app.use('/collection', collectionRouter);
    app.use('/books', bookRouter);
    app.use('/logs', logRouter);

    app.use((req, res) => {
        res.status(404).json({ message: 'Route not found' });
    });
};

module.exports = bootstrap;
