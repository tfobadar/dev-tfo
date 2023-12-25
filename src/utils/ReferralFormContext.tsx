import { formValues } from '@/types/contactUs';
import { createContext } from 'react';

interface ReferralFormContextType {
  referralData: formValues | undefined;
  updateReferralData: (newValue: formValues) => void;
}

const ReferralFormContext = createContext<ReferralFormContextType>({
  referralData: {
    firstName: '',
    lastName: '',
    country: '+966',
    phoneNo: '',
    email: '',
    termsAndCondition: false,
  },
  updateReferralData: () => {},
});

export default ReferralFormContext;
