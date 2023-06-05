import { Dayjs } from 'dayjs';
import { ChangeEvent, HTMLInputTypeAttribute, useState } from 'react';

export interface UseFieldProps {
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  initialValue?: string;
}

export const useField = ({
  type = 'text',
  placeholder = '',
  initialValue = ''
}: UseFieldProps) => {
  const [value, setValue] = useState<string>(initialValue);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const clear = () => {
    setValue('');
  };

  return [
    {
      type,
      value,
      onChange,
      placeholder
    },
    clear
  ] as const;
};

export interface UseFieldProps {
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  initialValue?: string;
}

export const useDate = ({
  type = 'text',
  placeholder = '',
  initialValue = ''
}: UseFieldProps) => {
  const [value, setValue] = useState<Dayjs | null>(null);

  const onChange = (value: Dayjs | null) => {
    setValue(value);
  };

  const clear = () => {
    setValue(null);
  };

  return [
    {
      type,
      value,
      onChange,
      placeholder
    },
    clear
  ] as const;
};
