import { TextField } from '@mui/material';
import { IAddDocument } from '@notes-rag/shared';
import { FC, HTMLInputTypeAttribute } from 'react';
import { Control, Controller } from 'react-hook-form';

interface Props {
  control: Control<IAddDocument>;
  label: string;
  name: 'document';
  required: string;
  type: HTMLInputTypeAttribute;
}

/**
 *
 * @param root0
 * @param root0.control
 * @param root0.label
 * @param root0.name
 * @param root0.required
 * @param root0.type
 */
export const AddDocumentComponent: FC<Props> = ({
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
          placeholder="Load document"
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
