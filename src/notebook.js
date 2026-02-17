import {useRef, useState} from "react";
import {eventWrapper} from "@testing-library/user-event/dist/utils";


export default function Notebook() {
    // TODO: read about useState, useEffect, useRef, useMemory, useCallback
    const [notes, setNotes] = useState([]);
    const [formOpen, setFormOpen] = useState(false);


    function Form() {
        const inputRef = useRef();

    }
    // TODO: implement the functions below
    // TODO add styles to this page
    function openForm() {
        setFormOpen(true);
    }
    function addNote(text) {
       const newNote = {
           id: crypto.randomUUID(),
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
        <div className={"wrapper"} >
            <h1 style={{fontSize:"500%"}}>Todo List</h1>
            <button className={"add-button"} onClick={openForm}>Add Note</button>
            {formOpen ? (
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        addNote(e.target.elements.noteText.value);
                        e.target.reset();
                        setFormOpen(false);
                    }}
                >
                    <label style={{fontSize:"200%",fontWeight:"bold"}}>Note:</label>
                    <input className={"note_input"} type="text" name="noteText" required />
                    <button className={"sub_del-button"}  type="submit">Submit</button>
                </form>
            ) : null}
            <ul>
                {notes.map((note) => (
                    <li key={note.id}>
                        <input style={{transform:"scale(2)",width:"10%"}}
                            type="checkbox"
                            checked={note.completed}
                            onChange={() => toggleCompleted(note.id)}
                        /><span style={{fontSize:"200%",}}>
                        {note.text}
                    </span>
                        <button className={"sub_del-button"} onClick={() => deleteNote(note.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}