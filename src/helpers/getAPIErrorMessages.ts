import getFieldsByComponent from './getFieldsByComponent';
import { SBStoryData } from '@/types/component';

type IParams = {
  error: any;
  defaultMessage: string;
  validators: SBStoryData[];
};

export default function getAPIErrorMessages({
  error,
  defaultMessage,
  validators,
}: IParams) {
  const errorCode =
    JSON.parse(
      error?.response?.data?.errorMsg ?? null,
    )?.validationResults?.[0]?.error?.toLowerCase() ?? null;

  let message = defaultMessage;

  if (errorCode) {
    message =
      getFieldsByComponent({
        list: validators,
        component: errorCode,
      })?.message ?? defaultMessage;
  }

  return message;
}
