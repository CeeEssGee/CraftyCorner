import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { editProfile, getProfileAndRoles } from "../../managers/userProfileManager";
import { Form, Button, FormGroup, Input, Label, Spinner } from "reactstrap";
import "./Profile.css"


export const EditProfile = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [roles, setRoles] = useState("");
    const [userName, setUserName] = useState("");
    const [identityUser, setIdentityUser] = useState("");
    const [identityUserId, setIdentityUserId] = useState("");
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        address: "",
        email: ""
    });

    const { id } = useParams();
    const navigate = useNavigate();

    const render = () => {
        getProfileAndRoles(parseInt(id)).then(setUser)
    }

    useEffect(() => {
        render()
    }, [])

    const handleSave = (evt) => {
        evt.preventDefault()

        const userToSendToAPI = {
            id: user.id,
            firstName: firstName ? firstName : user.firstName,
            lastName: lastName ? lastName : user.lastName,
            address: address ? address : user.address,
            email: email ? email : user.email,
            roles: roles ? roles : user.roles,
            userName: userName ? userName : user.userName,
            identityUser: identityUser ? identityUser : user.identityUser,
            identityUserId: identityUserId ? identityUserId : user.identityUserId
        }
        editProfile(user.id, userToSendToAPI).then(() => navigate(`/profile`))
    }

    const cancel = (evt) => {
        evt.preventDefault()
        navigate("/profile")
    }

    if (!user) {
        return <Spinner />
    }

    return (
        <>
            <Form className="editForm">
                <FormGroup>
                    <Label>First Name: </Label>
                    <Input type="text" value={user.firstName} className="user.firstName" style={{ width: 350 }}
                        onChange={(e) => {
                            const copy = { ...user }
                            copy.firstName = e.target.value
                            setUser(copy)
                        }} />
                </FormGroup>

                <FormGroup>
                    <Label>Last Name: </Label>
                    <Input type="text" value={user.lastName} className="user.lastName" style={{ width: 350 }}
                        onChange={(e) => {
                            const copy = { ...user }
                            copy.lastName = e.target.value
                            setUser(copy)
                        }} />
                </FormGroup>

                <FormGroup>
                    <Label>Address: </Label>
                    <Input type="text" value={user.address} className="user.address" style={{ width: 350 }}
                        onChange={(e) => {
                            const copy = { ...user }
                            copy.address = e.target.value
                            setUser(copy)
                        }} />
                </FormGroup>

                {/* <FormGroup>
                    <Label>Email Address: (Unable to change) </Label>
                    <Input type="text" disabled="disabled" value={user.email} className="user.email" style={{ width: 350 }}
                    onChange={(e) => {
                        const copy = { ...user }
                        copy.email = e.target.value
                        setUser(copy)
                    }} 
                    />
                </FormGroup> */}
                <Button id="saveProfile" onClick={(e) => handleSave(e)}>Save Changes</Button>

                <Button id="cancelProfile" onClick={(e) => cancel(e)}>Cancel</Button>
            </Form>
        </>
    )
}