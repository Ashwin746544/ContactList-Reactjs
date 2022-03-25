import { Button, Modal } from 'react-bootstrap';

function GenericModal(props) {
  return (
    <>
      <Modal show={props.show} onHide={props.cancelHandler}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.cancelHandler}>
            Cancel
          </Button>
          <Button variant="primary" onClick={props.successHandler}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default GenericModal;      