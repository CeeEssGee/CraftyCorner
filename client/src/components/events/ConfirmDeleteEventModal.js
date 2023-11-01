import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteEvent } from "../../managers/eventManager";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";


function ConfirmDeleteEventModal({ getAllEvents, event }) {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    const navigate = useNavigate();

    const handleDeleteButton = () => {
        deleteEvent(event.id)
            .then(() => {
                getAllEvents();
            })
            .then(toggle)
            .then(navigate(`/community`))
    };

    return (
        <div>
            <Button className="deleteButton" onClick={toggle}
            >
                Delete
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader>Confirm Delete</ModalHeader>
                <ModalBody>Are you sure you want to delete this event?</ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={handleDeleteButton}>Confirm Delete</Button>{" "}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ConfirmDeleteEventModal;