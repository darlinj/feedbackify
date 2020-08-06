import React from 'react';
import {ListGroup, Jumbotron} from 'react-bootstrap';
import {FaMinusSquare} from 'react-icons/fa';

const RequestsList = params => {
  const handleDelete = (id, event) => {
    event.preventDefault();
    params.handleDelete(id);
  };

  const showRequestList = () => {
    const requestList = params.requestList || [];
    if (requestList.length === 0) {
      return <div>No requests yet. Please add requests below</div>;
    } else {
      return (
        <ListGroup
          name="requests"
          cy-data="request-list"
          className="requests">
          {requestList.map((requestObject, index) => {
            return (
              <ListGroup.Item className="request-item" key={index}>
                {requestObject.request}{' '}
                <button
                  className="btn"
                  onClick={e => handleDelete(requestObject.id, e)}
                  value={requestObject.id}
                  cy-data="delete-request"
                  style={{float: 'right'}}>
                  <FaMinusSquare style={{color: 'red'}} />
                </button>{' '}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      );
    }
  };

  return (
    <Jumbotron>
      <h2>Request list</h2>
      {showRequestList()}
    </Jumbotron>
  );
};

export default RequestsList;
