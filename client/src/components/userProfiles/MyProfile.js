import { useEffect, useState } from "react";
import { getUserProfileById } from "../../managers/userProfileManager";
import { getItems } from "../../managers/itemManager";
import { getItemComments } from "../../managers/itemCommentManager";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "./Profile.css"



export const MyProfile = ({ loggedInUser }) => {
    const [userProfile, setUserProfile] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        getUserProfileById(parseInt(loggedInUser.id)).then(setUserProfile);
        getItemComments()
        getItems()
    }, [loggedInUser]);



    return (
        <>
            <div className="profile">
                <h2>My Profile</h2>
                <h4>Name:   {userProfile?.fullName}</h4>
                <h4>Address: {userProfile?.address}</h4>
                <h4>Email Address: {userProfile?.email}</h4>
            </div>
            <div className="myProfileButtons">
                <Button className="myItems"
                    onClick={() => {
                        navigate(`/profile/myItems`)
                    }}
                >My Items</Button>

                <Button className="myBorrowed"
                    onClick={() => {
                        navigate(`/profile/borrowed`)
                    }}
                >My Borrowed Items</Button>
            </div>
            <div className="craftersGonnaCraft"><img src="/images/CraftersGonnaCraft.jpg" alt="crafts" /></div>
        </>
    )
}