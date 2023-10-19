import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";
import { deleteItem } from "../../managers/itemManager";
import { useNavigate } from "react-router-dom";


export default function ItemCard({ item, setDetailsItemId, loggedInUser, getAllItems }) {
    const navigate = useNavigate();

    return (
        <Card color="dark" outline style={{ marginBottom: "4px" }}>
            <CardBody>
                {/* <CardTitle tag="h5">{item.Name}</CardTitle> */}
                <CardSubtitle className="mb-2 text-muted" tag="h4">
                    {item.manufacturer} {item.name}
                </CardSubtitle>
                <CardText>Owner: {item.userProfile.fullName}</CardText>
                <div><img src={item.pictureUrl} alt={item.name} />
                </div>
                <Button
                    color="info"
                    onClick={() => {
                        setDetailsItemId(item.id);
                        window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: "smooth",
                        });
                    }}
                >
                    Show Details
                </Button>
                {loggedInUser.id === item.userProfile.id || loggedInUser.roles.includes("Admin") ? (
                    <Button
                        color="danger"
                        onClick={() => {
                            deleteItem(item.id).then(() => {
                                getAllItems()
                            })
                        }}
                    >Delete</Button>
                ) : (
                    ""
                )}
            </CardBody>
        </Card>
    );
}