import { SBStoryData } from '@/types/component';

type IParams = {
  list: SBStoryData[];
  component: string;
  index?: number;
};

/**
 * Given an array of components, returns is all fields/properties
 * */
export default function getSectionTitleField({
  list,
  component,
  index = 0,
}: IParams) {
  return list?.filter((item) => item.component === component)?.[index] || {};
}
