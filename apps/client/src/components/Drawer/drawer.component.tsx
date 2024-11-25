'use client';

import { Box, Button, Drawer, Typography } from '@mui/material';
import { IAddDocument } from '@notes-rag/shared';
import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { axiosInstance } from '../../axios/axios.config';
import { AddDocumentComponent } from '../add-document-controller/add-document-controller.component';
import { DocumentComponent } from '../document/document.component';

interface Props {
  documents: string[];
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const DrawerComponent: FC<Props> = ({ documents, open, setOpen }) => {
  const [err, setErr] = useState<string>('');
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IAddDocument>({
    mode: 'onChange',
  });

  console.log(err);
  /**
   *
   * @param data
   */
  const onLoadDocument: SubmitHandler<IAddDocument> = async (data) => {
    try {
      await axiosInstance({
        data: data,
        method: 'post',
        url: 'user/document',
      });
      documents.unshift(data.document);
    } catch (err) {
      setErr(err as string);
    }
  };
  return (
    <Drawer anchor="left" onClose={() => setOpen(false)} open={open}>
      <Box sx={{ p: '10px', width: '600px' }}>
        <Typography variant="h6">Load documents</Typography>
        <form onSubmit={handleSubmit(onLoadDocument)}>
          <AddDocumentComponent
            control={control}
            label="Document"
            name="document"
            required="Document is required"
            type="text"
          />
          {errors.document && errors.document.message}
          <Button fullWidth sx={{ my: '5px' }} type="submit" variant="outlined">
            Load document
          </Button>
        </form>
        <Box sx={{ mt: '20px' }}>
          {documents.length !== 0 ? (
            documents.map((document, index) => (
              <DocumentComponent document={document} key={index} />
            ))
          ) : (
            <Typography>No documents</Typography>
          )}
        </Box>
      </Box>
    </Drawer>
  );
};
