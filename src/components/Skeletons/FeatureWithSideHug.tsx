import { Flex, Skeleton, SkeletonText } from '@chakra-ui/react';

export default function FeatureWithSideHugSkeleton() {
  return (
    <Flex gap={4} width={'full'} height={305}>
      <Skeleton width={'50%'} height={'full'} borderRadius={4} />
      <Flex
        width={'50%'}
        height={'full'}
        direction={'column'}
        justifyContent={'center'}
      >
        <SkeletonText noOfLines={1} width={'full'} mt={2} mb={4} />
        <SkeletonText noOfLines={2} width={'full'} mb={4} />
        <SkeletonText noOfLines={6} width={'full'} mb={4} />
        <SkeletonText noOfLines={1} width={'50%'} mt={2} mb={4} />
      </Flex>
    </Flex>
  );
}
