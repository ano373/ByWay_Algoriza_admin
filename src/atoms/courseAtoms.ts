import { atom } from "jotai";

export const thumbnailFileAtom = atom<File | null>(null);

export const clearThumbnailFileAtom = atom(null, (_get, set) => {
  set(thumbnailFileAtom, null);
});
