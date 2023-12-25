import { Box, Text } from '@chakra-ui/react';
import React from 'react';

type RetirementPlannerTypes = {
  title: string;
  subTitle: string;
  amt: string;
  duration: string;
};

export default function RetirementPlanner(props: RetirementPlannerTypes) {
  return (
    <Box>
      <Text mb="3.5" fontSize="lg">
        {props.title}
      </Text>
      <Box
        px="8"
        py="10"
        bg="gray.850"
        border="1px solid"
        borderRadius="base"
        borderColor="gray.750"
      >
        <Text mb="2.5" fontSize={{ base: 'md', md: 'lg' }}>
          {props.subTitle}
        </Text>
        <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="medium">
          {props.amt}
        </Text>
        <Text fontSize="md">{props.duration}</Text>
      </Box>
    </Box>
  );
}
