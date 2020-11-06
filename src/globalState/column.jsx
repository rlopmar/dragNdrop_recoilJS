import { atom, atomFamily } from "recoil";

const columnIdsState = atom({
  key: "columnIdsState",
  default: [],
});

const columnState = atomFamily({
  key: "columnState",
  default: {
    id: "column-0",
    title: "Column 0",
    tasksOrder: [],
  },
});

export { columnState, columnIdsState };
