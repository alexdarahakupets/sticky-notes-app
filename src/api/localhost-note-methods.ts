import { NOTES_LIST } from "../constants/localstorage-keys";
import type { Note } from "../types/note";

export const getAllNotes = (): Note[] => {
  try {
    const notes = localStorage.getItem(NOTES_LIST);
    if (!notes) {
      return [];
    }

    return JSON.parse(notes);
  } catch(e) {
    console.log('Something went wrong during localstorage access',e)
    return [];
  }
}
export const addNote = (newNote: Note) => {
  try {
    const currentList = getAllNotes();
    localStorage.setItem(NOTES_LIST, JSON.stringify([...currentList, newNote]));
  } catch(e) {
    console.log('Something went wrong during localstorage access',e)
  }
}

export const removeNoteById = (id: string) => {
  try {
    const currentList = getAllNotes();
    const updatedList = currentList.filter(note => note.id !== id)
  
    localStorage.setItem(NOTES_LIST, JSON.stringify(updatedList));
  } catch(e) {
    console.log('Something went wrong during localstorage access',e)
  }
}

export const updateNote = (updatedNote: Note) => {
  try {
    const currentList = getAllNotes();
    const updatedList = currentList.map(note => {
      if (note.id === updatedNote.id) {
        return updatedNote
      }

      return note;
    })
  
    localStorage.setItem(NOTES_LIST, JSON.stringify(updatedList));
  } catch(e) {
    console.log('Something went wrong during localstorage access',e)
  }
}
