import React from 'react';
import { Buttons } from '@tfo/mytfo-components';
import { Box, Flex, Progress, Text } from '@chakra-ui/react';

export default function DiversificationResult(props: any) {
  return (
    <>
      {props.blok?.diversificationToolResult?.map((result: any) => (
        <Box key={result.resultTitle}>
          <Box mb="10" textAlign="center">
            <Text fontSize="lg" mb="2">
              {result.resultTitle}
            </Text>
            <Text
              fontSize={{ base: '2xl', md: '3xl' }}
              color="tfo.primary.500"
              fontWeight="medium"
            >
              {Math.trunc(props.percentage)}%
            </Text>
          </Box>
          <Box mb="16">
            <Flex justifyContent="space-between" mb={{ base: '3.5', md: '7' }}>
              <Text fontSize="sm" fontWeight="medium">
                {result.progressBarStartIndicatorText}
              </Text>
              <Text fontSize="sm" fontWeight="medium">
                {result.progressBarEndIndicatorText}
              </Text>
            </Flex>
            <Progress
              value={props.percentage}
              sx={{
                '& > div': {
                  background:
                    'linear-gradient(90deg, #B99855 10%, #B99855 90%)',
                },
              }}
            />
          </Box>
          <Flex justifyContent="center">
            <Buttons {...props.buttons} />
          </Flex>
        </Box>
      ))}
    </>
  );
}
