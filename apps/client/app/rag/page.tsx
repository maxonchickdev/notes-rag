'use client';

import { Button, Skeleton, Typography } from '@mui/material';
import { IQuery } from '@notes-rag/shared';
import { useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { HeaderComponent } from '../../src/components/header/header-component';
import { QueryController } from '../../src/components/query-controller/query-controller.component';

export default function Page() {
  const [documents, setDocuments] = useState<string[]>([]);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpenModal = useCallback(() => {
    setOpenModal(true);
  }, []);

  const handleOpenDrawer = useCallback(() => {
    setOpenDrawer(true);
  }, []);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IQuery>({
    mode: 'onChange',
  });

  const onQuerySubmit: SubmitHandler<IQuery> = async (data) => {
    console.log(data);
  };

  const handleCloseDrawer = useCallback(() => {
    setOpenDrawer(false);
  }, []);

  return (
    <>
      <HeaderComponent
        documents={documents}
        handleCloseDrawer={handleCloseDrawer}
        handleOpenDrawer={handleOpenDrawer}
        onLogout={() => console.log('logout')}
        openDrawer={openDrawer}
      />
      <form
        onSubmit={handleSubmit(onQuerySubmit)}
        style={{
          bottom: '50px',
          left: '50%',
          maxWidth: '700px',
          position: 'absolute',
          transform: 'translateX(-50%)',
          width: '100%',
        }}
      >
        {isLoading ? (
          <>
            <Skeleton />
            <Skeleton animation="wave" />
          </>
        ) : (
          <Typography>{response}</Typography>
        )}

        <QueryController
          control={control}
          label="Query"
          name="query"
          required="Query is required"
          type="text"
        />
        {errors.query && errors.query.message}

        <Button fullWidth type="submit" variant="outlined">
          Submit
        </Button>
      </form>
    </>
  );
}
