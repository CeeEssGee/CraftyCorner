import { useEffect, useState } from "react";
import { getUserProfileById } from "../../managers/userProfileManager";
import { getItems } from "../../managers/itemManager";
import ItemCard from "../items/ItemCard";
import { filteredItemComments, getAllItemComments, getItemComments } from "../../managers/itemCommentManager";
import { Spinner } from "reactstrap";


export const MyBorrowedItems = ({ loggedInUser }) => {
    const [userProfile, setUserProfile] = useState();
    const [items, setItems] = useState([]);
    const [itemComments, setItemComments] = useState([]);

    const getAllItems = () => {
        getItems().then(setItems)
    }

    const getItemComments = () => {
        filteredItemComments(loggedInUser.id).then(setItemComments)
    }

    useEffect(() => {
        getUserProfileById(parseInt(loggedInUser.id)).then(setUserProfile);
        getItemComments()
        getItems()
    }, [loggedInUser]);


    if (itemComments.length === 0) {
        return <Spinner />
    }

    return (
        <>
            <h4>Items I Have Borrowed</h4>
            <div className="itemContainer">
                {itemComments.map((ic) => (
                    <ItemCard
                        item={ic?.item}
                        loggedInUser={loggedInUser}
                        getAllItems={getAllItems}
                        key={`item-${ic?.item.id}`}
                    ></ItemCard >
                ))}
            </div>
        </>
    )
}