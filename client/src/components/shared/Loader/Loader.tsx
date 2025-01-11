import React from 'react';
import { LoaderContainer } from './Loader.styles';
import { CircularProgress } from '@mui/material';

const Loader: React.FC = () => {
  return (
    <LoaderContainer>
      <CircularProgress />
    </LoaderContainer>
  );
};

export default Loader;
