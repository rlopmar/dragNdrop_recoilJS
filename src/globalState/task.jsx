import { atom, atomFamily } from "recoil";

const taskIdsState = atom({
  key: "taskIdsState",
  default: [],
});

const taskState = atomFamily({
  key: "taskState",
  default: {
    id: "task-0",
    content: "Task 0",
  },
});

export { taskIdsState, taskState };
