import { StoryblokComponentProps } from '@/types/component';
import { ReferrerRewardsType } from '@/types/referral';
import { Text } from '@chakra-ui/react';
import React from 'react';

export default function DynamicContent({
  blok,
  ...rest
}: StoryblokComponentProps & { refferReward?: ReferrerRewardsType }) {
  const { refferReward } = rest;

  return (
    <Text textAlign={'center'} fontSize={'4xl'} fontWeight={'normal'} pb={6}>
      ${refferReward?.rewardAmount}
    </Text>
  );
}
