import { dragEnter, dragOver, dragLeave } from "./helper";
import { AnimalType } from "./animal";
import styled from "styled-components";

export const CorrectBox = ({
  animal,
  drop
}: {
  animal: AnimalType;
  drop: (e: React.DragEvent<HTMLSpanElement>) => void;
}) => {
  return (
    <StyledApp>
      <span
        className="droppable"
        onDrop={(e) => drop(e)}
        onDragOver={(e) => dragOver(e)}
        onDragEnter={(e) => dragEnter(e)}
        onDragLeave={(e) => dragLeave(e)}
        data-animal-name={animal.name}
      >
        {animal.label}
      </span>
    </StyledApp>
  );
};

const StyledApp = styled.div`
  width: calc(100% / 3);
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;

  span.droppable {
    width: 120px;
    height: 120px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    color: white;
    line-height: 120px;
    background-color: gray;
    border-radius: 100px;
    transition: 0.2s;
    animation: change-color-anim 0.2s linear;
    user-select: none;
  }

  @keyframes change-color-anim {
    0%,
    100% {
      background-color: gray;
    }
    50% {
      background-color: white;
    }
  }
  .droppable-hover {
    transform: scale(1.1);
  }
`;
