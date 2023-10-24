import { useEffect, useState } from "react";
import { getItemByUserId } from "../../managers/itemManager";
import ItemCard from "../items/ItemCard";

export default function MyItems({ loggedInUser }) {
    const [items, setItems] = useState([]);

    const getAllItems = () => {
        getItemByUserId(loggedInUser.id).then(setItems)
    }

    useEffect(() => {
        getAllItems()
    }, []);


    return (
        <div className="container">
            <div className="sub-menu bg-light">
                <h2>Items</h2>

                {items.map((item) => (
                    <ItemCard
                        item={item}
                        loggedInUser={loggedInUser}
                        getAllItems={getAllItems}
                        key={`item-${item.id}`}
                    ></ItemCard>
                ))}
            </div>

        </div>
    );
}