// CSV Reader utility for loading schedule data
class CSVScheduleLoader {
    constructor() {
        this.subjects = [];
    }

    /**
     * Load schedule data from CSV file
     * @param {File} file - CSV file object
     * @returns {Promise<Array>} - Array of subjects
     */
    async loadFromCSV(file) {
        try {
            const text = await this.readFileAsText(file);
            const subjects = this.parseCSV(text);
            this.subjects = subjects;
            return subjects;
        } catch (error) {
            console.error('Error loading CSV:', error);
            throw error;
        }
    }

    /**
     * Read file as text
     * @param {File} file 
     * @returns {Promise<string>}
     */
    readFileAsText(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = e => resolve(e.target.result);
            reader.onerror = e => reject(e);
            reader.readAsText(file, 'utf-8');
        });
    }

    /**
     * Parse CSV text to subjects array
     * @param {string} csvText 
     * @returns {Array} subjects
     */
    parseCSV(csvText) {
        const lines = csvText.split('\n').filter(line => line.trim());
        if (lines.length < 2) {
            throw new Error('CSV file is empty or invalid');
        }

        // Parse header
        const headers = this.parseCSVLine(lines[0]);
        console.log('CSV Headers:', headers);

        // Expected headers
        const expectedHeaders = [
            'subject_id', 'subject_code', 'subject_name', 'credits', 'type',
            'teacher', 'day', 'period', 'room', 'weeks', 'prerequisites', 
            'description', 'note'
        ];

        // Parse data rows
        const subjects = new Map(); // Use Map to group by subject_id

        for (let i = 1; i < lines.length; i++) {
            const values = this.parseCSVLine(lines[i]);
            if (values.length !== headers.length) {
                console.warn(`Row ${i + 1} has different number of columns, skipping`);
                continue;
            }

            const rowData = {};
            headers.forEach((header, index) => {
                rowData[header] = values[index];
            });

            const subjectId = rowData.subject_id || rowData.subject_code;
            
            if (!subjects.has(subjectId)) {
                // Create new subject
                subjects.set(subjectId, {
                    id: subjectId,
                    code: rowData.subject_code || subjectId,
                    name: rowData.subject_name || `Subject ${subjectId}`,
                    credits: parseInt(rowData.credits) || 3,
                    type: rowData.type || 'general',
                    teacher: rowData.teacher || '',
                    sessions: [],
                    prerequisites: rowData.prerequisites ? 
                        rowData.prerequisites.split(';').filter(p => p.trim()) : [],
                    description: rowData.description || `Subject ${subjectId}`,
                    note: rowData.note || ''
                });
            }

            // Add session to subject
            const subject = subjects.get(subjectId);
            subject.sessions.push({
                day: parseInt(rowData.day) || 1,
                period: parseInt(rowData.period) || 1,
                room: rowData.room || 'TBA',
                weeks: rowData.weeks || '1-15'
            });
        }

        return Array.from(subjects.values());
    }

    /**
     * Parse a single CSV line handling quotes and commas
     * @param {string} line 
     * @returns {Array<string>}
     */
    parseCSVLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
                if (inQuotes && line[i + 1] === '"') {
                    // Escaped quote
                    current += '"';
                    i++; // Skip next quote
                } else {
                    // Toggle quote state
                    inQuotes = !inQuotes;
                }
            } else if (char === ',' && !inQuotes) {
                // Field separator
                result.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        
        // Add last field
        result.push(current.trim());
        
        return result;
    }

    /**
     * Convert subjects to the format expected by the main app
     * @returns {Array}
     */
    getFormattedSubjects() {
        return this.subjects.map(subject => ({
            ...subject,
            // Ensure all required fields exist
            id: subject.id || subject.code,
            code: subject.code || subject.id,
            name: subject.name || `Subject ${subject.code}`,
            credits: Number(subject.credits) || 3,
            type: subject.type || 'general',
            sessions: subject.sessions || [],
            prerequisites: subject.prerequisites || [],
            description: subject.description || subject.name
        }));
    }

    /**
     * Generate sample CSV template
     * @returns {string}
     */
    generateTemplate() {
        const headers = [
            'subject_id', 'subject_code', 'subject_name', 'credits', 'type',
            'teacher', 'day', 'period', 'room', 'weeks', 'prerequisites', 
            'description', 'note'
        ];

        const sampleData = [
            ['INT1008', 'INT1008', 'Nhập môn lập trình', '4', 'major', 'Nguyễn Văn A', '1', '1', 'TC-201', '1-15', '', 'Môn học cơ bản về lập trình', 'Môn bắt buộc'],
            ['INT1008', 'INT1008', 'Nhập môn lập trình', '4', 'major', 'Nguyễn Văn A', '3', '3', 'TC-201', '1-15', '', 'Môn học cơ bản về lập trình', 'Môn bắt buộc'],
            ['MAT1093', 'MAT1093', 'Đại số tuyến tính', '3', 'general', 'Trần Thị B', '2', '1', 'TC-101', '1-15', '', 'Các khái niệm cơ bản về đại số', 'Môn cơ sở']
        ];

        let csv = headers.join(',') + '\n';
        sampleData.forEach(row => {
            csv += row.map(field => `"${field}"`).join(',') + '\n';
        });

        return csv;
    }
}

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CSVScheduleLoader;
} else {
    window.CSVScheduleLoader = CSVScheduleLoader;
}
