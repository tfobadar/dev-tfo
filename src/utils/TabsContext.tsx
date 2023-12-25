import { createContext } from 'react';

interface TabsContextType {
  data: number;
  updateData: (newValue: number) => void;
}

const TabsContext = createContext<TabsContextType>({
  data: 0,
  updateData: () => {},
});

export default TabsContext;
