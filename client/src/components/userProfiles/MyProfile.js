import { useEffect, useState } from "react";
import { getUserProfileById } from "../../managers/userProfileManager";
import { getItems } from "../../managers/itemManager";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "./Profile.css"



export const MyProfile = ({ loggedInUser }) => {
    const [userProfile, setUserProfile] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        getUserProfileById(parseInt(loggedInUser.id)).then(setUserProfile);
        getItems()
    }, [loggedInUser]);



    return (
        <>
            <div className="profileContainer">
                <div>
                    <div className="profile">
                        <h1>My Profile</h1>
                        <h4>Name:   {userProfile?.fullName}</h4>
                        <h4>Address: {userProfile?.address}</h4>
                        <h4>Email Address: {userProfile?.email}</h4>
                    </div>
                </div>
                <div>

                    <div className="myProfileButtons">

                        <Button className="blueButton"
                            onClick={() => {
                                navigate(`/profile/edit/${loggedInUser.id}`)
                            }}
                        >Edit Profile</Button>

                        <Button className="yellowButton"
                            onClick={() => {
                                navigate(`/profile/myItems`)
                            }}
                        >My Items</Button>

                        <Button className="redButton"
                            onClick={() => {
                                navigate(`/profile/borrowed`)
                            }}
                        >My Borrowed Items</Button>

                    </div>
                    <div className="craftersGonnaCraft"><img src="/images/CraftersGonnaCraft.jpg" alt="crafts" /></div>
                    <div className="myCommunityButtons">
                        <Button className="redButton"
                            onClick={() => {
                                navigate(`/profile/myEvents`)
                            }}
                        >My Events</Button>
                        <Button className="blueButton"
                            onClick={() => {
                                navigate(`/profile/myRsvps`)
                            }}
                        >My RSVPs</Button>
                    </div>
                </div>
            </div>
        </>
    )
}