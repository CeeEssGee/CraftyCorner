import { useEffect, useState } from "react";
import { getItems } from "../../managers/itemManager";
import ItemCard from "./ItemCard";

export default function ItemList({ setDetailsItemId }) {
    const [items, setItems] = useState([]);

    const getAllItems = () => {
        getItems().then(setItems);
    };

    useEffect(() => {
        getAllItems();
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