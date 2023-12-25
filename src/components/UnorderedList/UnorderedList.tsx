import React from 'react';
import { Flex, List, ListIcon } from '@chakra-ui/react';
import TickIcon from '../Icons/TickIcon';
type IParams = {
  children: React.ReactNode;
  bulletsType?: string;
};
function CustomUnorderedList({ children = [], bulletsType }: IParams) {
  return (
    <List
      ml={bulletsType == 'tick' ? 0 : 6}
      listStyleType={bulletsType == 'tick' ? 'none' : 'initial'}
    >
      {/* @ts-ignore */}
      {children?.map((child, idx) => (
        <Flex align={'center'} key={`${child} ${idx}`} mb={2.5}>
          {bulletsType == 'tick' && (
            <ListIcon
              as={TickIcon}
              bgColor={'tfo.primary.900'}
              w={6}
              h={6}
              borderRadius={'6px'}
              mr={2.5}
            />
          )}
          {child}
        </Flex>
      ))}
    </List>
  );
}

export default CustomUnorderedList;
