import { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { originalAnimals, AnimalType } from "./animal";
import { CorrectBox } from "./CorrectBox";
import { QuestionBox } from "./QuestionBox";

export const AnimalMatching = () => {
  const [questionAnimals, setQuestionAnimals] = useState<AnimalType[]>([]);
  const [correctAnimals, setCorrectAnimals] = useState<AnimalType[]>([]);
  const [time, setTime] = useState<number>(0);

  // 初回セットアップ
  useEffect(() => {
    newGame();
  }, []);

  useEffect(() => {
    if (questionAnimals.length === 0) {
      // game終了
    }
  }, [questionAnimals]);

  // ドロップ時の処理
  const drop = (e: React.DragEvent<HTMLSpanElement>) => {
    e.preventDefault();
    const answerAnimal = e.dataTransfer.getData("text");
    const correctAnimal = e.currentTarget.getAttribute("data-animal-name");
    const isCorrect = answerAnimal === correctAnimal;
    // 正解の場合
    if (isCorrect) {
      const newQuestionAnimals = toggleIsSelect(
        [...questionAnimals],
        correctAnimal
      );
      setQuestionAnimals(newQuestionAnimals);
      setCorrectAnimals(
        generateRandomCorrect(
          newQuestionAnimals
            .filter((a) => !a.isCorrect)
            .filter(
              (a) =>
                correctAnimals.filter((b) => a.name === b.name).length === 0
            ),
          correctAnimal
        )
      );
    }
  };

  // 配列内の対象のisCorrectをtoggle
  const toggleIsSelect = (animals: AnimalType[], name: string) => {
    const index = animals.findIndex((v) => v.name === name);
    const targetAnimal = animals.find((v) => v.name === name);
    if (targetAnimal) {
      targetAnimal.isCorrect = true;
      animals[index] = targetAnimal;
    }
    return animals;
  };

  // ニューゲーム
  const newGame = () => {
    const newQuestionAnimals = generateRandomQuestion(originalAnimals, 12);
    setQuestionAnimals(newQuestionAnimals);
    setCorrectAnimals(generateRandomQuestion(newQuestionAnimals, 3));
  };

  // ランダムな問題を生成
  const generateRandomQuestion = (animals: AnimalType[], count: number) => {
    const randomAnimals: AnimalType[] = [];
    const cloneAnimals: AnimalType[] = animals.map((v) => {
      return { ...v };
    });
    [...Array(count)].forEach(() => {
      const randomIndex = Math.floor(Math.random() * cloneAnimals.length);
      randomAnimals.push(cloneAnimals[randomIndex]);
      cloneAnimals.splice(randomIndex, 1);
    });
    return randomAnimals;
  };

  // ランダムな解答を生成
  const generateRandomCorrect = (
    animals: AnimalType[],
    correctAnimal: string
  ) => {
    const cloneCorrectAnimals = [...correctAnimals];
    const index = cloneCorrectAnimals.findIndex(
      (v) => v.name === correctAnimal
    );
    const randomIndex = Math.floor(Math.random() * animals.length);
    if (animals.length === 0) {
      cloneCorrectAnimals.splice(index, 1);
    } else {
      cloneCorrectAnimals[index] = animals[randomIndex];
    }
    return cloneCorrectAnimals;
  };

  return (
    <StyledApp>
      <section className="questionContainer">
        {questionAnimals.map((animal, i) => (
          <Fragment key={animal.name}>
            <QuestionBox animal={animal} index={i} />
            {i === 5 && <span className="space" />}
          </Fragment>
        ))}
      </section>
      <section className="correctContainer">
        {correctAnimals.map((animal, i) => (
          <CorrectBox animal={animal} drop={drop} key={animal.name} />
        ))}
      </section>
      <section className="otherContainer">
        <button onClick={() => newGame()}>New Game</button>
      </section>
    </StyledApp>
  );
};

const StyledApp = styled.div`
  position: relative;

  section.questionContainer {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;

    span.space {
      width: 60%;
    }
  }

  section.correctContainer {
    position: absolute;
    width: 60%;
    top: 200px;
    left: 20%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  section.otherContainer {
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;

    button {
      margin: 0 auto;
      padding: 20px;
      border-radius: 20px;
      font-weight: bold;
      border: none;
      color: #666666;

      &:hover {
        opacity: 0.5;
      }
    }
  }

  img {
    width: 120px;
    height: 120px;
  }
`;
