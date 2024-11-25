'use client';

import { Button, Skeleton, Typography } from '@mui/material';
import { IQuery } from '@notes-rag/shared';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { axiosInstance } from '../../src/axios/axios.config';
import { HeaderComponent } from '../../src/components/header/header-component';
import { QueryController } from '../../src/components/query-controller/query-controller.component';

export default function Page() {
  const router = useRouter();
  const [documents, setDocuments] = useState<string[]>([]);
  const [err, setErr] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<string>('');
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IQuery>({
    mode: 'onChange',
  });

  console.log(err);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await axiosInstance({
          method: 'get',
          url: 'user/document',
        });
        setDocuments(res.data);
      } catch (error) {
        setErr(error as string);
      }
    };

    fetchDocuments();
  }, []);

  const onLogout = async () => {
    try {
      await axiosInstance({
        method: 'get',
        url: 'user/logout',
      });
      router.push('/');
    } catch (err) {
      setErr(err as string);
    }
  };

  /**
   *
   * @param data
   */
  const onQuerySubmit: SubmitHandler<IQuery> = async (data) => {
    try {
      setIsLoading(true);
      const res = await axiosInstance({
        data: data,
        method: 'post',
        url: 'user/prediction',
      });
      setIsLoading(false);
      setResponse(res.data.prediction);
    } catch (err) {
      setErr(err as string);
    }
  };

  return (
    <>
      <HeaderComponent
        documents={documents}
        onLogout={onLogout}
        open={open}
        setOpen={setOpen}
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
