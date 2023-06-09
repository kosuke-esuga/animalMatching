import { dragStart } from "./helper";
import { AnimalType } from "./animal";
import styled from "styled-components";

export const QuestionBox = ({
  animal,
  index
}: {
  animal: AnimalType;
  index: number;
}) => {
  return (
    <StyledApp>
      <img
        className={`draggable ${animal.isCorrect && "dragged"}`}
        draggable
        src={`/img/${animal.name}.png`}
        data-image-name={animal.name}
        key={animal.name}
        onDragStart={(e) => dragStart(e)}
      />
    </StyledApp>
  );
};

const StyledApp = styled.div`
    width: 20%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;

    img.draggable {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: transparent;
      cursor: pointer;

      &:hover {
        opacity: 0.5;
      }
    }

    img.dragged {
      user-select: none;
      cursor: default;
      opacity: 0.2;

      &:hover {
        opacity: 0.2;
      }
    }
  }

  span.space {
    width: 60%;
  }

  img {
    width: 80px;
    height: 80px;
  }
  /* } */
`;
