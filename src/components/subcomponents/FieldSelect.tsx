import { Box, Text, useMultiStyleConfig } from '@chakra-ui/react';
import { Select } from '@tfo/mytfo-components';
import { Field, FieldProps } from 'formik';

interface Option {
  value: string;
  label: string;
}

type OptionList = Array<Option>;

export default function FieldSelect({
  label,
  options,
  name,
}: {
  label: string;
  options: OptionList;
  name: string;
}) {
  const getValueOption = (options: OptionList, value: string) => {
    return options ? options.find((option) => option.value === value) : '';
  };

  const styles = useMultiStyleConfig(`SelectControl`);

  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => (
        <Box>
          <Text mb="3" fontWeight={500}>
            {label}
          </Text>
          <Select
            id={field.name}
            placeholder="Select"
            selectOptions={options}
            name={field.name}
            value={getValueOption(options, field.value)}
            onChange={(option: { value: string }) =>
              form.setFieldValue(field.name, option.value)
            }
            onBlur={field.onBlur}
            isSearchable={false}
            variant="basic"
            chakraStyles={{
              ...styles,
              control: (provided: any) => {
                return {
                  ...provided,
                  ...styles.control,
                  borderRadius: '2px',
                  border: '1px solid',
                  borderColor: 'whiteAlpha.300',
                  _focus: {
                    borderColor: 'tfo.primary.500',
                  },
                  _hover: {
                    borderColor: 'whiteAlpha.400',
                  },
                };
              },
            }}
          />
        </Box>
      )}
    </Field>
  );
}
