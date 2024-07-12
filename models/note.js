const { v4: uuidv4 } = require('uuid');

class Note {
    constructor(title, content, tags = []) {
        this.id = uuidv4();
        this.title = title;
        this.content = content;
        this.tags = tags;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    update(title, content, tags) {
        this.title = title;
        this.content = content;
        this.tags = tags;
        this.updatedAt = new Date();
    }
}

module.exports = Note;
