require('express-async-errors');



const express = require('express');

const app = express();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

process.on('uncaughtException', (ex) => {
	console.log('UNCAUGHT EXCEPTION: ' + ex.message);
	process.exit(1);
});
process.on('unhandledRejection', (ex) => {
	console.log('UNHANDLED REJECTION: ' + ex.message);
	process.exit(1);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Listening on port ${port}....`);
});


//const winston = require('winston');
// const logger = winston.createLogger({
// 	level: 'Error',
// 	transports: [
// 		new winston.transports.Console(),
// 		new winston.transports.File({
// 			filename: 'logfile.log'
// 		})
// 	]
// });

// const p = Promise.reject(new Error('Something failed miserably.'));
// p.then(() => console.log('Done'));

// winston.add(winston.transports.File, {
// 	filename: 'logfile.log'
// });