import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { todoState } from "./atoms";
import DragabbleCard from "./Components/DragabbleCard";
import Board from "./Components/Board";
import GlobalStyle from "./GlobalStyle";

const Wrapper = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex: 1;

  /* background-color: #1bb7b2; */
`;

const Boards = styled.div`
  display: flex;
  /* flex: 1; */
  /* width: 100%; */
  gap: 100px;
  /* background-color: blue; */
  /* grid-template-columns: repeat(3, 1fr); */
`;

function App() {
  const [toDos, setToDos] = useRecoilState(todoState);

  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const { destination, draggableId, source } = info;

    if (!destination) return;

    if (destination?.droppableId === source.droppableId) {
      //same board move
      setToDos((allBoards) => {
        // console.log(allBoards);
        // console.log(allBoards[source.index])
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];

        // console.log(taskObj);

        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        return { ...allBoards, [source.droppableId]: boardCopy };
      });
    }
    if (destination.droppableId !== source.droppableId) {
      //cross board move
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const destinationBoard = [...allBoards[destination.droppableId]];
        const taskObj = sourceBoard[source.index];

        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, taskObj);

        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
    // if(!destination) return;

    // console.log(args);
  };

  return (
    <>
      {/* <GlobalStyle /> */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            {Object.keys(toDos).map((boardId) => (
              <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
            ))}
          </Boards>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;
