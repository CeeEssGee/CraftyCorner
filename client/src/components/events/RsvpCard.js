import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, CardFooter, CardSubtitle, CardText } from "reactstrap";
import ConfirmDeleteEventModal from "./ConfirmDeleteEventModal";


export default function RsvpCard({ rsvp, loggedInUser, getAllRsvps }) {
    const navigate = useNavigate();

    return (
        <Card className="rsvpCard" color="dark" outline style={{ marginBottom: "4px" }}>
            <CardBody>
                <CardSubtitle className="mb=2 text-muted" tag="h4">
                    {rsvp.event.name}
                </CardSubtitle>
                <CardText>Host: {rsvp.event.userProfile.fullName}
                    <p>Date: {rsvp.event.dateTime.split("T")[0]}</p>
                </CardText>
                <div><img src={rsvp.event.pictureUrl} alt={rsvp.event.name} />
                </div>
            </CardBody>
            <CardFooter className="cardFooter">
                <Button className="detailsButton"
                    onClick={() => {
                        navigate(`/community/${rsvp.event.id}`)
                    }}
                >Show Details</Button>


            </CardFooter>
        </Card>
    )
}