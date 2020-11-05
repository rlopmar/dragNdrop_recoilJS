import { atom } from "recoil";

const generateTasks = function (count) {
  let tasks = {};
  for (let i = 0; i < count; i++) {
    tasks = {
      ...tasks,
      [`task-${i}`]: {
        id: `task-${i}`,
        content: `This is task ${i}`,
      },
    };
  }
  return tasks;
};

const tasksAtom = atom({
  key: "tasks",
  default: generateTasks(4),
});

export default tasksAtom;
