import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, CardFooter, CardSubtitle, CardText } from "reactstrap";
import ConfirmDeleteEventModal from "./ConfirmDeleteEventModal";


export default function EventCard({ event, loggedInUser, getAllEvents }) {
    const navigate = useNavigate();

    return (
        <Card className="eventCard" color="dark" outline style={{ marginBottom: "4px" }}>
            <CardBody>
                <CardSubtitle className="mb=2 text-muted" tag="h4">
                    {event.name}
                </CardSubtitle>
                <CardText>Host: {event.userProfile.fullName}
                    <p>Date: {event.dateTime.split("T")[0]}</p>
                </CardText>
                <div><img src={event.pictureUrl} alt={event.name} />
                </div>
            </CardBody>
            <CardFooter className="cardFooter">
                <Button className="blueButton"
                    onClick={() => {
                        navigate(`/community/${event.id}`)
                    }}
                >Show Details</Button>

                {loggedInUser.id === event.userProfile.id || loggedInUser.roles.includes("Admin") ? (
                    <ConfirmDeleteEventModal event={event} getAllEvents={getAllEvents} />
                ) : (
                    ""
                )}
            </CardFooter>

        </Card>
    )
}