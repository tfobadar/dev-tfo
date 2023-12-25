import { RefferalRewardInfoType } from '@/types/referral';

type IParams = {
  list: RefferalRewardInfoType[] | undefined;
  heading: string;
};

/**
 * Given an array of list return filtered amount
 * */
export default function getFilteredList({ list, heading }: IParams) {
  const filteredArr = list?.filter((item) => item.RewardStage == heading);
  return filteredArr?.[0]?.Amount;
}
