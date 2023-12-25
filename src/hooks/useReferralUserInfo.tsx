import { REFERRAL_USER_INFO } from '@/components/Forms/constants';
import api from '@/helpers/getAxiosInstance';
import { useCallback, useEffect, useState } from 'react';

type IParams = {
  inviteCode: string;
};

export function useReferralUserInfo({ inviteCode }: IParams) {
  const [userInfo, setUserInfo] = useState();
  const [isError, setIsError] = useState<boolean>(false);

  const getReferralUserInfo = useCallback(async () => {
    api.defaults.baseURL = process.env.NEXT_PUBLIC_REFERRAL_API_URL;
    try {
      const response = await api.get(`${REFERRAL_USER_INFO}${inviteCode}`);
      if (response) {
        setUserInfo(response.data);
      }
    } catch {
      setIsError(true);
    }
  }, [inviteCode]);

  useEffect(() => {
    getReferralUserInfo();
  }, [getReferralUserInfo]);

  return { userInfo, isError };
}
