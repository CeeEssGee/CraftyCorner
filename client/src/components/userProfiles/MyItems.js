import { useEffect, useState } from "react";
import { getItemsByUserId } from "../../managers/itemManager";
import ItemCard from "../items/ItemCard";
import { Button, Modal, ModalHeader } from "reactstrap";
import { CreateItemModal } from "../items/CreateItemModal";

export default function MyItems({ loggedInUser }) {
    const [items, setItems] = useState([]);

    const [createModal, setCreateModal] = useState(false);
    const toggle = () => {
        setCreateModal(!createModal)
    };

    const getAllItems = () => {
        getItemsByUserId(loggedInUser.id).then(setItems)
    }

    useEffect(() => {
        getAllItems()
    }, []);

    if (items.length === 0) {
        return (
            <>
                <h3 className="profileItems">Add some items!</h3>
                <Button
                    className="createMyItem"
                    onClick={toggle}>
                    Create Item
                </Button>
                <Modal isOpen={createModal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Add Item</ModalHeader>
                    <CreateItemModal toggle={toggle} getAllItems={getAllItems} loggedInUser={loggedInUser} />
                </Modal>
            </>
        )
    }

    return (
        <div>
            <h2>Items</h2>
            <Button
                className="createItem"
                onClick={toggle}>
                Create Item
            </Button>
            <div className="itemContainer">
                {items.map((item) => (
                    <ItemCard
                        item={item}
                        loggedInUser={loggedInUser}
                        getAllItems={getAllItems}
                        key={`item-${item.id}`}
                    ></ItemCard>
                ))}
            </div>
            <Modal isOpen={createModal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add Item</ModalHeader>
                <CreateItemModal toggle={toggle} getAllItems={getAllItems} loggedInUser={loggedInUser} />
            </Modal>
        </div>
    );
}