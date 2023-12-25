import isEnglishLanguage from '@/helpers/isEnglishLanguage';
import { Container, FlexProps } from '@chakra-ui/layout';
import { Box, chakra, HStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Options {
  value: string;
  label: string;
}

export type CustomButtonGroupProps = Pick<FlexProps, 'children'> & {
  listOfButtons: Options[];
  selectedOption: string[];
  onClickCallBack: Function;
  isMultiSelect?: boolean;
};

const CustomButtonGroup = ({
  listOfButtons,
  selectedOption,
  onClickCallBack,
  isMultiSelect = false,
}: CustomButtonGroupProps) => {
  const [selectedValue, setSelectValue] = useState<string[]>(selectedOption);

  useEffect(() => {
    if (selectedOption) {
      setSelectValue(selectedOption);
    }
  }, [selectedOption]);
  const { locale } = useRouter();
  /**
   * Toggles the selection state of values in a dropdown or select component.
   *
   * @param {string} value - The selected value.
   * @param {number} index - The index of the selected value.
   */
  const selectToggle = (value: string, index: number) => {
    if (isMultiSelect) {
      const updatedValues = !selectedValue.includes(value)
        ? [...selectedValue, value]
        : [
            ...selectedValue.filter((option) => {
              return option !== value;
            }),
          ];
      setSelectValue(updatedValues);
      onClickCallBack(updatedValues, index);
    } else {
      setSelectValue([value]);
      onClickCallBack([value], index);
    }
  };

  return (
    <Container flex="1" px="0 !important" mx="0">
      <HStack spacing="5" flexWrap="wrap">
        {listOfButtons?.map(({ value, label }, index) => (
          <chakra.button
            key={index}
            type="button"
            p="4"
            alignItems="center"
            justifyContent="center"
            color="gray.900"
            fontSize="sm"
            cursor={'pointer'}
            backgroundColor={
              selectedValue.includes(value) ? 'darkLava.400' : 'transparent'
            }
            borderRadius="md"
            borderWidth="1px"
            borderStyle="solid"
            borderColor={
              selectedValue.includes(value) ? 'transparent' : 'darkLava.400'
            }
            height="auto"
            fontWeight={isEnglishLanguage(locale) ? 'medium' : 'bold'}
            transition="all .3s ease-in-out"
            textAlign="center"
            onClick={() => selectToggle(value, index)}
          >
            <Box as="span" display="inline-block">
              {label}
            </Box>
          </chakra.button>
        ))}
      </HStack>
    </Container>
  );
};
export default CustomButtonGroup;
