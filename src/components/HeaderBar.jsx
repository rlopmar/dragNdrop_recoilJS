import styled from "styled-components";
import { useRecoilValue, useRecoilCallback } from "recoil";
import { columnIdsState, columnState } from "../globalState";
import { Button } from "../components";

const StyledHeaderMenu = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  min-height: 50px;
  background-color: #dcdcdc;
`;

export default function HeaderBar() {
  const columnIds = useRecoilValue(columnIdsState);
  const column = useRecoilValue(columnState());

  const saveNewColumn = useRecoilCallback(
    ({ set }) => (columnId, column) => {
      set(columnIdsState, (currVal) => [...currVal, columnId]);
      set(columnState(columnId), column);
    },
    []
  );

  const onAddColumn = function (e) {
    const nextId = `column-${columnIds.length}`;
    const newColumn = {
      ...column,
      id: nextId,
      title: nextId,
    };
    saveNewColumn(nextId, { ...newColumn });
  };

  return (
    <StyledHeaderMenu>
      <Button onClick={onAddColumn}>Add Column</Button>
    </StyledHeaderMenu>
  );
}
