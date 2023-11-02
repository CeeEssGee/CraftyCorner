import { useEffect, useState } from "react";
import { getItems } from "../../managers/itemManager";
import ItemCard from "./ItemCard";
import { CreateItemModal } from "./CreateItemModal";
import { Button, Modal, ModalHeader, Spinner } from "reactstrap";
import "./Item.css"


export default function ItemList({ searchTermState, loggedInUser }) {
    const [items, setItems] = useState([]);
    const [filteredItems, setFiltered] = useState([]);

    const [createModal, setCreateModal] = useState(false);

    const getAllItems = () => {
        getItems().then(setItems);
    };

    useEffect(() => {
        getAllItems();
    }, []);

    useEffect(() => {
        const searchedItems = items.filter(item =>
            item.manufacturer.toLowerCase().includes(searchTermState.toLowerCase()) || item.name.toLowerCase().includes(searchTermState.toLowerCase()) || item.userProfile.fullName.toLowerCase().includes(searchTermState.toLowerCase()) || item.category.name.toLowerCase().includes(searchTermState.toLowerCase()))
        setFiltered(searchedItems)

    }, [searchTermState, items])

    const toggle = () => {
        setCreateModal(!createModal)
    };

    if (items.length === 0) {
        return (
            <>
                <p>Create an item!</p>
                <Button
                    className="greenButton"
                    onClick={toggle}>
                    Create Item
                </Button>
            </>
        )
    }

    return (
        <div className="otherContainer">
            <h2 className="itemsTitle">Items</h2>
            <Button
                className="greenButton"
                onClick={toggle}>
                Create Item
            </Button>
            <div className="sub-menu itemContainer">
                {filteredItems.map((item) => (
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