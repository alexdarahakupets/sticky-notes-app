import { useRef, useState, type PointerEvent, type RefObject } from "react";
import type { Note } from "../types/note";


export const useElementDrag = (note: Note, trashRef: RefObject<HTMLDivElement | null>, handleDelete: (id: string) => void, handleNoteUpdate: (updatedNote: Note) => void) => {
  const [position, setPosition] = useState({ x: note.x, y: note.y });
  const [isDragged, setIsDragged] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const handleDragStart = (e: PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsDragged(true);
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleDragMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDragged) return;

    // New position is where the mouse is minus that initial click offset
    // and we also account for the shift of the card itself

    // we can (potentially) also do checks  so the note doesn't fly out of draggable zone 
    const newX =
      e.pageX - dragStart.current.x + note.x;
    const newY =
      e.pageY - dragStart.current.y + note.y;

    // Can also do direct style manipulation here if lagging, bypassing react rendering
    setPosition({
      x: newX,
      y: newY,
    });
  };

  const handleDragEnd = (e: PointerEvent<HTMLDivElement>) => {
    if (isDragged) {
      e.currentTarget.releasePointerCapture(e.pointerId);
      setIsDragged(false);
      
      if (trashRef.current !== null) {
        const trashRect = trashRef.current.getBoundingClientRect();
        const noteRect = e.currentTarget.getBoundingClientRect();
  
        // Checking if a part of the note is in trash - then delete.
        if (trashRect.right > noteRect.left && trashRect.top < noteRect.bottom) {
          handleDelete(note.id)
          return;
        }

      }
      // Otherwise just write new position to sourse of truth
      handleNoteUpdate({...note, ...position})
    }
  };

  return {position, isDragged, handleDragStart, handleDragMove, handleDragEnd}
}