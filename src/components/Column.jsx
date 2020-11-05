import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";

const StyledColumnContainer = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  min-height: 50px;
  min-width: 200px;
  display: flex;
  flex-direction: column;
`;

const StyledColumnTitle = styled.h2`
  padding: 8px;
`;

const StyledTaskList = styled.div`
  padding: 8px;
`;

export default function Column(props) {
  return (
    <StyledColumnContainer>
      <StyledColumnTitle>{props.column.title}</StyledColumnTitle>
      <Droppable droppableId={props.column.id}>
        {(provided) => (
          <StyledTaskList ref={provided.innerRef} {...provided.droppableProps}>
            {props.tasks.map((task, index) => {
              return <Task key={task.id} task={task} index={index}></Task>;
            })}
            {provided.placeholder}
          </StyledTaskList>
        )}
      </Droppable>
    </StyledColumnContainer>
  );
}
