'use client';

import { Box, Button, Skeleton } from '@mui/material';
import { IQuery, IRagHistory } from '@notes-rag/shared';
import { AxiosError } from 'axios';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { HeaderComponent } from '../../src/components/header/header-component';
import { QueryController } from '../../src/components/query-controller/query-controller.component';
import { RagItemComponent } from '../../src/components/rag-item/rag-item.component';
import { axiosInstance } from '../../src/configs/axios.config';
import { useGetFirebaseToken } from '../../src/hooks/use-get-firebase-token.hook';

export default function Page() {
  const { token } = useGetFirebaseToken();
  const [history, setHistory] = useState<IRagHistory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IQuery>({
    mode: 'onChange',
  });

  const onQuerySubmit: SubmitHandler<IQuery> = async (data) => {
    try {
      setIsLoading(true);
      await axiosInstance({
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'GET',
        url: `${process.env.ROUTE_POST_QUERY}/${data.query}`,
      });
      setIsLoading(false);
      reset({
        query: '',
      });
    } catch (err) {
      if (err instanceof AxiosError) {
        enqueueSnackbar(`${err.response?.data.message}`, {
          variant: 'error',
        });
        reset({
          query: '',
        });
      }
    }
  };

  useEffect(() => {
    if (!token) return;

    const getHistory = async () => {
      try {
        const response = await axiosInstance({
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: 'GET',
          url: process.env.ROUTE_GET_RAG_HISTORY,
        });
        setHistory(response.data);
      } catch (err) {
        if (err instanceof AxiosError)
          enqueueSnackbar(`${err.response?.data.message}`, {
            variant: 'error',
          });
      }
    };
    getHistory();
  }, [token, isLoading]);

  return (
    <>
      <HeaderComponent />
      <Box
        sx={{
          margin: '0 auto',
          maxWidth: '700px',
          padding: '20px',
          paddingBottom: '80px',
        }}
      >
        <Box
          sx={{
            borderRadius: '10px',
            height: '100%',
          }}
        >
          {history.map((item, index) => (
            <RagItemComponent
              key={index}
              query={item.query}
              response={item.response}
            />
          ))}
          {isLoading ? (
            <>
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
            </>
          ) : null}
        </Box>
      </Box>
      <form
        onSubmit={handleSubmit(onQuerySubmit)}
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          bottom: '10px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          left: '10px',
          margin: '0 auto',
          maxWidth: '700px',
          padding: '10px',
          position: 'fixed',
          right: '10px',
        }}
      >
        <QueryController
          control={control}
          label="Query"
          name="query"
          required="Query is required"
          type="text"
        />
        {errors.query && <p style={{ color: 'red' }}>{errors.query.message}</p>}
        <Button fullWidth type="submit" variant="outlined">
          Submit
        </Button>
      </form>
    </>
  );
}
