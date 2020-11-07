import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useRecoilValue, useRecoilCallback } from "recoil";

import { columnState, taskState, taskIdsState } from "../globalState";
import { Task, Button } from "../components";

const StyledColumnContainer = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  min-width: 250px;
  margin: 5px;
  display: flex;
  flex-direction: column;
`;

const StyledColumnHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #eeeeee;
  padding: 15px;
  margin: 0;
`;

const StyledColumnTitle = styled.h2`
  padding: 0;
  margin: 0;
`;

const StyledTaskList = styled.div`
  padding: 8px;
`;

export default function Column(props) {
  const column = useRecoilValue(columnState(props.id));
  const taskIds = useRecoilValue(taskIdsState);
  const task = useRecoilValue(taskState());

  const saveNewTask = useRecoilCallback(
    ({ snapshot, set }) => async (taskId, task) => {
      set(taskIdsState, (currVal) => [...currVal, taskId]);
      set(taskState(taskId), task);
      const updatedColumn = await snapshot.getPromise(columnState(props.id));
      set(columnState(props.id), {
        ...updatedColumn,
        tasksOrder: [...updatedColumn.tasksOrder, taskId],
      });
    },
    []
  );

  const onAddTask = function (e) {
    const nextId = `task-${taskIds.length}`;
    const newTask = {
      ...task,
      id: nextId,
      content: `${nextId}`,
    };
    saveNewTask(nextId, { ...newTask });
  };

  return (
    <Draggable draggableId={column.id} index={props.index}>
      {(provided) => (
        <StyledColumnContainer
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <StyledColumnHeader {...provided.dragHandleProps}>
            <StyledColumnTitle>{column.title}</StyledColumnTitle>
            <Button onClick={onAddTask}>Add Task</Button>
          </StyledColumnHeader>
          <Droppable droppableId={column.id} type="task">
            {(provided) => (
              <StyledTaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {column.tasksOrder.map((taskId, index) => {
                  return <Task key={taskId} id={taskId} index={index}></Task>;
                })}
                {provided.placeholder}
              </StyledTaskList>
            )}
          </Droppable>
        </StyledColumnContainer>
      )}
    </Draggable>
  );
}
