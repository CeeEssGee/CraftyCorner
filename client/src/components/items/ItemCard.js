import { Button, Card, CardBody, CardFooter, CardSubtitle, CardText, CardTitle } from "reactstrap";
import { deactivateItem, deleteItem, reactivateItem } from "../../managers/itemManager";
import { useNavigate } from "react-router-dom";
import "./Item.css"
import ConfirmDeleteItemModal from "./ConfirmDeleteItemModal";


export default function ItemCard({ item, loggedInUser, getAllItems }) {
    const navigate = useNavigate();


    return (
        <Card className="itemCard" color="dark" outline style={{ marginBottom: "4px" }}>
            <CardBody>
                {/* <CardTitle tag="h5">{item.Name}</CardTitle> */}
                <CardSubtitle className="mb-2 text-muted" tag="h4">
                    {item.manufacturer} {item.name}
                </CardSubtitle>
                <CardText>Owner: {item?.userProfile?.fullName}</CardText>
                <div><img src={item.pictureUrl} alt={item.name} />
                </div>
            </CardBody>
            <CardFooter className="cardFooter">
                <Button className="blueButton"
                    onClick={() => {
                        navigate(`/items/${item.id}`)
                    }}
                >
                    Show Details
                </Button>

                {loggedInUser.id === item.userProfile.id && item.isActive === true ? (
                    <Button className="yellowButton"
                        onClick={() => {
                            deactivateItem(item.id).then(() => {
                                getAllItems()
                            })
                        }}
                    >Deactivate</Button>
                ) : (
                    ""
                )}

                {loggedInUser.id === item.userProfile.id && item.isActive === false ? (
                    <Button
                        className="darkGreenButton"
                        onClick={() => {
                            reactivateItem(item.id).then(() => {
                                getAllItems()
                            })
                        }}
                    >Reactivate</Button>
                ) : (
                    ""
                )}

                {loggedInUser.id === item.userProfile.id || loggedInUser.roles.includes("Admin") ? (
                    <ConfirmDeleteItemModal item={item} getAllItems={getAllItems} />
                    // <Button
                    //     className="deleteButton"
                    //     onClick={() => {
                    //         deleteItem(item.id).then(() => {
                    //             getAllItems()
                    //         })
                    //     }}
                    // >Delete</Button>
                ) : (
                    ""
                )}
            </CardFooter>

        </Card >
    );
}