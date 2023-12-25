import { PAGE_BANNER_TYPES } from '@/constants/globals';
import { StoryblokComponentProps } from '@/types/component';
import { Heading } from '@chakra-ui/react';
import React from 'react';
import renderRichText from '@/helpers/renderRichText';
import { RefferalRewardInfoType } from '@/types/referral';

export default function IconWithContentHeading({
  blok,
  ...rest
}: StoryblokComponentProps & {
  getReferralRewardInfo?: RefferalRewardInfoType[];
  indexKey: number;
}) {
  const { getReferralRewardInfo, indexKey } = rest;
  return (
    <>
      {renderRichText({ content: blok.heading })}
      {blok.type === PAGE_BANNER_TYPES.REFERRAL && getReferralRewardInfo && (
        <Heading as={'h3'} fontWeight={'normal'} mt={2} fontSize={'4xl'}>
          ${getReferralRewardInfo[indexKey]?.Amount}
        </Heading>
      )}
    </>
  );
}
