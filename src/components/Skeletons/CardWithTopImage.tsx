import getFromRange from '@/helpers/getFromRange';
import { Card, CardBody, Skeleton, SkeletonText } from '@chakra-ui/react';

type IParams = {
  name: string;
  count?: number;
};
export default function CardWithTopImageSkeleton({ name, count = 3 }: IParams) {
  return (
    <>
      {getFromRange(1, count).map((num: number) => (
        <Card height={500} width={350} bg={'none'} key={`${name}-${num}`}>
          <CardBody padding={0}>
            <Skeleton height={196} mb={4} borderRadius={6} />
            <SkeletonText width={'full'} noOfLines={1} mb={4} />
            <SkeletonText width={'full'} noOfLines={4} mb={4} />
            <SkeletonText width={'full'} noOfLines={4} mb={4} />
            <SkeletonText width={'50%'} noOfLines={1} mb={4} />
          </CardBody>
        </Card>
      ))}
    </>
  );
}
