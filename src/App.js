import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue, atom } from "recoil";

import { columnsAtom, columnOrderAtom, tasksAtom } from "./atoms";
import Column from "./components/Column";

function App() {
  const tasks = useRecoilValue(tasksAtom);
  const [columns, setColumns] = useRecoilState(columnsAtom);
  const columnOrder = useRecoilValue(columnOrderAtom);

  function onDragEnd(result) {
    //updata data after dragging
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    // If dropping in the same column
    if (destination.droppableId === source.droppableId) {
      const changedColumn = columns[source.droppableId];
      const newTasksOrder = [...changedColumn.tasksOrder];
      newTasksOrder.splice(source.index, 1);
      newTasksOrder.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...changedColumn,
        tasksOrder: newTasksOrder,
      };
      const newColumns = {
        ...columns,
        [changedColumn.id]: newColumn,
      };
      setColumns(newColumns);
      return;
    }

    // Dropping in different column
    const sourceColumn = columns[source.droppableId];
    const newSourceTasksOrder = Array.from(sourceColumn.tasksOrder);
    newSourceTasksOrder.splice(source.index, 1);
    const newSourceColumn = {
      ...sourceColumn,
      tasksOrder: newSourceTasksOrder,
    };

    //Update Destination
    const destinationColumn = columns[destination.droppableId];
    const newDestinationTasksOrder = Array.from(destinationColumn.tasksOrder);
    newDestinationTasksOrder.splice(destination.index, 0, draggableId);
    const newDestinationColumn = {
      ...destinationColumn,
      tasksOrder: newDestinationTasksOrder,
    };
    const newColumns = {
      ...columns,
      [newSourceColumn.id]: newSourceColumn,
      [newDestinationColumn.id]: newDestinationColumn,
    };
    setColumns(newColumns);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {columnOrder.map((columnID) => {
        const columnToRender = columns[columnID];
        const tasksToRender = columnToRender.tasksOrder.map(
          (taskId) => tasks[taskId]
        );

        return (
          <Column
            key={columnToRender.id}
            column={columnToRender}
            tasks={tasksToRender}
          ></Column>
        );
      })}
    </DragDropContext>
  );
}

export default App;
