export function generateUniqueId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}