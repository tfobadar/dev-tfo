import {
  InputGroup,
  Input as ChakraInput,
  InputRightElement,
  InputProps,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import { FormControlProps } from '@tfo/mytfo-components/lib/components/FormControl/FormControl';
import { useRef } from 'react';
import { ALLOW_FILE_TYPES } from '../ContactUs/constants';
import UploadIcon from '../Icons/UploadIcon';
import { useRouter } from 'next/router';
import isEnglishLanguage from '@/helpers/isEnglishLanguage';

interface FileInputProps extends Omit<InputProps, 'value'> {
  name: string;
  onBlur: () => void;
  handleChange: () => void;
  formControlProps: FormControlProps;
  value: File;
}

const FileInput = ({
  name,
  onBlur,
  onChange,
  value,
  handleChange,
  formControlProps,
  ...rest
}: FileInputProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const dir = isEnglishLanguage(router.locale);

  return (
    <FormControl isInvalid={formControlProps?.isInvalid}>
      <input
        type="file"
        accept={ALLOW_FILE_TYPES}
        ref={ref}
        style={{ display: 'none' }}
        onChange={handleChange}
        name={name}
      />
      <InputGroup>
        <ChakraInput
          {...rest}
          value={value?.name || ''}
          onBlur={onBlur}
          disabled={!value?.name}
        />
        <InputRightElement
          top={'8px'}
          right={dir ? '0' : 'unset'}
          left={!dir ? '0' : 'unset'}
        >
          <UploadIcon
            color="tfo.primary.500"
            _hover={{
              cursor: 'pointer',
            }}
            boxSize={4}
            onClick={() => {
              ref?.current?.click();
            }}
          />
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage {...formControlProps.errorProps}>
        {formControlProps.error}
      </FormErrorMessage>
    </FormControl>
  );
};

export default FileInput;
