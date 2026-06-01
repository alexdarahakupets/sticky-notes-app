import { useState, type PropsWithChildren } from "react";
import { NoteContext } from "./note-context";
import {
  getLocalstorageNoteConfig,
  setLocalstorageNoteConfig,
} from "../../api/localhost-note-config-methods";
import type { NoteConfigValues } from "../../types/note-config";

export const NoteContextProvider = ({ children }: PropsWithChildren) => {
  // write into the note config from localstorage/default config
  const [noteConfig, setNoteConfig] = useState(getLocalstorageNoteConfig());

  const handleConfigChange = (updatedConfig: NoteConfigValues) => {
    setNoteConfig(updatedConfig);
    setLocalstorageNoteConfig(updatedConfig);
  };

  return (
    <NoteContext.Provider
      value={{ ...noteConfig, setContextValues: handleConfigChange }}
    >
      {children}
    </NoteContext.Provider>
  );
};
