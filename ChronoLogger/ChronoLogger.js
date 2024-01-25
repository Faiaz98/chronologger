// ChronoLogger.js

const fs = require('fs');

class ChronoLogger {
    constructor(logFilePath, logLevel = 'info') {
        this.logFilePath = logFilePath;
        this.logLevel = logLevel;
    }

    log(message, level = 'info') {
        try {
            const timestamp = new Date().toISOString();
            const formattedMessage = this.formatLogEntry(timestamp, message, level);

            if (this.shouldLog(level)) {
                fs.appendFile(this.logFilePath, formattedMessage, (err) => {
                    if (err) {
                        console.error('Error writing to log file:', err);
                    }
                });
            }
        } catch (error) {
            console.error('Error occurred while logging:', error);
        }
    }

    shouldLog(entryLevel) {
        const levels = ['info', 'warning', 'error'];
        const currentLevelIndex = levels.indexOf(this.logLevel);
        const entryLevelIndex = levels.indexOf(entryLevel);

        return entryLevelIndex >= 0 && entryLevelIndex >= currentLevelIndex;
    }

    getLogs(startTime, endTime, callback) {
        fs.readFile(this.logFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading log file:', err);
                return callback(err, null);
            }

            const logs = data
                .split('\n')
                .filter((entry) => {
                    const timestamp = new Date(entry.split(' - ')[0]);
                    return timestamp >= startTime && timestamp <= endTime;
                });

            callback(null, logs);
        });
    }

    setLogLevel(logLevel) {
        this.logLevel = logLevel;
    }

    setLogFormat(format) {
        this.logFormat = format;
    }

    clearLogs(callback) {
        fs.writeFile(this.logFilePath, '', (err) => {
            if (err) {
                console.error('Error clearing log file:', err);
                return callback(err);
            }
            console.log('Log file cleared successfully.');
            callback(null);
        });
    }

    formatLogEntry(timestamp, message, level) {
        if (this.logFormat) {
            return this.logFormat
                .replace('{timestamp}', timestamp)
                .replace('{level}', level.toUpperCase())
                .replace('{message}', message);
        } else {
            return `${timestamp} [${level.toUpperCase()}] - ${message}\n`;
        }
    }
}

module.exports = ChronoLogger;