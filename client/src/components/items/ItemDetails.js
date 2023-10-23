import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, CardSubtitle, CardTitle } from "reactstrap";
import { deleteItem, getItemById, getItems } from "../../managers/itemManager";
import { useNavigate, useParams } from "react-router-dom";
import { getItemComments } from "../../managers/itemCommentManager";


export default function ItemDetails({ loggedInUser }) {
    const [item, setItem] = useState(null);
    const [selectedItem, setSelectedItem] = useState();
    const [itemComments, setItemComments] = useState([]);

    const [editModal, setEditModal] = useState(false);


    const { itemId } = useParams();
    const navigate = useNavigate();

    const editToggle = () => {
        setEditModal(!editModal)
    };

    const getItemDetails = (itemId) => {
        getItemById(itemId).then(setItem);
        getItemComments().then(setItemComments);
    };

    useEffect(() => {
        getItemDetails(itemId)
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

                <CardFooter>
                    {loggedInUser.id === item?.userProfile.id || loggedInUser.roles.includes("Admin") ? (
                        <Button
                            color="warning"
                            onClick={() => {
                                navigate("edit")
                            }}
                        >Edit</Button>
                    ) : (
                        ""
                    )}

                    {loggedInUser.id === item?.userProfile.id || loggedInUser.roles.includes("Admin") ? (
                        <Button
                            color="danger"
                            onClick={() => {
                                deleteItem(item.id).then(() => {
                                    navigate(`/items`)
                                })
                            }}
                        >Delete</Button>
                    ) : (
                        ""
                    )}
                </CardFooter>
            </Card>
            <h3>Comments: </h3>

            {itemComments.map((ic) => (
                <div className="comments" key={`comment--${ic.id}`}>
                    <h5>{ic.date.split("T")[0]} {ic.userProfile.fullName} </h5>
                    <h6>Borrow Request: {ic.borrowRequest.toString()}</h6>
                    <p>{ic.body}</p>
                </div>
            ))}
        </>
    )

}