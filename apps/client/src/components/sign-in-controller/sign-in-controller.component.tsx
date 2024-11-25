import { TextField } from '@mui/material';
import { ISignInUser } from '@notes-rag/shared';
import { FC, HTMLInputTypeAttribute } from 'react';
import { Control, Controller } from 'react-hook-form';

interface Props {
  control: Control<ISignInUser>;
  label: string;
  name: 'email' | 'password';
  required: string;
  type: HTMLInputTypeAttribute;
}

export const SignInController: FC<Props> = ({
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
          onChange={onChange}
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
