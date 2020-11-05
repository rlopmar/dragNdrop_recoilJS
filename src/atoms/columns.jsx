import { atom } from "recoil";

const columnsAtom = atom({
  key: "columns",
  default: {
    "column-1": {
      id: "column-1",
      title: "To Do",
      tasksOrder: ["task-0", "task-1", "task-2", "task-3"],
    },
  },
});

export default columnsAtom;
