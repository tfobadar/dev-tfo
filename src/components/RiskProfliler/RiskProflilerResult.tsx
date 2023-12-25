import React from 'react';
import { Buttons } from '@tfo/mytfo-components';
import { Box, Flex, Text } from '@chakra-ui/react';
import { PieChart, Pie, Cell } from 'recharts';

export default function RiskProflilerResult(props: any) {
  const { blok, label, isMobile, data, description, buttons } = props;
  return (
    <>
      {blok.results.map((result: any) => (
        <Box key={result.title}>
          <Box mb={{ base: '6', md: '10' }} textAlign="center">
            <Text
              fontSize={{ base: 'sm', md: 'lg' }}
              mb={{ base: '3', md: '2' }}
            >
              {result.title}
            </Text>
            <Text fontSize={{ base: 'lg', md: '3xl' }} color="tfo.primary.500">
              {label}
            </Text>
          </Box>
          <Flex justifyContent="center">
            <PieChart
              width={isMobile ? 250 : 300}
              height={isMobile ? 180 : 200}
            >
              <Pie
                data={data}
                endAngle={0}
                stroke="none"
                dataKey="value"
                startAngle={180}
                cx={isMobile ? 125 : 145}
                cy={isMobile ? 130 : 150}
                innerRadius={isMobile ? 80 : 100}
                outerRadius={isMobile ? 120 : 150}
              >
                {data.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </Flex>
          <Box>
            <Text
              mb={{ base: '14', md: '16' }}
              color="gray.400"
              textAlign="center"
              fontSize={{ base: 'sm', md: 'md' }}
            >
              {description}
            </Text>
            <Flex justifyContent="center">
              <Buttons {...buttons} />
            </Flex>
          </Box>
        </Box>
      ))}
    </>
  );
}
