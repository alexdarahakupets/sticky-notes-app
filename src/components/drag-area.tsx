import { useRef, useState, type MouseEvent } from "react";
import { StickyNote } from "./sticky-note";
import { useNoteContext } from "../context/note-context/note-context";
import { TrashSvg } from "../svg/trash";
import { Toolbar } from "./toolbar";
import {
  addNote,
  getAllNotes,
  removeNoteById,
  updateNote,
} from "../api/localhost-note-methods";
import type { Note } from "../types/note";
import {
  getLocalstorageMaxZIndex,
  setLocalstorageMaxZIndex,
} from "../api/localhost-note-config-methods";

export const DragArea = () => {
  // this is the source of truth for application notes
  const [notes, setNotes] = useState<Note[]>(getAllNotes());
  const dragAreaRef = useRef<HTMLDivElement>(null);
  const trashAreaRef = useRef<HTMLDivElement>(null);
  const noteContext = useNoteContext();

  const handleDelete = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    removeNoteById(id);
  };
  const handleNoteUpdate = (updatedNote: Note) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        if (note.id === updatedNote.id) {
          return updatedNote;
        }

        return note;
      }),
    );
    updateNote(updatedNote);
  };
  const handleCreateNote = (e: MouseEvent<HTMLElement>) => {
    const { pageX, pageY } = e;

    const zIndex = getLocalstorageMaxZIndex();
    const newNote = {
      id: crypto.randomUUID(),
      x: pageX - 100 || 0,
      y: pageY - 100 || 0,
      zIndex,
      color: noteContext.color,
      height: noteContext.height,
      width: noteContext.width,
      text: "",
    };
    setLocalstorageMaxZIndex(zIndex + 1);

    addNote(newNote);
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  return (
    <div
      ref={dragAreaRef}
      onPointerDown={handleCreateNote}
      // touch-none is to not zoom on mobile
      className="h-[100vh] bg-[#fcffee] overflow-hidden relative cursor-crosshair touch-none flex"
    >
      {notes.map((note) => (
        <StickyNote
          key={note.id}
          noteData={note}
          trashRef={trashAreaRef}
          handleDelete={handleDelete}
          handleNoteUpdate={handleNoteUpdate}
        />
      ))}
      <div
        onPointerDown={(e) => e.stopPropagation()}
        className="h-full flex flex-col"
      >
        <Toolbar />
        <div
          ref={trashAreaRef}
          className="h-full border-3 border-dotted border-[black] flex flex-wrap justify-center content-center bg-[#ff5858]"
        >
          <TrashSvg />
        </div>
      </div>
    </div>
  );
};
