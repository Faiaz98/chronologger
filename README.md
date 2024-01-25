# ChronoLogger

## Overview

ChronoLogger is a time-based logging library for Node.js. It automatically adds timestamps to log entries and provides a way to retrieve logs within a specified time range.

## Installation

```bash
npm install chronologger
```

# Usage

```
const ChronoLogger = require('chronologger');

// Create a new instance of ChronoLogger with a log file path
const logger = new ChronoLogger('example.log');

// Log messages with different log levels
logger.log('This is an info message');
logger.log('This is a warning message', 'warning');
logger.log('This is an error message', 'error');

// Retrieve logs within a specified time range
const startTime = new Date('2024-01-01T00:00:00Z');
const endTime = new Date();
logger.getLogs(startTime, endTime, (err, logs) => {
  if (err) {
    console.error('Error retrieving logs:', err);
  } else {
    console.log('Logs within the specified time range:', logs);
  }
});

// Additional features: log level customization and log format customization
logger.setLogLevel('error');
logger.log('This should be logged');
logger.log('This should be logged as well', 'warning');
logger.log('This should not be logged', 'info');

logger.setLogFormat('[{timestamp}] ({level}): {message}');
logger.log('Custom log format test');

```
For more advanced usage and customization options, refer to the API documentation.

# API Documentation

Please see API.md for detailed documentation on the ChronoLogger API.


### API Documentation (API.md):

```markdown
# ChronoLogger API

## Constructor

```javascript
const logger = new ChronoLogger(logFilePath, logLevel);

