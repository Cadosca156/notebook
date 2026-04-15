const COOKIE_PREFIX = "notes_";

export function saveNotes(username, notes) {
    const key = COOKIE_PREFIX + username;

    document.cookie =
        key +
        "=" +
        encodeURIComponent(JSON.stringify(notes)) +
        "; path=/; max-age=31536000";
}

export function loadNotes(username) {
    const key = COOKIE_PREFIX + username;

    const cookies = document.cookie.split("; ");

    for (let cookie of cookies) {
        const [name, value] = cookie.split("=");

        if (name === key) {
            try {
                return JSON.parse(decodeURIComponent(value));
            } catch {
                return [];
            }
        }
    }

    return [];
}