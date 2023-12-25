import { theme } from '@tfo/mytfo-components';

export const REFERRAL_SEND_INVITE = '/Referral/SendReferral';
export const REFERRAL_REWARDS_INFO = '/Referral/GetRewardsInfo';
export const REFERRAL_REFEERER_REWARDS = '/Referral/GetReferrerRewards';
export const REFERRAL_CLAIM_REWARDS = '/Referral/ClaimRewards';
export const REFERRAL_CLAIM_TYPE = 'ADD_PORTFOLIO';
export const GET_REFERRAL_INVITATIONS = '/Referral/GetReferralInfo?referrerId=';
export const REFERRAL_USER_INFO = '/Referral/GetUserInfo?referrerId=';

const COMMON_INITIAL_VALUES = {
  firstName: '',
  lastName: '',
  country: '+966',
  phoneNo: '',
  email: '',
};

export const SELECT_CUSTOM_STYLES = {
  control: (baseStyles: any) => ({
    ...baseStyles,
    bgColor: 'gray.800',
    border: '1px solid',
    borderRadius: 'sm',
    color: 'gray.500',
    '&:hover': {
      borderColor: 'gray.200',
    },
    borderColor: 'gray.700',
  }),
  valueContainer: (baseStyles: any) => ({
    ...baseStyles,
    pe: 0,
  }),
  dropdownIndicator: (baseStyles: any) => ({
    ...baseStyles,
    ps: 0,
  }),
};

export const JEWELLERY_SELECT_CUSTOM_STYLES = {
  container: (baseStyles: any) => ({
    ...baseStyles,
    '& ::-webkit-scrollbar-track': {
      background: 'darkLava.400',
    },
    '& ::-webkit-scrollbar-thumb': {
      background: 'darkLava.400',
    },
  }),
  control: (baseStyles: any) => ({
    ...baseStyles,
    bgColor: theme.colors['tfo'].contrast[200],
    border: '1px solid',
    borderRadius: 'sm',
    color: 'darkLava.400',
    '&:hover': {
      borderColor: 'darkLava.400',
    },
    borderColor: 'darkLava.400',
  }),
  valueContainer: (baseStyles: any) => ({
    ...baseStyles,
    pe: 0,
  }),
  dropdownIndicator: (baseStyles: any) => ({
    ...baseStyles,
    ps: 0,
  }),
  option: (baseStyles: any, state: any) => ({
    ...baseStyles,
    color: state.isSelected ? 'darkLava.400' : 'gray.700',
    bgColor: theme.colors['tfo'].contrast[200],
    '&:hover': {
      bg: 'darkLava.400',
      color: 'gray.700',
    },
    zIndex: 1,
    position: 'relative',
  }),
};

export const GENERAL_INITIAL_VALUES = {
  ...COMMON_INITIAL_VALUES,
  message: '',
};
export const SCHEDULE_INITIAL_VALUES = {
  ...COMMON_INITIAL_VALUES,
  time: '',
  timeZone: 'Asia/Riyadh',
  date: '',
  nationality: '',
  intendedAmount: '300,000',
};

export const INPL_INITIAL_VALUES = {
  ...COMMON_INITIAL_VALUES,
  totalInvestment: '',
  preferredPortfolio: '',
  preferredPaymentPlan: '',
};

export const JEWELLERY_FORM_INITIAL_VALUES = {
  investmentGoal: [],
  investmentAmount: [],
  ...COMMON_INITIAL_VALUES,
};

export const TIME_ZONES = [
  { label: 'Asia/Riyadh', value: 'Asia/Riyadh' },
  { label: 'Asia/Dubai', value: 'Asia/Dubai' },
];

