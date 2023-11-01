import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEventById, getEvents } from "../../managers/eventManager";
import { getRsvpsByEventId } from "../../managers/rsvpManager";
import { Button, Card, CardBody, CardFooter, CardTitle, Modal, ModalHeader, Spinner } from "reactstrap";
import "./Event.css"
import ConfirmDeleteEventModal from "./ConfirmDeleteEventModal";
import { AddRSVPModal } from "./AddRSVPModal";


export default function EventDetails({ loggedInUser }) {
    const [event, setEvent] = useState(null);
    const [rsvps, setRsvps] = useState([]);
    const [events, setEvents] = useState([]);

    const [rsvpModal, setRsvpModal] = useState(false);

    const { eventId } = useParams();
    const navigate = useNavigate();

    const toggle = () => {
        setRsvpModal(!rsvpModal)
    };

    const getEventDetails = (eventId) => {
        getEventById(eventId).then(setEvent);
    }

    const getAllEvents = () => {
        getEvents().then(setEvents);
    }

    const getAllRsvps = (eventId) => {
        getRsvpsByEventId(eventId).then(setRsvps);
    }

    useEffect(() => {
        getEventDetails(eventId)
        getAllRsvps(eventId)
    }, [])

    if (!event) {
        return <Spinner />
    }

    return (
        <>
            <div className="eventDetailContainer">
                <div>
                    <h2 className="detailTitle">Event Details</h2>
                    <Card className="detailEventCard" color="dark" outline style={{ marginBottom: "4px" }}>
                        <CardBody>
                            <CardTitle tag="h4">{event?.name}</CardTitle>
                            <h5>Host: {event.userProfile?.fullName}</h5>
                            <img src={event?.pictureUrl} alt={event?.name} />
                            <h5>Date: {event?.dateTime?.split("T")[0]}</h5>
                            <h5>Time: {event?.dateTime?.split("T")[1]}</h5>
                            <h5>Duration: {event.duration}</h5>
                            <h5>Cost: ${event.cost}</h5>
                            <h5>Location: {event.address}</h5>
                            <h5>Available Seats: {event?.seatsAvailable} of {event.totalSeats}</h5>
                            <h6>Event Details: {event?.body}</h6>
                        </CardBody>

                        <CardFooter
                            className="cardFooterDetails">
                            {loggedInUser?.id === event?.userProfile?.id || loggedInUser.roles.includes("Admin") ? (
                                <Button
                                    className="yellowButton"
                                    onClick={() => {
                                        navigate(`/community/${event?.id}/edit`)
                                    }}
                                >Edit</Button>
                            ) : (
                                ""
                            )}

                            {loggedInUser?.id === event?.userProfile?.id || loggedInUser.roles.includes("Admin") ? (
                                <ConfirmDeleteEventModal event={event} getAllEvents={getAllEvents} />
                            ) : (
                                ""
                            )}

                        </CardFooter>
                    </Card>
                </div>

                {event.seatsAvailable === 0 ? (
                    <div className="rsvpContainer">
                        <h4 style={{ color: "darkred" }}>Event Full</h4>

                        <h3>RSVPs:</h3>

                        {rsvps.map((r) => {
                            return <div className="rsvpDiv" key={`rsvp--${r.id}`}>
                                <h5>Name: {r.userProfile.fullName}</h5>
                                <p>Note: {r.rsvpNote}</p>
                            </div>
                        })}
                    </div>
                ) : (

                    <div className="rsvpContainer">
                        <Button className="greenButton" onClick={() => {
                            toggle()
                        }}>Add RSVP</Button>

                        <h3>RSVPs:</h3>

                        {rsvps.map((r) => {
                            return <div className="rsvpDiv" key={`rsvp--${r.id}`}>
                                <h5>Name: {r.userProfile.fullName}</h5>
                                <p>Note: {r.rsvpNote}</p>
                            </div>
                        })}
                    </div>
                )}

                <Modal isOpen={rsvpModal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Add RSVP</ModalHeader>
                    <AddRSVPModal toggle={toggle} loggedInUser={loggedInUser} eventId={eventId} getAllRsvps={getAllRsvps} getEventDetails={getEventDetails} />
                </Modal>
            </div>
        </>
    )
}