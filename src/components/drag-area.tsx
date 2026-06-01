import { useMemo, useRef, useState, type MouseEvent } from "react";
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
  // the data structure is chosen to be an object, so update, delete and write are in O(1)
  const [notes, setNotes] = useState<Record<string, Note>>(getAllNotes());
  const notesArray = useMemo(() => Object.values(notes), [notes]);
  const dragAreaRef = useRef<HTMLDivElement>(null);
  const trashAreaRef = useRef<HTMLDivElement>(null);
  const noteContext = useNoteContext();

  const handleDelete = (id: string) => {
    setNotes((prevNotes) => {
      const newNotes = { ...prevNotes };
      delete newNotes[id];
      return newNotes;
    });
    removeNoteById(id);
  };
  const handleNoteUpdate = (updatedNote: Note) => {
    setNotes((prevNotes) => {
      const newNotes = { ...prevNotes };
      newNotes[updatedNote.id] = updatedNote;
      return newNotes;
    });
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
    setNotes((prevNotes) => ({ ...prevNotes, [newNote.id]: newNote }));
  };

  return (
    <div
      ref={dragAreaRef}
      onPointerDown={handleCreateNote}
      // touch-none is to not zoom on mobile
      className="h-[100vh] bg-[#fcffee] overflow-hidden relative cursor-crosshair touch-none flex"
    >
      {notesArray.map((note) => (
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