export const INTENDED_AMOUNTS = [
  { label: '300,000', value: '300,000' },
  { label: '300,000-500,000', value: '300,000-500,000' },
  { label: '500,000-1,000,000', value: '500,000-1,000,000' },
  { label: '1,000,000-3,000,000', value: '1,000,000-3,000,000' },
  { label: '3,000,000-5,000,000', value: '3,000,000-5,000,000' },
  { label: '5,000,000+', value: '5,000,000+' },
];
export const NATIONALITY = [
  { label: 'Afghan', value: 'Afghan' },
  { label: 'Albanian', value: 'Albanian' },
  { label: 'Algerian', value: 'Algerian' },
  { label: 'American', value: 'American' },
  { label: 'Andorran', value: 'Andorran' },
  { label: 'Angolan', value: 'Angolan' },
  { label: 'Anguillan', value: 'Anguillan' },
  { label: 'Argentine', value: 'Argentine' },
  { label: 'Armenian', value: 'Armenian' },
  { label: 'Australian', value: 'Australian' },
  { label: 'Austrian', value: 'Austrian' },
  { label: 'Azerbaijani', value: 'Azerbaijani' },
  { label: 'Bahamian', value: 'Bahamian' },
  { label: 'Bahraini', value: 'Bahraini' },
  { label: 'Bangladeshi', value: 'Bangladeshi' },
  { label: 'Barbadian', value: 'Barbadian' },
  { label: 'Belarusian', value: 'Belarusian' },
  { label: 'Belgian', value: 'Belgian' },
  { label: 'Belizean', value: 'Belizean' },
  { label: 'Beninese', value: 'Beninese' },
  { label: 'Bermudian', value: 'Bermudian' },
  { label: 'Bhutanese', value: 'Bhutanese' },
  { label: 'Bolivian', value: 'Bolivian' },
  { label: 'Botswanan', value: 'Botswanan' },
  { label: 'Brazilian', value: 'Brazilian' },
  { label: 'British', value: 'British' },
  { label: 'British Virgin Islander', value: 'British Virgin Islander' },
  { label: 'Bruneian', value: 'Bruneian' },
  { label: 'Bulgarian', value: 'Bulgarian' },
  { label: 'Burkinan', value: 'Burkinan' },
  { label: 'Burmese', value: 'Burmese' },
  { label: 'Burundian', value: 'Burundian' },
  { label: 'Cambodian', value: 'Cambodian' },
  { label: 'Cameroonian', value: 'Cameroonian' },
  { label: 'Canadian', value: 'Canadian' },
  { label: 'Cape Verdean', value: 'Cape Verdean' },
  { label: 'Cayman Islander', value: 'Cayman Islander' },
  { label: 'Central African', value: 'Central African' },
  { label: 'Chadian', value: 'Chadian' },
  { label: 'Chilean', value: 'Chilean' },
  { label: 'Chinese', value: 'Chinese' },
  {
    label: 'Citizen of Antigua and Barbuda',
    value: 'Citizen of Antigua and Barbuda',
  },
  {
    label: 'Citizen of Bosnia and Herzegovina',
    value: 'Citizen of Bosnia and Herzegovina',
  },
  { label: 'Citizen of Guinea-Bissau', value: 'Citizen of Guinea-Bissau' },
  { label: 'Citizen of Kiribati', value: 'Citizen of Kiribati' },
  { label: 'Citizen of Seychelles', value: 'Citizen of Seychelles' },
  {
    label: 'Citizen of the Dominican Republic',
    value: 'Citizen of the Dominican Republic',
  },
  { label: 'Citizen of Vanuatu', value: 'Citizen of Vanuatu' },
  { label: 'Colombian', value: 'Colombian' },
  { label: 'Comoran', value: 'Comoran' },
  { label: 'Congolese (Congo)', value: 'Congolese (Congo)' },
  { label: 'Congolese (DRC)', value: 'Congolese (DRC)' },
  { label: 'Cook Islander', value: 'Cook Islander' },
  { label: 'Costa Rican', value: 'Costa Rican' },
  { label: 'Croatian', value: 'Croatian' },
  { label: 'Cuban', value: 'Cuban' },
  { label: 'Cymraes', value: 'Cymraes' },
  { label: 'Cymro', value: 'Cymro' },
  { label: 'Cypriot', value: 'Cypriot' },
  { label: 'Czech', value: 'Czech' },
  { label: 'Danish', value: 'Danish' },
  { label: 'Djiboutian', value: 'Djiboutian' },
  { label: 'Dominican', value: 'Dominican' },
  { label: 'Dutch', value: 'Dutch' },
  { label: 'East Timorese', value: 'East Timorese' },
  { label: 'Ecuadorean', value: 'Ecuadorean' },
  { label: 'Egyptian', value: 'Egyptian' },
  { label: 'Emirati', value: 'Emirati' },
  { label: 'English', value: 'English' },
  { label: 'Equatorial Guinean', value: 'Equatorial Guinean' },
  { label: 'Eritrean', value: 'Eritrean' },
  { label: 'Estonian', value: 'Estonian' },
  { label: 'Ethiopian', value: 'Ethiopian' },
  { label: 'Faroese', value: 'Faroese' },
  { label: 'Fijian', value: 'Fijian' },
  { label: 'Filipino', value: 'Filipino' },
  { label: 'Finnish', value: 'Finnish' },
  { label: 'French', value: 'French' },
  { label: 'Gabonese', value: 'Gabonese' },
  { label: 'Gambian', value: 'Gambian' },
  { label: 'Georgian', value: 'Georgian' },
  { label: 'German', value: 'German' },
  { label: 'Ghanaian', value: 'Ghanaian' },
  { label: 'Gibraltarian', value: 'Gibraltarian' },
  { label: 'Greek', value: 'Greek' },
  { label: 'Greenlandic', value: 'Greenlandic' },
  { label: 'Grenadian', value: 'Grenadian' },
  { label: 'Guamanian', value: 'Guamanian' },
  { label: 'Guatemalan', value: 'Guatemalan' },
  { label: 'Guinean', value: 'Guinean' },
  { label: 'Guyanese', value: 'Guyanese' },
  { label: 'Haitian', value: 'Haitian' },
  { label: 'Honduran', value: 'Honduran' },
  { label: 'Hong Konger', value: 'Hong Konger' },
  { label: 'Hungarian', value: 'Hungarian' },
  { label: 'Icelandic', value: 'Icelandic' },
  { label: 'Indian', value: 'Indian' },
  { label: 'Indonesian', value: 'Indonesian' },
  { label: 'Iranian', value: 'Iranian' },
  { label: 'Iraqi', value: 'Iraqi' },
  { label: 'Irish', value: 'Irish' },
  { label: 'Israeli', value: 'Israeli' },
  { label: 'Italian', value: 'Italian' },
  { label: 'Ivorian', value: 'Ivorian' },
  { label: 'Jamaican', value: 'Jamaican' },
  { label: 'Japanese', value: 'Japanese' },
  { label: 'Jordanian', value: 'Jordanian' },
  { label: 'Kazakh', value: 'Kazakh' },
  { label: 'Kenyan', value: 'Kenyan' },
  { label: 'Kittitian', value: 'Kittitian' },
  { label: 'Kosovan', value: 'Kosovan' },
  { label: 'Kuwaiti', value: 'Kuwaiti' },
  { label: 'Kyrgyz', value: 'Kyrgyz' },
  { label: 'Lao', value: 'Lao' },
  { label: 'Latvian', value: 'Latvian' },
  { label: 'Lebanese', value: 'Lebanese' },
  { label: 'Liberian', value: 'Liberian' },
  { label: 'Libyan', value: 'Libyan' },
  { label: 'Liechtenstein citizen', value: 'Liechtenstein citizen' },
  { label: 'Lithuanian', value: 'Lithuanian' },
  { label: 'Luxembourger', value: 'Luxembourger' },
  { label: 'Macanese', value: 'Macanese' },
  { label: 'Macedonian', value: 'Macedonian' },
  { label: 'Malagasy', value: 'Malagasy' },
  { label: 'Malawian', value: 'Malawian' },
  { label: 'Malaysian', value: 'Malaysian' },
  { label: 'Maldivian', value: 'Maldivian' },
  { label: 'Malian', value: 'Malian' },
  { label: 'Maltese', value: 'Maltese' },
  { label: 'Marshallese', value: 'Marshallese' },
  { label: 'Martiniquais', value: 'Martiniquais' },
  { label: 'Mauritanian', value: 'Mauritanian' },
  { label: 'Mauritian', value: 'Mauritian' },
  { label: 'Mexican', value: 'Mexican' },
  { label: 'Micronesian', value: 'Micronesian' },
  { label: 'Moldovan', value: 'Moldovan' },
  { label: 'Monegasque', value: 'Monegasque' },
  { label: 'Mongolian', value: 'Mongolian' },
  { label: 'Montenegrin', value: 'Montenegrin' },
  { label: 'Montserratian', value: 'Montserratian' },
  { label: 'Moroccan', value: 'Moroccan' },
  { label: 'Mosotho', value: 'Mosotho' },
  { label: 'Mozambican', value: 'Mozambican' },
  { label: 'Namibian', value: 'Namibian' },
  { label: 'Nauruan', value: 'Nauruan' },
  { label: 'Nepalese', value: 'Nepalese' },
  { label: 'New Zealander', value: 'New Zealander' },
  { label: 'Nicaraguan', value: 'Nicaraguan' },
  { label: 'Nigerian', value: 'Nigerian' },
  { label: 'Nigerien', value: 'Nigerien' },
  { label: 'Niuean', value: 'Niuean' },
  { label: 'North Korean', value: 'North Korean' },
  { label: 'Northern Irish', value: 'Northern Irish' },
  { label: 'Norwegian', value: 'Norwegian' },
  { label: 'Omani', value: 'Omani' },
  { label: 'Pakistani', value: 'Pakistani' },
  { label: 'Palauan', value: 'Palauan' },
  { label: 'Palestinian', value: 'Palestinian' },
  { label: 'Panamanian', value: 'Panamanian' },
  { label: 'Papua New Guinean', value: 'Papua New Guinean' },
  { label: 'Paraguayan', value: 'Paraguayan' },
  { label: 'Peruvian', value: 'Peruvian' },
  { label: 'Pitcairn Islander', value: 'Pitcairn Islander' },
  { label: 'Polish', value: 'Polish' },
  { label: 'Portuguese', value: 'Portuguese' },
  { label: 'Prydeinig', value: 'Prydeinig' },
  { label: 'Puerto Rican', value: 'Puerto Rican' },
  { label: 'Qatari', value: 'Qatari' },
  { label: 'Romanian', value: 'Romanian' },
  { label: 'Russian', value: 'Russian' },
  { label: 'Rwandan', value: 'Rwandan' },
  { label: 'Salvadorean', value: 'Salvadorean' },
  { label: 'Sammarinese', value: 'Sammarinese' },
  { label: 'Samoan', value: 'Samoan' },
  { label: 'Sao Tomean', value: 'Sao Tomean' },
  { label: 'Saudi Arabian', value: 'Saudi Arabian' },
  { label: 'Scottish', value: 'Scottish' },
  { label: 'Senegalese', value: 'Senegalese' },
  { label: 'Serbian', value: 'Serbian' },
  { label: 'Sierra Leonean', value: 'Sierra Leonean' },
  { label: 'Singaporean', value: 'Singaporean' },
  { label: 'Slovak', value: 'Slovak' },
  { label: 'Slovenian', value: 'Slovenian' },
  { label: 'Solomon Islander', value: 'Solomon Islander' },
  { label: 'Somali', value: 'Somali' },
  { label: 'South African', value: 'South African' },
  { label: 'South Korean', value: 'South Korean' },
  { label: 'South Sudanese', value: 'South Sudanese' },
  { label: 'Spanish', value: 'Spanish' },
  { label: 'Sri Lankan', value: 'Sri Lankan' },
  { label: 'St Helenian', value: 'St Helenian' },
  { label: 'St Lucian', value: 'St Lucian' },
  { label: 'Stateless', value: 'Stateless' },
  { label: 'Sudanese', value: 'Sudanese' },
  { label: 'Surinamese', value: 'Surinamese' },
  { label: 'Swazi', value: 'Swazi' },
  { label: 'Swedish', value: 'Swedish' },
  { label: 'Swiss', value: 'Swiss' },
  { label: 'Syrian', value: 'Syrian' },
  { label: 'Taiwanese', value: 'Taiwanese' },
  { label: 'Tajik', value: 'Tajik' },
  { label: 'Tanzanian', value: 'Tanzanian' },
  { label: 'Thai', value: 'Thai' },
  { label: 'Togolese', value: 'Togolese' },
  { label: 'Tongan', value: 'Tongan' },
  { label: 'Trinidadian', value: 'Trinidadian' },
  { label: 'Tristanian', value: 'Tristanian' },
  { label: 'Tunisian', value: 'Tunisian' },
  { label: 'Turkish', value: 'Turkish' },
  { label: 'Turkmen', value: 'Turkmen' },
  { label: 'Turks and Caicos Islander', value: 'Turks and Caicos Islander' },
  { label: 'Tuvaluan', value: 'Tuvaluan' },
  { label: 'Ugandan', value: 'Ugandan' },
  { label: 'Ukrainian', value: 'Ukrainian' },
  { label: 'Uruguayan', value: 'Uruguayan' },
  { label: 'Uzbek', value: 'Uzbek' },
  { label: 'Vatican citizen', value: 'Vatican citizen' },
  { label: 'Venezuelan', value: 'Venezuelan' },
  { label: 'Vietnamese', value: 'Vietnamese' },
  { label: 'Vincentian', value: 'Vincentian' },
  { label: 'Wallisian', value: 'Wallisian' },
  { label: 'Welsh', value: 'Welsh' },
  { label: 'Yemeni', value: 'Yemeni' },
  { label: 'Zambian', value: 'Zambian' },
  { label: 'Zimbabwean', value: 'Zimbabwean' },
];

