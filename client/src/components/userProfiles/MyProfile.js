import { useEffect, useState } from "react";
import { getUserProfileById } from "../../managers/userProfileManager";
import { getItems } from "../../managers/itemManager";
import ItemCard from "../items/ItemCard";
import { filteredItemComments, getAllItemComments, getItemComments } from "../../managers/itemCommentManager";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";


export const MyProfile = ({ loggedInUser }) => {
    const [userProfile, setUserProfile] = useState();
    const [items, setItems] = useState([]);
    const [itemComments, setItemComments] = useState([]);

    const navigate = useNavigate();

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



    return (
        <>
            <h3>My Profile</h3>

            <Button
                onClick={() => {
                    navigate(`/profile/borrowed`)
                }}
            >My Borrowed Items</Button>

            <Button
                onClick={() => {
                    navigate(`/profile/myItems`)
                }}
            >My Items</Button>
        </>
    )
}