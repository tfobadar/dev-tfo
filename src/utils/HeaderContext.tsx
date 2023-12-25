import { createContext } from 'react';

interface HeaderContextType {
  showLanguageSwitch: boolean;
  toggleLanguageSwitch: (newValue: boolean) => void;
}

const HeaderContext = createContext<HeaderContextType>({
  showLanguageSwitch: true,
  toggleLanguageSwitch: () => {},
});

export default HeaderContext;
