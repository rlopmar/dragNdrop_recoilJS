import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const StyledTask = styled.div`
  border: 1px solid ${(props) => (props.isDragging ? "red" : "black")};
  transition: border 1s ease;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
`;

export default function Task(props) {
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => {
        return (
          <StyledTask
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {props.task.content}
          </StyledTask>
        );
      }}
    </Draggable>
  );
}
