const { db } = require('../../DB/connection.db');

// 7. Insert a new log into the logs collection
const insertLog = async (req, res) => {
    try {
        const result = await db.collection('logs').insertOne(req.body);
        return res.status(201).json({
            acknowledged: result.acknowledged,
            insertedId: result.insertedId
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports = {
    insertLog
};
