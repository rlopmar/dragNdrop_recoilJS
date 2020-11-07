import styled from "styled-components";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useRecoilValue, useRecoilCallback } from "recoil";

import { columnIdsState, columnState } from "../globalState";
import { Column } from "../components";

const StyledContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: ${(props) => {
    return props.width > 500 ? "row" : "column";
  }};
`;

export default function Canvas() {
  const columnIds = useRecoilValue(columnIdsState);

  const updateDraggedTasks = useRecoilCallback(
    ({ snapshot, set }) => async (result) => {
      const { source, destination, draggableId } = result;
      const sourceColumn = await snapshot.getPromise(
        columnState(source.droppableId)
      );
      const destinationColumn = await snapshot.getPromise(
        columnState(destination.droppableId)
      );

      //If movement in same column
      if (source.droppableId === destination.droppableId) {
        const column = sourceColumn;
        const newColumnTasksOrder = [...column.tasksOrder];
        newColumnTasksOrder.splice(source.index, 1);
        newColumnTasksOrder.splice(destination.index, 0, draggableId);

        set(columnState(column.id), {
          ...column,
          tasksOrder: newColumnTasksOrder,
        });
        return;
      }

      //Update Source Column
      const newSourceColumnTasksOrder = [...sourceColumn.tasksOrder];
      newSourceColumnTasksOrder.splice(source.index, 1);
      set(columnState(sourceColumn.id), {
        ...sourceColumn,
        tasksOrder: newSourceColumnTasksOrder,
      });

      //Update Destination Column
      const newDestinationColumnTasksOrder = [...destinationColumn.tasksOrder];
      newDestinationColumnTasksOrder.splice(destination.index, 0, draggableId);
      set(columnState(destinationColumn.id), {
        ...destinationColumn,
        tasksOrder: newDestinationColumnTasksOrder,
      });
    },
    []
  );

  const updateDraggedColumns = useRecoilCallback(
    ({ snapshot, set }) => async (result) => {
      const { source, destination, draggableId } = result;
      const columnsOrder = await snapshot.getPromise(columnIdsState);
      const newColumnsOrder = [...columnsOrder];
      newColumnsOrder.splice(source.index, 1);
      newColumnsOrder.splice(destination.index, 0, draggableId);
      set(columnIdsState, newColumnsOrder);
    },
    []
  );

  const onDragEnd = function (result) {
    const { source, destination, type } = result;
    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }
    if (type === "column") {
      updateDraggedColumns(result);
      return;
    }
    updateDraggedTasks(result);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId="all-columns"
        direction={window.innerWidth > 500 ? "horizontal" : "vertical"}
        type="column"
      >
        {(provided) => (
          <StyledContainer
            width={window.innerWidth}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <ColumnList columnIds={columnIds}></ColumnList>
            {provided.placeholder}
          </StyledContainer>
        )}
      </Droppable>
    </DragDropContext>
  );
}

function ColumnList(props) {
  return props.columnIds.map((columnId, index) => {
    return <Column key={columnId} id={columnId} index={index}></Column>;
  });
}
