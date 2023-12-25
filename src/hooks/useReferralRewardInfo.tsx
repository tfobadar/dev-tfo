import { REFERRAL_REWARDS_INFO } from '@/components/Forms/constants';
import formatCurrencyWithCommas from '@/helpers/formatCurrencyWithCommas';
import api from '@/helpers/getAxiosInstance';
import { RefferalRewardInfoType } from '@/types/referral';
import { useEffect, useState } from 'react';

export function useReferralRewardInfo() {
  const [refferalRewardInfo, setrefferalRewardInfo] =
    useState<RefferalRewardInfoType[]>();
  useEffect(() => {
    getReferralRewardsInfo();
  }, []);

  const getReferralRewardsInfo = async () => {
    api.defaults.baseURL = process.env.NEXT_PUBLIC_REFERRAL_API_URL;
    const response = await api.get(`${REFERRAL_REWARDS_INFO}`);
    if (response?.data) {
      const data = response?.data.map((rewardInfo: RefferalRewardInfoType) => {
        return {
          ...rewardInfo,
          Amount: formatCurrencyWithCommas(rewardInfo?.Amount),
        };
      });
      setrefferalRewardInfo(data);
    }
  };
  return refferalRewardInfo;
}
