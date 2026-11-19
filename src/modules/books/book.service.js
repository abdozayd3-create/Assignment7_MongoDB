const { db } = require('../../DB/connection.db');

// 5. Insert one document into the books collection
const insertOneBook = async (req, res) => {
    try {
        if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body) || typeof req.body.title !== 'string' || !req.body.title.trim()) {
            return res.status(400).json({ message: 'A non-empty title is required' });
        }
        const result = await db.collection('books').insertOne(req.body);
        return res.status(201).json({
            acknowledged: result.acknowledged,
            insertedId: result.insertedId
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// 6. Insert multiple documents into the books collection (at least 3 records)
const insertBatchBooks = async (req, res) => {
    try {
        if (!Array.isArray(req.body) || req.body.length < 3) {
            return res.status(400).json({ message: 'Please provide an array of at least 3 books' });
        }
        const result = await db.collection('books').insertMany(req.body);
        return res.status(201).json({
            acknowledged: result.acknowledged,
            insertedIds: result.insertedIds
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// 8. Update the book with title "Future" change the year to be 2022
const updateBookYearByTitle = async (req, res) => {
    try {
        const { title } = req.params;
        const year = req.body?.year ?? 2022;
        const result = await db.collection('books').updateOne(
            { title },
            { $set: { year } }
        );
        return res.status(200).json({
            acknowledged: result.acknowledged,
            matchedCount: result.matchedCount,
            modifiedCount: result.modifiedCount
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// 9. Find a Book with title "Brave New World"
const findBookByTitle = async (req, res) => {
    try {
        const { title } = req.query;
        const book = await db.collection('books').findOne({ title });
        return res.status(200).json(book);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// 10. Find all books published between 1990 and 2010
const findBooksByYearRange = async (req, res) => {
    try {
        const from = Number(req.query.from);
        const to = Number(req.query.to);
        const books = await db.collection('books').find({
            year: { $gte: from, $lte: to }
        }).toArray();
        return res.status(200).json(books);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// 11. Find books where the genre includes "Science Fiction"
const findBooksByGenre = async (req, res) => {
    try {
        const { genre } = req.query;
        const books = await db.collection('books').find({
            genres: genre
        }).toArray();
        return res.status(200).json(books);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// 12. Skip the first two books, limit the results to the next three, sorted by year descending
const getBooksSkipLimit = async (req, res) => {
    try {
        const books = await db.collection('books')
            .find()
            .sort({ year: -1 })
            .skip(2)
            .limit(3)
            .toArray();
        return res.status(200).json(books);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// 13. Find books where the year field is stored as an integer
const getBooksYearInteger = async (req, res) => {
    try {
        const books = await db.collection('books').find({
            year: { $type: 'int' }
        }).toArray();
        return res.status(200).json(books);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// 14. Find all books where the genres field does not include "Horror" or "Science Fiction"
const getBooksExcludeGenres = async (req, res) => {
    try {
        const books = await db.collection('books').find({
            genres: { $nin: ['Horror', 'Science Fiction'] }
        }).toArray();
        return res.status(200).json(books);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// 15. Delete all books published before 2000
const deleteBooksBeforeYear = async (req, res) => {
    try {
        const year = Number(req.query.year);
        const result = await db.collection('books').deleteMany({
            year: { $lt: year }
        });
        return res.status(200).json({
            acknowledged: result.acknowledged,
            deletedCount: result.deletedCount
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// 16. Aggregation 1: Filter books published after 2000 and sort them by year descending
const aggregate1 = async (req, res) => {
    try {
        const books = await db.collection('books').aggregate([
            { $match: { year: { $gt: 2000 } } },
            { $sort: { year: -1 } }
        ]).toArray();
        return res.status(200).json(books);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// 17. Aggregation 2: Books published after 2000, show only title, author, and year
const aggregate2 = async (req, res) => {
    try {
        const books = await db.collection('books').aggregate([
            { $match: { year: { $gt: 2000 } } },
            { $project: { _id: 0, title: 1, author: 1, year: 1 } }
        ]).toArray();
        return res.status(200).json(books);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// 18. Aggregation 3: Break an array of genres into separate documents
const aggregate3 = async (req, res) => {
    try {
        const books = await db.collection('books').aggregate([
            { $unwind: '$genres' },
            { $project: { _id: 0, title: 1, genres: 1 } }
        ]).toArray();
        return res.status(200).json(books);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// 19. Aggregation 4: Join the books collection with the logs collection
const aggregate4 = async (req, res) => {
    try {
        const result = await db.collection('logs').aggregate([
            {
                $addFields: {
                    bookObjId: {
                        $convert: {
                            input: '$book_id',
                            to: 'objectId',
                            onError: null,
                            onNull: null
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: 'books',
                    localField: 'bookObjId',
                    foreignField: '_id',
                    as: 'book_details'
                }
            },
            {
                $project: {
                    _id: 0,
                    action: 1,
                    'book_details.title': 1,
                    'book_details.author': 1,
                    'book_details.year': 1
                }
            }
        ]).toArray();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports = {
    insertOneBook,
    insertBatchBooks,
    updateBookYearByTitle,
    findBookByTitle,
    findBooksByYearRange,
    findBooksByGenre,
    getBooksSkipLimit,
    getBooksYearInteger,
    getBooksExcludeGenres,
    deleteBooksBeforeYear,
    aggregate1,
    aggregate2,
    aggregate3,
    aggregate4
};
