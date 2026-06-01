import { DEFAULT_CONFIG } from "../constants/default-note-config";
import { MAX_Z_INDEX_KEY } from "../constants/localstorage-keys";
import { MAX_Z_INDEX } from "../constants/max-z-index";
import type { NoteConfigValues } from "../types/note-config";

export const getLocalstorageNoteConfig = (): NoteConfigValues => {
  try {
    const config = localStorage.getItem('NOTES_CONFIG')

    if (!config) return DEFAULT_CONFIG;

    return JSON.parse(config);
  } catch (e) {
    console.error('something went wrong during localstorage access', e);
    return DEFAULT_CONFIG;
  }
}

export const setLocalstorageNoteConfig = (updatedConfig: NoteConfigValues): void => {
  try {
    localStorage.setItem('NOTES_CONFIG', JSON.stringify(updatedConfig))
  } catch (e) {
    console.error('something went wrong during localstorage access', e);
  }
}

export const getLocalstorageMaxZIndex = (): number => {
  try {
    const max_z_index = localStorage.getItem(MAX_Z_INDEX_KEY)

    if (!max_z_index) return MAX_Z_INDEX;

    return JSON.parse(max_z_index);
  } catch (e) {
    console.error('something went wrong during localstorage access', e);
    return MAX_Z_INDEX;
  }
}

export const setLocalstorageMaxZIndex = (newMaxIndex: number) => {
  try {
    localStorage.setItem(MAX_Z_INDEX_KEY, JSON.stringify(newMaxIndex))
  } catch (e) {
    console.error('something went wrong during localstorage access', e);
  }
}