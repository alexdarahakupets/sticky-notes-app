import { NOTES_OBJECT } from "../constants/localstorage-keys";
import type { Note } from "../types/note";

export const getAllNotes = (): Record<string, Note> => {
  try {
    const currentState = localStorage.getItem(NOTES_OBJECT);
    if (!currentState) {
      return {};
    }

    return JSON.parse(currentState);
  } catch(e) {
    console.log('Something went wrong during localstorage access',e)
    return {};
  }
}
export const addNote = (newNote: Note) => {
  try {
    const currentState = getAllNotes();
    localStorage.setItem(NOTES_OBJECT, JSON.stringify({...currentState, [newNote.id]: newNote}));
  } catch(e) {
    console.log('Something went wrong during localstorage access',e)
  }
}

export const removeNoteById = (id: string) => {
  try {
    const currentState = getAllNotes();
    delete currentState[id]
    localStorage.setItem(NOTES_OBJECT, JSON.stringify(currentState));
  } catch(e) {
    console.log('Something went wrong during localstorage access',e)
  }
}

export const updateNote = (updatedNote: Note) => {
  try {
    const currentState = getAllNotes();
    currentState[updatedNote.id] = updatedNote
    localStorage.setItem(NOTES_OBJECT, JSON.stringify(currentState));
  } catch(e) {
    console.log('Something went wrong during localstorage access',e)
  }
}
