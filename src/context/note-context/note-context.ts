import { createContext, useContext } from "react";
import { DEFAULT_CONFIG } from "../../constants/default-note-config";
import type { NoteConfigValues } from "../../types/note-config";


export type TNoteContext = NoteConfigValues & {
  setContextValues: (newState: NoteConfigValues) => void,
}

export const NoteContext = createContext<TNoteContext>({...DEFAULT_CONFIG, setContextValues: () => undefined});

export const useNoteContext = () => {
  const context = useContext(NoteContext);
  return context;
};
