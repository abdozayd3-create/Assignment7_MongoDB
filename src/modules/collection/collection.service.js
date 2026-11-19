const { db } = require('../../DB/connection.db');

// 1. Create explicit collection 'books' with validation rule for non-empty 'title'
const createBooksCollection = async (req, res) => {
    try {
        await db.createCollection('books', {
            validator: {
                $jsonSchema: {
                    bsonType: 'object',
                    required: ['title'],
                    properties: {
                        title: {
                            bsonType: 'string',
                            minLength: 1,
                            description: 'title must be a non-empty string and is required'
                        }
                    }
                }
            }
        });
        return res.status(201).json({ ok: 1 });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// 2. Create implicit collection 'authors' by inserting data directly
const createAuthorsCollection = async (req, res) => {
    try {
        const result = await db.collection('authors').insertOne(req.body);
        return res.status(201).json({
            acknowledged: result.acknowledged,
            insertedId: result.insertedId
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// 3. Create capped collection 'logs' with size limit of 1MB (1048576 bytes)
const createLogsCappedCollection = async (req, res) => {
    try {
        await db.createCollection('logs', {
            capped: true,
            size: 1048576
        });
        return res.status(201).json({ ok: 1 });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// 4. Create an index on the books collection for the title field
const createBooksTitleIndex = async (req, res) => {
    try {
        const indexName = await db.collection('books').createIndex({ title: 1 });
        return res.status(201).json(indexName);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createBooksCollection,
    createAuthorsCollection,
    createLogsCappedCollection,
    createBooksTitleIndex
};
