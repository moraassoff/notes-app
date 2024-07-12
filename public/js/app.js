document.addEventListener('DOMContentLoaded', () => {
    const notesGrid = document.getElementById('notes-grid');
    const newNoteButton = document.getElementById('new-note');

    // Función para obtener notas
    async function fetchNotes() {
        const response = await fetch('/notas');
        const notes = await response.json();
        notesGrid.innerHTML = notes.map(note => `
            <div class="note" data-id="${note.id}">
                <h2>${note.title}</h2>
                <p>${note.content}</p>
                <small>${new Date(note.createdAt).toLocaleString()}</small>
            </div>
        `).join('');

        document.querySelectorAll('.note').forEach(noteElement => {
            noteElement.addEventListener('click', () => {
                const noteId = noteElement.getAttribute('data-id');
                window.location.href = `/edit.html?id=${noteId}`;
            });
        });
    }

    newNoteButton.addEventListener('click', () => {
        window.location.href = '/edit.html';
    });

    fetchNotes();
});
