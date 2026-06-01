import { useRef, useState, type PointerEvent } from "react";
import type { Note } from "../types/note";

export const useElementResize = (note: Note, handleNoteUpdate: (updatedNote: Note) => void) => {
    const [size, setSize] = useState({ width: note.width, height: note.height });
    const isDragged = useRef(false);
    const dragStart = useRef({ x: 0, y: 0 });

    const handleResizePointerDown = (e: PointerEvent<HTMLDivElement>) => {
      e.stopPropagation();

      isDragged.current = true;
      dragStart.current = {x: e.pageX, y: e.pageY}
      e.currentTarget.setPointerCapture(e.pointerId)
    }

    const handleResizePointerMove = (e: PointerEvent<HTMLDivElement>) => {
      if (!isDragged.current) return;
      
      const newHeight = note.height + (e.pageY - dragStart.current.y);
      const newWidth = note.width + (e.pageX - dragStart.current.x);

      // can't do negative values for them
      setSize({
        height: newHeight > 0 ? newHeight : 1,
        width: newWidth > 0 ? newWidth : 1
      })
    }
    const handleResizePointerUp = (e: PointerEvent<HTMLDivElement>) => {
      if (isDragged.current) {
        // save to sourse of truth when changes ended
        handleNoteUpdate({...note, ...size})
        isDragged.current = false;
        e.currentTarget.releasePointerCapture(e.pointerId)
      }
    }
    
    return {size, handleResizePointerDown, handleResizePointerMove, handleResizePointerUp}
}