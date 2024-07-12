document.addEventListener('DOMContentLoaded', () => {
    const noteForm = document.getElementById('note-form');
    const deleteButton = document.getElementById('delete-note');

    const noteId = new URLSearchParams(window.location.search).get('id');

    if (noteId) {
        fetch(`/notas/${noteId}`)
            .then(response => response.json())
            .then(note => {
                noteForm.title.value = note.title;
                noteForm.content.value = note.content;
                noteForm.tags.value = note.tags.join(', ');
            });

        noteForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const updatedNote = {
                title: noteForm.title.value,
                content: noteForm.content.value,
                tags: noteForm.tags.value.split(',').map(tag => tag.trim())
            };

            fetch(`/notas/${noteId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedNote)
            }).then(() => {
                window.location.href = '/';
            });
        });

        deleteButton.addEventListener('click', () => {
            fetch(`/notas/${noteId}`, {
                method: 'DELETE'
            }).then(() => {
                window.location.href = '/';
            });
        });
    } else {
        deleteButton.style.display = 'none';

        noteForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const newNote = {
                title: noteForm.title.value,
                content: noteForm.content.value,
                tags: noteForm.tags.value.split(',').map(tag => tag.trim())
            };

            fetch('/notas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newNote)
            }).then(() => {
                window.location.href = '/';
            });
        });
    }
});
