import { REFERRAL_REFEERER_REWARDS } from '@/components/Forms/constants';
import api from '@/helpers/getAxiosInstance';
import { ReferrerRewardsType } from '@/types/referral';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type IParams = {
  queryParams: string;
};
export function useReferrerReward({ queryParams }: IParams) {
  const [referrerReward, setReferrerReward] = useState<ReferrerRewardsType>();
  const router = useRouter();
  const referrerRegex = /\/referral\/rewards\/(\d+)/;

  useEffect(() => {
    if (referrerRegex.test(router.asPath)) {
      getReferralRewardsInfo();
    }
  }, []);

  const getReferralRewardsInfo = async () => {
    api.defaults.baseURL = process.env.NEXT_PUBLIC_REFERRAL_API_URL;
    const response = await api.get(
      `${REFERRAL_REFEERER_REWARDS}?referrerId=${queryParams}`,
    );
    if (response) {
      setReferrerReward(response.data);
    }
  };
  return referrerReward;
}
