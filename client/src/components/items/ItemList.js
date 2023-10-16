import { useEffect, useState } from "react";
import { getItems } from "../../managers/itemManager";
import { Table } from "reactstrap";
import ItemCard from "./ItemCard";

export const ItemList = ({ loggedInUser, setDetailsItemId }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        getItems().then(setItems);
    }, []);

    return (
        <div className="container">
            <div className="sub-menu bg-light">
                <h2>Items</h2>
                {items.map((item) => (
                    <ItemCard
                        item={item}
                        setDetailsItemId={setDetailsItemId}
                        key={`item-${item.id}`}
                    ></ItemCard>
                ))}
            </div>
        </div>
    );
}