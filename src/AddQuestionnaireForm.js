import React, { useState } from "react";
import {
  FormGroup,
  Button,
  FormControl,
  FormLabel,
  Modal
} from "react-bootstrap";

const AddQuestionnaireForm = params => {
  const [newQuestionnaire, setNewQuestionnaire] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleNewQuestionnaire = event => {
    setNewQuestionnaire(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    params.handleAddingQuestionnaire(newQuestionnaire);
    setNewQuestionnaire("");
    setShow(false);
  };

  return (
    <>
      <Button
        variant="primary"
        name="add-new-questionnaire"
        cy-data="add-new-questionnaire"
        onClick={handleShow}
      >
        Add new questionnaire
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Adding new questionnaire</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit} className="questionnaire">
          <Modal.Body>
            <FormGroup controlId="questionnaire">
              <FormLabel>Title</FormLabel>
              <FormControl
                autoFocus
                name="questionnaire"
                cy-data="questionnaire"
                value={newQuestionnaire}
                onChange={handleNewQuestionnaire}
              />
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              name="add-questionnaire"
              type="submit"
              cy-data="add-questionnaire"
              variant="primary"
            >
              Add questionnaire
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default AddQuestionnaireForm;
