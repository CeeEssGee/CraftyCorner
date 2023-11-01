import { useEffect, useState } from "react"
import { getEventsByUserId } from "../../managers/eventManager";
import EventCard from "../events/EventCard";
import { CreateEventModal } from "../events/CreateEventModal";
import { Button, Modal, ModalHeader } from "reactstrap";



export const MyEvents = ({ loggedInUser }) => {
    const [events, setEvents] = useState([]);

    const [createModal, setCreateModal] = useState(false);

    const getAllEvents = () => {
        getEventsByUserId(loggedInUser.id).then(setEvents);
    };

    useEffect(() => {
        getAllEvents();
    }, []);

    const toggle = () => {
        setCreateModal(!createModal)
    };

    if (events.length === 0) {
        return <div>
            <p>Create an Event!</p>
            <Button
                className="greenButton"
                onClick={toggle}>
                Create Event
            </Button>
        </div>
    }

    return (
        <div className="otherContainer">
            <h2 className="eventsTitle">My Events</h2>
            <Button
                className="greenButton"
                onClick={toggle}>
                Create Event
            </Button>
            <div className="sub-menu eventContainer">
                {events.map((event) => (
                    <EventCard
                        event={event}
                        loggedInUser={loggedInUser}
                        getAllEvents={getAllEvents}
                        key={`/event-${event.id}`}
                    ></EventCard>
                ))}
            </div>
            <Modal isOpen={createModal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add Event</ModalHeader>
                <CreateEventModal toggle={toggle} getAllEvents={getAllEvents} loggedInUser={loggedInUser} />
            </Modal>
        </div>
    );
}