const express = require('express');
const bootstrap = require('./src/app.controller');

const app = express();
const port = Number(process.env.PORT) || 3000;

bootstrap(app, express)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Application startup failed:', error);
        process.exit(1);
    });
