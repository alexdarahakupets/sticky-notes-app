import { useState, type ChangeEvent } from "react";
import { useNoteContext } from "../context/note-context/note-context";
import { ToolbarInput } from "./toolbar-input";

type ToolbarStateObject = {
  color: string;
  width: number;
  height: number;
};

export const Toolbar = () => {
  const { color, width, height, setContextValues } = useNoteContext();

  const [noteState, setNoteState] = useState<ToolbarStateObject>({
    color,
    width,
    height,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNoteState({ ...noteState, [e.target.name]: e.target.value });
    setContextValues({ ...noteState, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-80">
      <div className="flex flex-col bg-[#ffb3b3] p-4">
        <p>Provide your options and click anywhere on the screen!</p>
        <br />
        {(Object.keys(noteState) as (keyof ToolbarStateObject)[]).map(
          (property) => {
            return (
              <ToolbarInput
                key={property}
                name={property}
                onChange={handleInputChange}
                value={noteState[property]}
              />
            );
          },
        )}
      </div>
    </div>
  );
};
