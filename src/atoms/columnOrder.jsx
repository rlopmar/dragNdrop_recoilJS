import { atom } from "recoil";

const columnOrderAtom = atom({
  key: "columnOrder",
  default: ["column-1"],
});

export default columnOrderAtom;
