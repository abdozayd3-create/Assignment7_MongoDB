# Assignment 7 – MongoDB & Express.js

This project contains the Express.js + MongoDB implementation, MongoDB Shell solutions, a Postman collection for all 19 required endpoints, and the optional Roman to Integer bonus solution.

## Requirements

- Node.js 18 or newer
- MongoDB running locally, or a MongoDB connection URI

## Run the API

```bash
npm install
cp .env.example .env
npm start
```

The API runs at `http://localhost:3000` by default. You can check it at `GET /health`.

If MongoDB is hosted elsewhere, edit `MONGODB_URI` in `.env`. The database name defaults to `assignment7_library`.

## Postman

Import `postman/Assignment7.postman_collection.json` into Postman. It contains all 19 requests with meaningful names and example request bodies/query parameters.

Recommended order:

1. Run requests 01–04 to create the collections and index. These are setup operations and should normally be run once on a fresh database.
2. Run request 05 to insert `Book1`. Its test script saves the returned MongoDB ID in the collection variable `bookId`.
3. Run request 06 to insert at least three books.
4. Run request 07 to insert a log linked to `Book1` using `{{bookId}}`.
5. Run requests 08–14 and 16–19 to test update, find, and aggregation operations.
6. Run request 15 last because it deletes books published before 2000.

The collection uses `baseUrl=http://localhost:3000`. Change this collection variable if your server uses another host or port.

## MongoDB Shell solutions

Open `mongosh`, switch to the `assignment7_library` database, then run the commands in `mongosh-solutions.txt` in order. The log insertion uses the actual `_id` of `Book1`, so aggregation question 19 can return a matching book.

## Bonus

`bonus.js` contains the Roman to Integer solution for the optional LeetCode bonus.
