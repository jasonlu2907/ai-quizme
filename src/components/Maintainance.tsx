import React from 'react';
import EmptyState from './EmptyState';

type Props = {};

const Maintainance = (props: Props) => {
  return (
    <EmptyState
      title='We are currently working on this feature.'
      subtitle='Stay tuned!!!'
    />
  );
};

export default Maintainance;
