const COOKIE_PREFIX = "notes_";

export function saveNotes(userId, notes) {
    const key = COOKIE_PREFIX + userId;
    document.cookie = `${key}=${encodeURIComponent(JSON.stringify(notes))}; path=/; max-age=31536000`;
}

export function loadNotes(userId) {
    const key = COOKIE_PREFIX + userId;
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