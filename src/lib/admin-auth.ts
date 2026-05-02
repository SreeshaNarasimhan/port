const KEY = "admin:auth";
const USER = "admin";
const PASS = "admin123";

export function login(username: string, password: string): boolean {
  if (username === USER && password === PASS) {
    localStorage.setItem(KEY, "1");
    return true;
  }
  return false;
}
export function logout() { localStorage.removeItem(KEY); }
export function isAuthed(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(KEY) === "1";
}
