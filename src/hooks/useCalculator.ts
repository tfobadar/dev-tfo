import { trackCarouselArrowEvent } from '@/helpers/trackClickEvents';
import { useEffect, useState } from 'react';

const useCalculationLogic = (
  dir: boolean,
  questionsData: any[],
  answerScore: any[],
  setCurrentQuestionIndex: any,
  setResult: any,
  setAnswerScore: any,
) => {
  const [maxScore, setMaxScore] = useState(0);
  const [sum, setSum] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [question, setQuestion] = useState('');

  useEffect(() => {
    if (questionsData[0].questionType == 'risk') {
      setMaxScore(
        questionsData.filter(
          (question: any) => question.questionType === 'risk',
        ).length * 3,
      );
      const scoresArry = answerScore
        .filter((question: any) => question.questionType === 'risk')
        .map((scores: any) => Number(scores.score));
      setSum(
        scoresArry.reduce(
          (accumulator: number, currentValue: number) =>
            accumulator + currentValue,
          0,
        ),
      );
      setPercentage((sum / maxScore) * 100);
    } else {
      setMaxScore(questionsData.length * 3);
      const scoresArry = answerScore.map((scores: any) => Number(scores.score));
      setSum(
        scoresArry.reduce(
          (accumulator: number, currentValue: number) =>
            accumulator + currentValue,
          0,
        ),
      );
      setPercentage((sum / maxScore) * 100);
    }
  }, [
    dir,
    questionsData,
    answerScore,
    setCurrentQuestionIndex,
    setResult,
    sum,
    maxScore,
  ]);

  const handlePoints = (
    score: any,
    questionIndex: number,
    title: string,
    question: string,
    questionType: string,
  ) => {
    let index = questionIndex;

    let dataIndex = answerScore.findIndex(
      (answer: any) => answer.questionIndex === index,
    );
    if (dataIndex >= 0) {
      answerScore[dataIndex].score = score;
    } else {
      answerScore.push({
        questionIndex: index,
        score,
        questionType,
      });
    }
    setAnswerScore([...answerScore]);
    setSelectedAnswer(title);
    setQuestion(question);
  };

  const handleBeforeChange = (prevIndex: any, currentIndex: any) => {
    let index = currentIndex;

    setCurrentQuestionIndex(index);
    if (answerScore.length === questionsData.length) {
      if (prevIndex === questionsData.length - 1) {
        setResult(true);
      }
    }

    if (answerScore.some((item: any) => item.questionIndex === index)) {
    } else {
      trackCarouselArrowEvent({
        label: `${question} - ${selectedAnswer}`,
      });
    }
  };

  return { handlePoints, handleBeforeChange, percentage };
};

export default useCalculationLogic;
