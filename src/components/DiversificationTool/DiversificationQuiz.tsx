import React, { useState } from 'react';
import { Box, ListItem, Text, UnorderedList } from '@chakra-ui/react';

type optionTypes = {
  title: string;
  score: string;
  questionType: string;
};
type diversificationTypes = {
  title: string;
  options: optionTypes[];
  index: number;
  questionType?: string;
  getAnswerPoints: (
    score: string,
    index: number,
    title: string,
    question: string,
    questionType: string,
  ) => void;
};

export const DiversificationQuiz = ({
  title,
  options,
  index,
  getAnswerPoints,
  questionType,
}: diversificationTypes) => {
  const [selectedOption, setSelectedOption] = useState('');

  const selectAnswer = (
    option: string,
    score: string,
    questionType: string,
  ) => {
    setSelectedOption(option);
    getAnswerPoints(score, index, option, title, questionType);
  };

  return (
    <Box w={['full', 'full']} margin={['initial', 'auto']}>
      <Box
        as="h2"
        fontSize={{ base: 'md', md: 'lg' }}
        textAlign="center"
        mb="10"
        h={['68px', 'auto']}
      >
        {title}
      </Box>
      <Box>
        <UnorderedList textAlign="center" listStyleType="none" m="0">
          {options.map((opt: optionTypes) => {
            return (
              <ListItem key={opt.title} mb="6" minH="56px" _last={{ mb: 0 }}>
                <Text
                  onClick={() => {
                    selectAnswer(opt.title, opt.score, questionType as string);
                  }}
                  _hover={{
                    cursor: 'pointer',
                  }}
                  p="16px"
                  h="82px"
                  m="auto"
                  w={{ base: 'full', md: '500px' }}
                  bg="gray.800"
                  borderRadius="md"
                  textAlign="start"
                  borderWidth="2px"
                  borderStyle="solid"
                  display="flex"
                  alignItems="center"
                  fontSize={{ base: 'md', md: 'lg' }}
                  fontWeight={
                    selectedOption === opt.title ? 'medium' : 'normal'
                  }
                  borderColor={
                    selectedOption === opt.title
                      ? 'tfo.primary.500'
                      : 'transparent'
                  }
                >
                  {opt.title}
                </Text>
              </ListItem>
            );
          })}
        </UnorderedList>
      </Box>
    </Box>
  );
};

export default DiversificationQuiz;
