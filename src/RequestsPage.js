import React from 'react';
import AddRequestForm from './AddRequestForm'
import RequestsList from './RequestsList'

const RequestsPage = params => {
  return (
    <>
      <AddRequestForm {...params} />
      <RequestsList {...params} />
    </>
  );
};

export default RequestsPage;
