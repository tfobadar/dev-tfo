import { useReferralRewardInfo } from '@/hooks/useReferralRewardInfo';
import { useReferralUserInfo } from '@/hooks/useReferralUserInfo';
import { useReferrerReward } from '@/hooks/useReferrerReward';
import { StoryblokComponentProps } from '@/types/component';
import { storyblokEditable, StoryblokComponent } from '@storyblok/react';

const Events = (props: StoryblokComponentProps & { queryParams: string }) => {
  const { blok, queryParams = '' } = props ?? {};
  const { isError } = useReferralUserInfo({
    inviteCode: queryParams,
  });

  if (isError) {
    window.location.href = '/';
  }
  const getReferralRewardInfo = useReferralRewardInfo();
  const refferReward = useReferrerReward({ queryParams: `${queryParams}` });

  return (
    <main {...storyblokEditable(blok)}>
      {blok.body
        ? blok.body.map((blok: any) => {
            return (
              <StoryblokComponent
                blok={blok}
                key={blok._uid}
                queryParams={queryParams}
                getReferralRewardInfo={getReferralRewardInfo || []}
                refferReward={refferReward || []}
              />
            );
          })
        : null}
    </main>
  );
};

export default Events;
