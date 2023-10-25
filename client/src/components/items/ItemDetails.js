import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, CardSubtitle, CardTitle, Modal, ModalHeader } from "reactstrap";
import { deactivateItem, deleteItem, getItemById, getItems, reactivateItem } from "../../managers/itemManager";
import { useNavigate, useParams } from "react-router-dom";
import { getItemComments } from "../../managers/itemCommentManager";
import { CreateCommentModal } from "./CreateCommentModal";
import "./Item.css"
import ConfirmDeleteItemModal from "./ConfirmDeleteItemModal";



export default function ItemDetails({ loggedInUser }) {
    const [item, setItem] = useState(null);
    const [selectedItem, setSelectedItem] = useState();
    const [itemComments, setItemComments] = useState([]);
    const [items, setItems] = useState([]);

    const [commentModal, setCommentModal] = useState(false);


    const { itemId } = useParams();
    const navigate = useNavigate();

    const toggle = () => {
        setCommentModal(!commentModal)
    };

    const getItemDetails = (itemId) => {
        getItemById(itemId).then(setItem);
    };

    const getAllItems = () => {
        getItems().then(setItems)
    }

    const getComments = (itemId) => {
        getItemComments(itemId).then(setItemComments);
    }

    useEffect(() => {
        getItemDetails(itemId)
        getComments(itemId)
    }, [])

    return (
        <>
            <h2>Item Details</h2>
            <Card color="dark" outline style={{ marginBottom: "4px" }}>
                <CardBody>
                    <CardTitle tag="h4">{item?.manufacturer} {item?.name}</CardTitle>
                    <p>Owner: {item?.userProfile?.fullName}</p>
                    <p>{item?.category?.name}</p>
                    <img src={item?.pictureUrl} alt={item?.name} />
                    <p>{item?.notes}</p>
                </CardBody>

                <CardFooter className="cardFooterDetails">
                    {loggedInUser.id === item?.userProfile.id || loggedInUser.roles.includes("Admin") ? (
                        <Button
                            className="editButton"
                            onClick={() => {
                                navigate("edit")
                            }}
                        >Edit</Button>
                    ) : (
                        ""
                    )}


                    {loggedInUser.id === item?.userProfile.id && item.isActive === true ? (
                        <Button
                            className="deactivateButton"
                            onClick={() => {
                                deactivateItem(item.id).then(() => {
                                    navigate(`/profile/myitems`)
                                })
                            }}
                        >Deactivate</Button>
                    ) : (
                        ""
                    )}

                    {loggedInUser.id === item?.userProfile.id && item.isActive === false ? (
                        <Button
                            color="reactivateButton"
                            onClick={() => {
                                reactivateItem(item.id).then(() => {
                                    navigate(`/profile/myitems`)
                                })
                            }}
                        >Reactivate</Button>
                    ) : (
                        ""
                    )}

                    {loggedInUser.id === item?.userProfile.id || loggedInUser.roles.includes("Admin") ? (
                        // <Button
                        //     color="danger"
                        //     onClick={() => {
                        //         deleteItem(item.id).then(() => {
                        //             navigate(`/items`)
                        //         })
                        //     }}
                        // >Delete</Button>
                        <ConfirmDeleteItemModal item={item} getAllItems={getAllItems} />
                    ) : (
                        ""
                    )}
                </CardFooter>
            </Card>
            <div className="comment-container">

                <Button onClick={() => {
                    toggle()
                }}>Add Comment</Button>


                <h3>Comments: </h3>

                {itemComments.map((ic) => (
                    <div className="comments" key={`comment--${ic.id}`}>
                        <h5>{ic.date.split("T")[0]} {ic.userProfile.fullName} </h5>
                        <h6>Borrow Request: {ic.borrowRequest.toString()}</h6>
                        <p>{ic.body}</p>
                    </div>
                ))}
            </div>
            <Modal isOpen={commentModal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add Comment</ModalHeader>
                <CreateCommentModal toggle={toggle} loggedInUser={loggedInUser} itemId={itemId} getComments={getComments} />
            </Modal>

        </>
    )

}