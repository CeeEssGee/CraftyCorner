import { useState } from "react";
import { deleteItem } from "../../managers/itemManager";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useNavigate } from "react-router-dom";


function ConfirmDeleteItemModal({ getAllItems, item }) {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    const navigate = useNavigate();

    const handleDeleteButton = () => {
        deleteItem(item.id)
            .then(() => {
                getAllItems();
            })
            .then(toggle)
            .then(navigate(`/items`))
    };

    return (
        <div>
            <Button className="redButton" onClick={toggle}>
                Delete
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader>Confirm Delete</ModalHeader>
                <ModalBody>Are you sure you want to delete this item?</ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={handleDeleteButton}>
                        Confirm Delete
                    </Button>{" "}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ConfirmDeleteItemModal;