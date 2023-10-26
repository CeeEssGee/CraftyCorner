import { useState } from "react"
import { deleteCategory } from "../../managers/categoryManager";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export const DeleteCategoryModal = ({ category, getAllCategories }) => {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const handleDeleteButton = () => {
        deleteCategory(category.id)
            .then(() => {
                getAllCategories();
            })
            .then(toggle);
    };

    return (
        <div>
            <Button className="deleteButton" onClick={toggle}>
                Delete
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Confirm Delete</ModalHeader>
                <ModalBody>Are you sure you want to delete this category?</ModalBody>
                <ModalFooter>
                    <Button className="deleteButton" onClick={handleDeleteButton}>Confirm Delete</Button>{" "}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}