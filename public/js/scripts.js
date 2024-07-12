document.addEventListener('DOMContentLoaded', function() {
    const notesGrid = document.getElementById('notes-grid');
    const createNoteBtn = document.getElementById('create-note-btn');

    // Cargar notas existentes
    fetch('/notas')
        .then(response => response.json())
        .then(notes => {
            notes.forEach(note => {
                const noteElement = createNoteElement(note);
                notesGrid.appendChild(noteElement);
            });
        });

    // Crear nueva nota
    createNoteBtn.addEventListener('click', () => {
        window.location.href = '/edit.html';
    });

    function createNoteElement(note) {
        const noteElement = document.createElement('div');
        noteElement.className = 'note';
        noteElement.innerHTML = `
            <div class="note-title">${note.title}</div>
            <div class="note-dates">Created: ${new Date(note.createdAt).toLocaleString()}</div>
            <div class="note-dates">Updated: ${new Date(note.updatedAt).toLocaleString()}</div>
            <div class="note-tags">Tags: ${note.tags.join(', ')}</div>
        `;
        noteElement.addEventListener('click', () => {
            window.location.href = `/edit.html?id=${note.id}`;
        });
        return noteElement;
    }
});
