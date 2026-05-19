import {useEffect, useState} from "react";
import {loadNotes, saveNotes} from "../utils/cookieStorage";
import {useAuth} from "../context/AuthContext";
import {fetchNotes, postNote, deleteNote, updateNote} from "../utils/NotesBDStorage";

import '../styles/notesButtons.css';
import '../styles/notes.css';
import '../styles/reminder.css';
import toast from 'react-hot-toast';


export default function Notes() {
    const {user} = useAuth();
    const [date, setDate] = useState("");
    const [notes, setNotes] = useState(() => loadNotes(user.username));
    const [text, setText] = useState("");
    const [formOpen, setFormOpen] = useState(false);
    const [reminderNote, setReminderNote] = useState(null);
    const [completed, setCompleted] = useState(false);
    const [noteData, setNoteData] = useState({
        text: "",
        date: "",
        completed: false
    });
    useEffect(() => {
        const loadNotes = async () => {
            try {
                const data = await fetchNotes();
                setNotes(data);
            } catch (error) {
                console.log(error);
            }
        };

        loadNotes();
    }, []);


    const handleSubmit = async () => {
        await postNote(text, completed, date)
        setNotes(prev => [...prev, notes]);
    }

    const handleDelete = async (id) => {
        await deleteNote(id)
        setNotes(notes.filter((note) => note.id !== id))
    }

    const handleUpdate = async (noteid) => {
        await updateNote( completed)
        setNotes(prev =>
            prev.map(note =>
                note.id === noteid
                    ? { ...note, completed: !note.completed }
                    : note
            )
        );
    }

    function openForm() {
        setFormOpen(true);
    }


    function formatDate(dateString) {
        const date = new Date(dateString);

        return date.toLocaleString("uk-UA", {
            day: "2-digit",
            month: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
        });
    }


    function scheduleReminder(note) {
        if (!note.deadline) return;

        const TEN_MIN = 10 * 60 * 1000;

        const deadlineTime = new Date(note.deadline).getTime();
        const triggerTime = deadlineTime - TEN_MIN;
        const delay = triggerTime - Date.now();

        if (delay <= 0) return;

        setTimeout(() => {
            setReminderNote(note);

            if (Notification.permission === "granted") {
                new Notification("⏰ Нагадування", {
                    body: `Через 10 хв: ${note.text}`
                });
            }
        }, delay);
    }

    function getNoteStatus(deadline) {
        if (!deadline) return "normal";

        const now = Date.now();
        const deadlineTime = new Date(deadline).getTime();
        const TEN_MIN = 10 * 60 * 1000;

        if (now < deadlineTime) return "normal";
        if (now >= deadlineTime && now <= deadlineTime + TEN_MIN) return "warning";
        return "overdue";
    }

    const [, forceUpdate] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            forceUpdate(prev => prev + 1);
        }, 1000); // кожну секунду

        return () => clearInterval(interval);
    }, []);


    const sortedNotes = [...notes].sort((a, b) => {
        const statusA = getNoteStatus(a.deadline);
        const statusB = getNoteStatus(b.deadline);

        const priority = {
            overdue: 2,
            warning: 0,
            normal: 1,
        };

        return priority[statusA] - priority[statusB]

            ;
    });

    return (
        <div className="wrapper">

            <div className={"header"} style={{pointerEvents: ""}}>Todo List</div>

            <button className="add-button" onClick={openForm}>
                Add Note
            </button>

            <div className={"add-note"}>
                <form

                    onSubmit={(e) => {
                        e.preventDefault();

                    }}
                    className={`note-form ${formOpen ? "active" : ""}`}
                >
                    <label className={"note-label"}>
                        Note:
                    </label>
                    <input
                        className="note_input"
                        type="text"
                        value={text}
                        style={{marginLeft: "10px",}}
                        onChange={(e) => setText(e.target.value)}
                        required
                    />
                    <input
                        className="note_input"
                        type="datetime-local"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />

                    <button className="sub-button" type="submit" onClick={(e) => {
                        handleSubmit()
                    }}>
                        Submit
                    </button>
                    <button type="reset" className="cancel-button" onClick={() => setFormOpen(false)}>
                        Cancel
                    </button>
                </form>
            </div>

            <ul className={"note"}>
                {sortedNotes.map((note) => (
                    <li key={note.id}
                        className={`note-li ${
                            note.completed
                                ? "note-completed"
                                : getNoteStatus(note.deadline) === "warning"
                                    ? "note-warning"
                                    : getNoteStatus(note.deadline) === "overdue"
                                        ? "note-overdue"
                                        : "note-normal"
                        }`}>
                        <input
                            style={{transform: "scale(1.5)"}}
                            type="checkbox"
                            checked={note.completed}
                            onChange={(e) => {
                                setCompleted(!note.completed);
                                handleUpdate(note.id);


                            }}
                        />
                        <div className={"note-text"}>
                            <span style={{fontSize: "200%"}}>{note.text}</span>
                            <span style={{fontSize: "200%"}}>{formatDate(note.date)}</span>

                        </div>
                        <button
                            className="del-button"

                            onClick={() => {
                                handleDelete(note.id)
                            }}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            {reminderNote && (
                <div className="reminder-overlay">
                    <div className="reminder-modal">
                        <h2>⏰ Нагадування</h2>
                        <p>{reminderNote.text}</p>
                        <p>
                            До дедлайну: {formatDate(reminderNote.deadline)}
                        </p>

                        <button
                            className="rem-button"
                            onClick={() => setReminderNote(null)}
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}