export const MEETING_TYPE = [
  { label: 'Phone Call', value: 'Phone Call' },
  { label: 'Virtual Meeting', value: 'Virtual Meeting' },
];
export const INPL_SCHEDULE_INITIAL_VALUES = {
  firstName: '',
  lastName: '',
  country: '+966',
  phoneNo: '',
  email: '',
  time: '',
  nationality: '',
  timeZone: 'Asia/Riyadh',
  date: '',
  intendedAmount: '300,000',
  meetingType: '',
  message: '',
};

export const DOWNLOAD_CONTENT_FORM_INITIAL_VALUES = {
  ...COMMON_INITIAL_VALUES,
  jobTitle: '',
  seniorityLevel: '',
  companyName: '',
  preferredTopics: '',
};

export const WHATSAPP_INVITE_FORM_INITIAL_VALUES = {
  inviteLink:
    typeof window !== 'undefined' &&
    `${window.location.protocol}//${window.location.hostname}/invite/`,
  utmParams: '?utmcampaign=referral-program&utmsource=',
};

export const JOB_TITLE = [
  { label: 'Administrator', value: 'Administrator' },
  { label: 'Advisor', value: 'Advisor' },
  { label: 'Analyst', value: 'Analyst' },
  { label: 'Architect', value: 'Architect' },
  { label: 'Assistant / Secretary', value: 'Assistant / Secretary' },
  { label: 'Auditor / Accountant', value: 'Auditor / Accountant' },
  { label: 'Banker', value: 'Banker' },
  { label: 'Broker / Trader', value: 'Broker / Trader' },
  { label: 'Chairman / Founder / Owner', value: 'Chairman / Founder / Owner' },
  {
    label: 'Chief Officer / President or equals',
    value: 'Chief Officer / President or equals',
  },
  { label: 'Coach', value: 'Coach' },
  { label: 'Consultant', value: 'Consultant' },
  { label: 'Designer', value: 'Designer' },
  { label: 'Engineer', value: 'Engineer' },
  { label: 'Expert / Specialist', value: 'Expert / Specialist' },
  {
    label: 'Financial advisor / Investment Banker',
    value: 'Financial advisor / Investment Banker',
  },
  { label: 'Head / Director', value: 'Head / Director' },
  { label: 'IT Specialist', value: 'IT Specialist' },
  { label: 'Lawyer / Attorney', value: 'Lawyer / Attorney' },
  { label: 'Manager', value: 'Manager' },
  { label: 'Marketing Specialist', value: 'Marketing Specialist' },
  { label: 'Media Specialist', value: 'Media Specialist' },
  { label: 'Medical Doctor/Consultant', value: 'Medical Doctor/Consultant' },
  { label: 'Partner', value: 'Partner' },
  { label: 'Researcher / Scientist', value: 'Researcher / Scientist' },
  { label: 'Sales Manager', value: 'Sales Manager' },
  { label: 'Supervisor / Coordinator', value: 'Supervisor / Coordinator' },
  {
    label: 'Teacher / Lecturer / Professor',
    value: 'Teacher / Lecturer / Professor',
  },
  { label: 'Translator / Interpreter', value: 'Translator / Interpreter' },
  { label: 'Other', value: 'Other' },
];

export const SENIORITY_LEVEL = [
  { label: 'Please Select', value: 'Please Select' },
  { label: 'C-Level / Executive', value: 'C-Level / Executive' },
  { label: 'SVP / VP', value: 'SVP / VP' },
  { label: 'Director', value: 'Director' },
  { label: 'Manager / Team Lead', value: 'Manager / Team Lead' },
  { label: 'Entry Level', value: 'Entry Level' },
  { label: 'Middle Level', value: 'Middle Level' },
  { label: 'Senior level', value: 'Senior level' },
  { label: 'Other', value: 'Other' },
];

export const SAVE_YOUR_SPOT_FORM_INITIAL_VALUES = {
  titleSalutation: '',
  firstName: '',
  lastName: '',
  email: '',
  membershipId: '',
};
