


export async function fetchNotes() {
    try {


        const response = await fetch("http://localhost:8080/api/getNotes")
        const data = await response.json();



        console.log(data)
        console.log(response)
return data
    }
    catch (error) {
        console.log(error)
    }
}

 export async function postNote(text,completed,date) {
    try {


        const response = await fetch("http://localhost:8080/api/postNote",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                text: text,
                completed: false,
                date: date

            })

        })
        if (!response.ok) {
            throw new Error("Failed to submit note");
        }
        if (response.ok) {
            throw new Error("Posted Successfully");
        }
        return response.json();
    }
    catch (error) {
        console.log(error)
    }

}
export async function deleteNote(noteid,) {
    try {


        const response = await fetch(`http://localhost:8080/api/deleteNote/${noteid}`,{
            method: "DELETE",

        })
        if (!response.ok) {
            throw new Error("Failed to delete note");
        }



    }
    catch (error) {
        console.log(error)
    }
}

export async function updateNote(noteid, completed,setNotes) {


    try {


        const response = await fetch(`http://localhost:8080/api/updateNote/${noteid}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                completed:completed,
            })
        })
        if (!response.ok) {
            throw new Error("Failed to update note");
        }


    }
    catch (error) {
        console.log(error)
    }
}
export function NotesBDStorage() {

}