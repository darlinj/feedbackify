import React, { useState } from "react";
import {
  FormGroup,
  Button,
  FormControl,
  FormLabel,
  Modal
} from "react-bootstrap";

const AddRequestForm = params => {
  const [newRequest, setNewRequest] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleNewRequest = event => {
    setNewRequest(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    params.handleAddingRequest(newRequest);
    setNewRequest("");
    setShow(false);
  };

  return (
    <>
      <Button
        variant="primary"
        name="add-new-request"
        cy-data="add-new-request"
        onClick={handleShow}
      >
        Add new feedback survey
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit} className="requests-form">
          <Modal.Body>
            <FormGroup controlId="feedback-request">
              <FormLabel>New request title</FormLabel>
              <FormControl
                autoFocus
                name="feedback-request"
                cy-data="feedback-request"
                value={newRequest}
                onChange={handleNewRequest}
              />
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              name="add-request"
              type="submit"
              cy-data="add-request"
              variant="primary"
            >
              Add request
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default AddRequestForm;
