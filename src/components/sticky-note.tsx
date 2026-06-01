import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type PointerEvent,
  type RefObject,
} from "react";
import { useElementDrag } from "../hooks/use-element-drag";
import { useElementResize } from "../hooks/use-element-resize";
import { ResizeSvg } from "../svg/resize";
import type { Note } from "../types/note";
import {
  getLocalstorageMaxZIndex,
  setLocalstorageMaxZIndex,
} from "../api/localhost-note-config-methods";

export type TStickyNoteProps = {
  noteData: Note;
  trashRef: RefObject<HTMLDivElement | null>;
  handleDelete: (id: string) => void;
  handleNoteUpdate: (updatedNote: Note) => void;
};

export const StickyNote = ({
  noteData,
  trashRef,
  handleDelete,
  handleNoteUpdate,
}: TStickyNoteProps) => {
  const { id, text, color } = noteData;
  const [textValue, setTextValue] = useState(text);
  const noteRefTextarea = useRef<HTMLTextAreaElement>(null);

  const {
    position,
    isDragged,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
  } = useElementDrag(noteData, trashRef, handleDelete, handleNoteUpdate);
  const {
    size,
    handleResizePointerDown,
    handleResizePointerMove,
    handleResizePointerUp,
  } = useElementResize(noteData, handleNoteUpdate);

  useEffect(() => {
    // when the note is created - we focus on the textarea field
    noteRefTextarea.current?.focus();
  }, []);

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    handleDragStart(e);
    // update the z-index
    const zIndex = getLocalstorageMaxZIndex();
    handleNoteUpdate({ ...noteData, zIndex });
    setLocalstorageMaxZIndex(zIndex + 1);
  };
  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value);
    handleNoteUpdate({ ...noteData, text: e.target.value });
  };

  return (
    <div
      id={id}
      className={
        "absolute bg-[#fce19c] m-0 p-0 flex justify-center content-center shadow-xl/20"
      }
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        minHeight: `${size.height}px`,
        minWidth: `${size.width}px`,
        cursor: isDragged ? "grabbing" : "grab",
        backgroundColor: color,
        zIndex: noteData.zIndex,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handleDragMove}
      onPointerUp={handleDragEnd}
    >
      <textarea
        className="outline-none text-center resize-none overflow-auto cursor-grab"
        value={textValue}
        onChange={handleTextareaChange}
        ref={noteRefTextarea}
        rows={1}
      />
      <div
        className="absolute bottom-0 right-0 h-4 w-4"
        onPointerDown={handleResizePointerDown}
        onPointerMove={handleResizePointerMove}
        onPointerUp={handleResizePointerUp}
        style={{ cursor: "nwse-resize" }}
      >
        <ResizeSvg />
      </div>
    </div>
  );
};
