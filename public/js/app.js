document.addEventListener('DOMContentLoaded', () => {
    const notesGrid = document.getElementById('notes-grid');
    const newNoteButton = document.getElementById('new-note');

    // Función para obtener notas
    async function fetchNotes() {
        const response = await fetch('/notas');
        const notes = await response.json();
        notesGrid.innerHTML = notes.map(note => `
            <div class="note">
                <h2>${note.title}</h2>
                <p>${note.content}</p>
                <small>${new Date(note.createdAt).toLocaleString()}</small>
            </div>
        `).join('');
    }

    newNoteButton.addEventListener('click', () => {
        // Redirigir a la página de creación de nota
        window.location.href = '/edit';
    });

    fetchNotes();
});
