import { IconProps, Icon } from '@chakra-ui/react';

const TickIcon = (props: IconProps) => (
  <Icon viewBox="0 0 16 16" w={6} h={6} {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 25" fill="none">
      <path
        d="M10.0007 15.6715L19.1927 6.47852L20.6077 7.89252L10.0007 18.4995L3.63672 12.1355L5.05072 10.7215L10.0007 15.6715Z"
        fill="#B99855"
      />
    </svg>
  </Icon>
);

export default TickIcon;
