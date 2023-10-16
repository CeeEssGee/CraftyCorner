import { Button, Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";


export default function ItemCard({ item, setDetailsItemId, loggedInUser }) {
    return (
        <Card color="dark" outline style={{ marginBottom: "4px" }}>
            <CardBody>
                {/* <CardTitle tag="h5">{item.Name}</CardTitle> */}
                <CardSubtitle className="mb-2 text-muted" tag="h4">
                    {item.manufacturer} {item.name}
                    <p>Owner: {item.userProfile.fullName}</p>
                </CardSubtitle>
                <div><img src={item.picture.url} alt={item.name} />
                </div>
                <Button
                    color="dark"
                    onClick={() => {
                        setDetailsItemId(item.id);
                        window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: "smooth",
                        });
                    }}>
                    Show Details
                </Button>
            </CardBody>
        </Card>
    );
}