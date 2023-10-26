import { useEffect, useState } from "react";
import { getItemsByUserId } from "../../managers/itemManager";
import ItemCard from "../items/ItemCard";
import { Spinner } from "reactstrap";

export default function MyItems({ loggedInUser }) {
    const [items, setItems] = useState([]);

    const getAllItems = () => {
        getItemsByUserId(loggedInUser.id).then(setItems)
    }

    useEffect(() => {
        getAllItems()
    }, []);

    if (items.length === 0) {
        return <Spinner />
    }

    return (
        <div>
            <h2>Items</h2>
            <div className="sub-menu bg-light itemContainer">

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