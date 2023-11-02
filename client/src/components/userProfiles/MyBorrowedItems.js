import { useEffect, useState } from "react";
import { getUserProfileById } from "../../managers/userProfileManager";
import { getBorrowedItems, getItems } from "../../managers/itemManager";
import ItemCard from "../items/ItemCard";
import "./Profile.css"



export const MyBorrowedItems = ({ loggedInUser }) => {
    const [userProfile, setUserProfile] = useState();
    const [items, setItems] = useState([]);

    const getAllItems = () => {
        getItems().then(setItems)
    }

    const getBorrowed = () => {
        getBorrowedItems(loggedInUser.id).then(setItems)
    }

    useEffect(() => {
        getUserProfileById(parseInt(loggedInUser.id)).then(setUserProfile);
        getBorrowed()
        getItems()
    }, [loggedInUser]);


    if (items.length === 0) {
        return <h3 className="profileItems">Ask to borrow some items!</h3>
    }

    return (
        <>
            <h4 className="borrowedTitle">Items I Have Borrowed</h4>
            <div className="itemContainer">
                {items.map((item) => (
                    <ItemCard
                        item={item}
                        loggedInUser={loggedInUser}
                        getAllItems={getAllItems}
                        key={`item-${item.id}`}
                    ></ItemCard >
                ))}
            </div>
        </>
    )
}