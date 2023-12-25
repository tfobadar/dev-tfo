import formatCurrencyWithCommas from '@/helpers/formatCurrencyWithCommas';
import {
  FormControl,
  FormErrorMessage,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { FormControlProps } from '@tfo/mytfo-components/lib/components/FormControl/FormControl';
import { FieldProps } from 'formik';
import InfoIcon from '../Icons/InfoIcon';

export default function FieldSlider({
  field,
  form,
  meta,
  min,
  max,
  step,
  label,
  initialValue,
  placeholder,
  formControlProps,
  handleChange,
  formatter = formatCurrencyWithCommas,
  showTooltip = false,
  tooltipLabel = '',
}: FieldProps & {
  formControlProps: FormControlProps;
  min: number;
  max: number;
  step: number;
  label: string;
  placeholder: string;
  initialValue: number;
  handleChange: (value: number) => void;
  formatter?: (...args: any[]) => string;
  showTooltip?: boolean;
  tooltipLabel?: string;
}) {
  return (
    <FormControl isInvalid={(meta?.error && meta?.touched) as boolean}>
      <Text fontWeight={500}>{label}</Text>
      <Text fontSize="sm" color="gray.500" mb={3}>
        {placeholder}
        {showTooltip && (
          <Tooltip
            label={tooltipLabel}
            fontSize="sm"
            bg="gray.750"
            hasArrow
            color="white"
            fontWeight={400}
            p={3}
          >
            <span>
              <InfoIcon color="tfo.primary.500" boxSize={5} paddingStart="1" />
            </span>
          </Tooltip>
        )}
      </Text>
      <Slider
        id={field.name}
        name={field.name}
        defaultValue={initialValue}
        min={min}
        max={max}
        value={field.value}
        step={step}
        onChange={handleChange}
        onBlur={field.onBlur}
      >
        <SliderTrack>
          <SliderFilledTrack bg="tfo.primary.500" />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <Text textAlign="end">{formatter(field.value, true)}</Text>
      <FormErrorMessage {...formControlProps.errorProps}>
        {meta.error}
      </FormErrorMessage>
    </FormControl>
  );
}
