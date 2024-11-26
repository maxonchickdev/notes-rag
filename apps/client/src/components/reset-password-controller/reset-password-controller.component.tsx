import { TextField } from '@mui/material';
import { IResetPassword } from '@notes-rag/shared';
import { FC, HTMLInputTypeAttribute } from 'react';
import { Control, Controller } from 'react-hook-form';

interface Props {
  control: Control<IResetPassword>;
  label: string;
  name: 'email';
  required: string;
  type: HTMLInputTypeAttribute;
}

export const ResetPasswordController: FC<Props> = ({
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
      render={({ field: { onChange, value } }) => (
        <TextField
          defaultValue={value}
          fullWidth
          label={label}
          multiline
          onChange={onChange}
          placeholder="Email"
          rows={2}
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
