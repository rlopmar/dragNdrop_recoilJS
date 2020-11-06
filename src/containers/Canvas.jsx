import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import { useRecoilValue, useRecoilCallback } from "recoil";

import { columnIdsState, columnState } from "../globalState";
import { Column } from "../components";

const StyledContainer = styled.div`
  padding: 10px;
`;

export default function Canvas() {
  const columnIds = useRecoilValue(columnIdsState);

  const updateDraggedItems = useRecoilCallback(
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

  const onDragEnd = function (result) {
    const { source, destination } = result;
    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }
    updateDraggedItems(result);
  };

  return (
    <StyledContainer>
      <DragDropContext onDragEnd={onDragEnd}>
        {columnIds.map((columnId) => {
          return <Column key={columnId} id={columnId}></Column>;
        })}
      </DragDropContext>
    </StyledContainer>
  );
}
