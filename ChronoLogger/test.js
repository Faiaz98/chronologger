// test.js

const ChronoLogger = require('./ChronoLogger');

const logger = new ChronoLogger('example.log');

logger.log('This is an info message');
logger.log('This is a warning message', 'warning');
logger.log('This is an error message', 'error');

const startTime = new Date('2024-01-01T00:00:00Z');
const endTime = new Date();

logger.getLogs(startTime, endTime, (err, logs) => {
    if (err) {
        console.error('Error retrieving logs:', err);
    } else {
        console.log('Logs within the specified time range:', logs);
    }
});

// Additional testing for log levels and log format customization
logger.setLogLevel('error');

logger.log('This should be logged');
logger.log('This should be logged as well', 'warning');
logger.log('This should not be logged', 'info');

logger.setLogFormat('[{timestamp}] ({level}): {message}');

logger.log('Custom log format test');

// Uncomment the line below to test log file clearing
// logger.clearLogs((err) => console.log(err ? 'Error clearing logs' : 'Logs cleared successfully'));