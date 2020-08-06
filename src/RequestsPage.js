import React, {useState, useEffect} from 'react';
import AddRequestForm from './AddRequestForm';
import RequestsList from './RequestsList';
import {getFeedbackRequests, addFeedbackRequest, removeFeedbackRequest} from './apiCalls';
import {toast} from 'react-toastify';

const RequestsPage = props => {
  const [requestList, setRequestList] = useState([]);

  useEffect(() => {
    getFeedbackRequests()
      .then(response => {
        setRequestList(response);
      })
      .catch(e => {
        toast.error(
          `Failed to get feedback requests. Check your internet connection`,
        );
      });
  }, []);

  const handleAddingRequest = (newRequest) => {
    const request = {
      name: newRequest,
    };
    addFeedbackRequest(request)
      .then(result => {
        setRequestList([...requestList, result]);
      })
      .catch(e => {
        toast.error(`Failed to save request. Check your internet connection`);
      });
  }

  const handleDelete = id => {
    removeFeedbackRequest({id: id})
      .then(result => {
        setRequestList(requestList.filter(q => q.id !== id));
      })
      .catch(e => {
        toast.error(`Failed to delete feedback request. Check your internet connection`);
      });
  };

  return (
    <>
      <AddRequestForm {...props} handleAddingRequest={handleAddingRequest} />
      <RequestsList {...props} requestList={requestList} handleDelete={handleDelete} />
    </>
  );
};

export default RequestsPage;
