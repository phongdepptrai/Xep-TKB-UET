// Debug logging system - ghi logs ra file
class DebugLogger {
    constructor() {
        this.logs = [];
        this.isEnabled = true;
        this.logFileName = 'tkb-debug.txt';
        this.maxLogs = 1000; // Giới hạn số logs để tránh file quá lớn
    }
    
    log(level, message, data = null) {
        if (!this.isEnabled) return;
        
        const timestamp = new Date().toISOString();
        const logEntry = {
            timestamp,
            level,
            message,
            data: data ? JSON.stringify(data, null, 2) : null
        };
        
        this.logs.push(logEntry);
        
        // Giới hạn số logs
        if (this.logs.length > this.maxLogs) {
            this.logs = this.logs.slice(-this.maxLogs);
        }
        
        // Console log với emoji
        const emoji = {
            'INFO': '🔍',
            'WARN': '⚠️',
            'ERROR': '❌',
            'SUCCESS': '✅',
            'DEBUG': '🐛'
        };
        
        console.log(`${emoji[level] || '📝'} [${timestamp}] ${message}`, data || '');
    }
    
    info(message, data) { this.log('INFO', message, data); }
    warn(message, data) { this.log('WARN', message, data); }
    error(message, data) { this.log('ERROR', message, data); }
    success(message, data) { this.log('SUCCESS', message, data); }
    debug(message, data) { this.log('DEBUG', message, data); }
    
    saveToFile() {
        const logContent = this.logs.map(log => {
            let line = `[${log.timestamp}] ${log.level}: ${log.message}`;
            if (log.data) {
                line += `\nData: ${log.data}`;
            }
            return line;
        }).join('\n\n');
        
        // Tạo file download với tên cố định
        const blob = new Blob([logContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        // Tự động download
        const a = document.createElement('a');
        a.href = url;
        a.download = this.logFileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        console.log(`💾 Debug logs saved to ${this.logFileName}`);
    }
    
    appendToFile(newLogs) {
        // Thêm logs mới vào cuối
        this.logs.push(...newLogs);
        
        // Giới hạn số logs
        if (this.logs.length > this.maxLogs) {
            this.logs = this.logs.slice(-this.maxLogs);
        }
    }
    
    clear() {
        this.logs = [];
        console.log('🗑️ Debug logs cleared');
    }
    
    getStats() {
        const levels = this.logs.reduce((acc, log) => {
            acc[log.level] = (acc[log.level] || 0) + 1;
            return acc;
        }, {});
        
        return {
            total: this.logs.length,
            levels,
            firstLog: this.logs[0]?.timestamp,
            lastLog: this.logs[this.logs.length - 1]?.timestamp,
            fileName: this.logFileName
        };
    }
}

// Tạo instance global
window.debugLogger = new DebugLogger();

// Helper functions
window.logInfo = (msg, data) => debugLogger.info(msg, data);
window.logWarn = (msg, data) => debugLogger.warn(msg, data);
window.logError = (msg, data) => debugLogger.error(msg, data);
window.logSuccess = (msg, data) => debugLogger.success(msg, data);
window.logDebug = (msg, data) => debugLogger.debug(msg, data);

// Auto save on page unload
window.addEventListener('beforeunload', () => {
    if (debugLogger.logs.length > 0) {
        // Chỉ save khi có logs mới và user đóng trang
        console.log('💾 Auto-saving logs before page unload...');
    }
});

console.log('🚀 Debug Logger initialized. Logs will be saved to tkb-debug.txt. Use debugLogger.saveToFile() to save manually.');
