import { formValues } from './contactUs';

export type getScheduleResponse = {
  AvailabilityView: {
    Availability: { Option: string; Value: string }[];
  };
};

export type timeSlotsType = {
  label: string;
  value: string;
}[];

export type callFormValues = formValues & {
  date: string;
  time: string;
  intendedAmount: string;
  nationality: string;
};
export type INPLcallFormValues = formValues & {
  date: string;
  time: string;
  intendedAmount: string;
  nationality: string;
  meetingType: any;
  message: any;
};
