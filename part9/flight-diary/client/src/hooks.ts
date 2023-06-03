import { ChangeEvent, HTMLInputTypeAttribute, useState } from 'react';

export interface UseFieldProps {
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  initialValue?: string;
}

export const useField = ({
  type = 'text',
  placeholder = '',
  initialValue = undefined
}: UseFieldProps) => {
  const [value, setValue] = useState<string | undefined>(initialValue);

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
