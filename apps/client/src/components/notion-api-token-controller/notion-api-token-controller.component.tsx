import { TextField } from '@mui/material';
import { INotionApiToken } from '@notes-rag/shared';
import { FC, HTMLInputTypeAttribute } from 'react';
import { Control, Controller } from 'react-hook-form';

interface Props {
  control: Control<INotionApiToken>;
  label: string;
  name: 'token';
  required: string;
  type: HTMLInputTypeAttribute;
}

export const NotionApiTokenController: FC<Props> = ({
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
          placeholder="Paste notion integration token"
          size="small"
          sx={{ margin: '4px 0' }}
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
