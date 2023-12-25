import { formValues } from '@/types/contactUs';
import { ButtonProps } from '@tfo/mytfo-components/lib/components/Button/Button';
const commonProps = {
  title: 'dummy title',
  selectOptions: [{ label: 'hello', value: 'world' }],
  footerText: 'dummy footer',
  firstName: {
    label: 'First name',
    placeholder: 'Enter first name',
    validators: [],
  },
  lastName: {
    label: 'Last name',
    placeholder: 'Enter last name',
    validators: [],
  },
  phoneNo: {
    label: 'Phone number',
    placeholder: 'Enter phone number',
    validators: [],
  },
  email: { label: 'Email ID', placeholder: 'Enter email ID', validators: [] },
  button: {
    list: [{ text: 'Submit', type: 'submit' } as ButtonProps],
  },
  thankYouTitle: 'Thank you',
  thankYouDescription: 'Thank you',
  showThankYouMessage: false,
};
export const BASIC = {
  showImage: false,
  ...commonProps,
};

export const WITH_IMAGE = {
  showImage: true,
  imageProps: { src: 'https', alt: 'altImage' },
  ...commonProps,
};

export const INITIAL_VALUES: formValues = {
  firstName: '',
  lastName: '',
  country: '+966',
  phoneNo: '',
  email: '',
  resume: undefined,
  ga_client_id: '',
  first_source: '',
  last_source: '',
  page_form: '',
  submit_id: '',
};

export const MAX_FILE_SIZE = 5242880;
export const ALLOW_FILE_TYPES = '.pdf';
