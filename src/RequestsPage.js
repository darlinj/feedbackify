import React from 'react';
import AddRequestsForm from './AddRequestsForm'

const RequestsPage = params => {
  return (
    <>
      <AddRequestsForm {...params} />
      <RequestsList {...params} />
    </>
  );
};

export default RequestsPage;
