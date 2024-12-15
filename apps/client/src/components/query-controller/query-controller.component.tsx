import { TextField } from '@mui/material';
import { IQuery } from '@notes-rag/shared';
import { FC, HTMLInputTypeAttribute } from 'react';
import { Control, Controller } from 'react-hook-form';

interface Props {
  control: Control<IQuery>;
  label: string;
  name: 'query';
  required: string;
  type: HTMLInputTypeAttribute;
}

export const QueryController: FC<Props> = ({
  control,
  label,
  name,
  required,
  type,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value = '' } }) => (
        <TextField
          fullWidth
          label={label}
          onChange={onChange}
          placeholder="Enter query"
          size="small"
          sx={{ margin: '4px 0', width: '700px' }}
          type={type}
          value={value}
        />
      )}
      rules={{
        required: required,
      }}
    />
  );
};
