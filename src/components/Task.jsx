import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { useRecoilValue } from "recoil";

import { taskState } from "../globalState";

const StyledTask = styled.div`
  border: 1px solid ${(props) => (props.isDragging ? "red" : "black")};
  transition: border 1s ease;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
`;

const Task = React.memo((props) => {
  const task = useRecoilValue(taskState(props.id));

  return (
    <Draggable draggableId={task.id} index={props.index}>
      {(provided, snapshot) => {
        return (
          <StyledTask
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {task.content}
          </StyledTask>
        );
      }}
    </Draggable>
  );
});

export default Task;
