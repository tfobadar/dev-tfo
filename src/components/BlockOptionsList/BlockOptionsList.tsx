import { StoryblokComponentProps } from '@/types/component';
import { StoryblokComponent } from '@storyblok/react';
import React, { useState } from 'react';
import BlockOption from './subcomponents/BlockOption';
import { Box, Flex, useToast } from '@chakra-ui/react';
import api from '@/helpers/getAxiosInstance';
import {
  REFERRAL_CLAIM_REWARDS,
  REFERRAL_CLAIM_TYPE,
} from '../Forms/constants';
import { ReferrerRewardsType } from '@/types/referral';
import Loader from '../subcomponents/Spinner/Loader';

export default function BlockOptionsList({
  blok,
  refferReward,
  queryParams,
}: StoryblokComponentProps & { refferReward?: ReferrerRewardsType }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitType, setSubmitType] = useState('');
  const toast = useToast();
  const submitSelection = async (type: string) => {
    setIsLoading(true);
    const body = {
      addToPortfolio: type === REFERRAL_CLAIM_TYPE ? true : false,
      amount: refferReward?.rewardAmount,
      referrerId: `${queryParams}`,
    };

    try {
      api.defaults.baseURL = process.env.NEXT_PUBLIC_REFERRAL_API_URL;
      const response = await api.post(
        REFERRAL_CLAIM_REWARDS,
        JSON.stringify(body),
      );
      if (response.status === 200) {
        setIsSubmitted(true);
        setIsLoading(false);
        setSubmitType(type);
      }
    } catch (error) {
      setIsLoading(false);
      toast({
        title: 'Something went wrong.',
        status: 'error',
        duration: 5000,
      });
    }
  };
  const buttonProps = [
    {
      onClick: () => {
        localStorage.setItem('showClaimRewards', 'true');
      },
    },
  ];

  return (
    <Box pos={'relative'}>
      <Loader isLoading={isLoading} bg={'gray.1000'} />
      {isSubmitted ? (
        blok?.options ? (
          blok.options?.[
            submitType === REFERRAL_CLAIM_TYPE ? 1 : 0
          ]?.response.map((blok: any) => (
            <StoryblokComponent
              blok={blok}
              key={blok._uid}
              queryParams={queryParams}
            />
          ))
        ) : null
      ) : (
        <>
          {blok?.components
            ? blok.components.map((blok: any) => (
                <StoryblokComponent blok={blok} key={blok._uid} />
              ))
            : null}
          <Flex gap={6} justifyContent={'center'}>
            {blok?.options
              ? blok.options.map((blok: any) => (
                  <BlockOption
                    submitSelection={submitSelection}
                    blok={blok}
                    key={blok._uid}
                    referrRewardAmount={refferReward?.rewardAmount}
                  />
                ))
              : null}
          </Flex>
          {blok?.ctas
            ? blok.ctas.map((blok: any) => (
                <StoryblokComponent
                  blok={blok}
                  key={blok._uid}
                  buttonProps={buttonProps}
                  queryParams={queryParams}
                />
              ))
            : null}
        </>
      )}
    </Box>
  );
}
