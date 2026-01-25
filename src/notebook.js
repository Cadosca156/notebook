import {useState} from "react";


export default function Notebook() {
    // TODO: read about useState, useEffect, useRef, useMemory, useCallback
    const [notes, setNotes] = useState([]);
    const [formOpen, setFormOpen] = useState(false);

    let id;
    let completed = new Boolean();

    // TODO: implement the functions below
    // TODO add styles to this page
    function openForm() {
        setFormOpen(true);
    }
    function addNote(text) {
       const newNote = {
           id: id = crypto.randomUUID(),
           text: text,
           completed: false
       };
        setNotes(prevNotes => [...prevNotes, newNote]);
    }

    function deleteNote(id) {
            setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
        }



    function toggleCompleted(id) {
        setNotes(prevNotes =>
            prevNotes.map(note =>
                note.id === id
                    ? { ...note, completed: !note.completed }
                    : note
            )
        );
    }

    return (
        <div style={{backgroundColor: "white"}}>
            <h1>Todo List</h1>
            <button onClick={openForm}>Add Note</button>
            {formOpen ? (
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        addNote(e.target.elements.noteText.value);
                        e.target.reset();
                        setFormOpen(false);
                    }}
                >
                    <label>Note:</label>
                    <input type="text" name="noteText" required />
                    <button type="submit">Add</button>
                </form>
            ) : null}
            <ul>
                {notes.map((note) => (
                    <li key={note.id}>
                        <input
                            type="checkbox"
                            checked={note.completed}
                            onChange={() => toggleCompleted(note.id)}
                        />
                        {note.text}
                        <button onClick={() => deleteNote(note.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}