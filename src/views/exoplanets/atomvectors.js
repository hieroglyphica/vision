import { atom } from "recoil";

export const phaseAngleState = atom({
  key: "angleAtom",
  default: 0,
});

export const illuminationState = atom({
  key: "illuminationAtom",
  default: 0,
});
export const nextMoonQuarterState = atom({
  key: "moonQuarterAtom",
  default: "",
});
