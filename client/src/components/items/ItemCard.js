import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";


export default function ItemCard({ item, setDetailsItemId }) {
    return (
        <Card color="dark" outline style={{ marginBottom: "4px" }}>
            <CardBody>
                {/* <CardTitle tag="h5">{item.Name}</CardTitle> */}
                <CardSubtitle className="mb-2 text-muted" tag="h4">
                    {item.manufacturer} {item.name}
                </CardSubtitle>
                <CardText>Owner: {item.userProfile.fullName}</CardText>
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
                    }}
                >
                    Show Details
                </Button>
            </CardBody>
        </Card>
    );
}