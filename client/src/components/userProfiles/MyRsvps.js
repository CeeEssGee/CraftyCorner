import { useEffect, useState } from "react"
import { getEventsByUserId } from "../../managers/eventManager";
import EventCard from "../events/EventCard";
import { CreateEventModal } from "../events/CreateEventModal";
import { Button, Modal, ModalHeader } from "reactstrap";
import { getRsvpsByUserId } from "../../managers/rsvpManager";
import { useNavigate } from "react-router-dom";
import RsvpCard from "../events/RsvpCard";



export const MyRsvps = ({ loggedInUser }) => {
    const [rsvps, setRsvps] = useState([]);

    const getAllRsvps = () => {
        getRsvpsByUserId(loggedInUser.id).then(setRsvps);
    };

    const navigate = useNavigate();

    useEffect(() => {
        getAllRsvps();
    }, []);

    if (rsvps.length === 0) {
        return <div className="otherContainer">
            <h3>RSVP to an Event!</h3>
            <h4>Click on the Community tab</h4>
        </div>
    }

    return (
        <div className="otherContainer">
            <h2 className="eventsTitle">My RSVPs</h2>

            <div className="sub-menu eventContainer">
                {rsvps.map((rsvp) => (
                    <RsvpCard
                        rsvp={rsvp}
                        loggedInUser={loggedInUser}
                        getAllRsvps={getAllRsvps}
                        key={`/rsvp-${rsvp.id}`}
                    ></RsvpCard>
                ))}
            </div>
        </div>
    );
}