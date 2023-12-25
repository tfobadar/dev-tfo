import { Box, Text } from '@chakra-ui/react';

export default function InplCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <Box
      px="5"
      py="4"
      bg="gray.900"
      borderRadius="md"
      border="1px solid"
      borderColor="gray.800"
      textAlign={{ base: 'start', md: 'center' }}
    >
      <Text>{title}:</Text>
      <Text fontSize={['20']} color="tfo.primary.500" fontWeight="medium">
        {value}
      </Text>
    </Box>
  );
}
