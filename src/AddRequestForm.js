import React, {useState} from 'react';
import {FormGroup, Button, FormControl, FormLabel} from 'react-bootstrap';

const AddRequestForm = params => {
  const [newRequest, setNewRequest] = useState('');

  const handleNewRequest = event => {
    setNewRequest(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    params.handleAddingRequest(newRequest);
    setNewRequest('');
  }

  return (
    <form onSubmit={handleSubmit} className="requests-form">
      <FormGroup controlId="feedback-request">
        <FormLabel>Add request</FormLabel>
        <FormControl
          autoFocus
          name="feedback-request"
          cy-data="feedback-request"
          value={newRequest}
          onChange={handleNewRequest}
        />
      </FormGroup>
      <Button
        name="add-request"
        type="submit"
        cy-data="add-request"
        variant="primary">
        Add request
      </Button>
    </form>
  );
};

export default AddRequestForm;
