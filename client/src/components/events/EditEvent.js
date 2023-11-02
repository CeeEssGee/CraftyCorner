import { useEffect, useState } from "react"
import "./Event.css"
import { cloud_name, preset_key } from "../../_env";
import { useNavigate, useParams } from "react-router-dom";
import { getEventById, updateEvent } from "../../managers/eventManager";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";


export const EditEvent = () => {
    const [name, setName] = useState("");
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [duration, setDuration] = useState("");
    const [cost, setCost] = useState();
    const [address, setAddress] = useState("");
    const [body, setBody] = useState("");
    const [pictureUrl, setPictureUrl] = useState("");
    const [totalSeats, setTotalSeats] = useState();
    const [event, setEvent] = useState({
        name: null,
        dateTime: null,
        duration: "",
        cost: null,
        address: "",
        body: "",
        pictureUrl: "",
        totalSeats: null,
    })

    // ***** Cloudinary code
    const UploadWidget = (clickEvent) => {
        clickEvent.preventDefault()
        let widget = window.cloudinary.createUploadWidget({
            cloudName: cloud_name,
            uploadPreset: preset_key
        },
            (error, result) => {
                if (!error && result && result.event === "success") {
                    console.log(result.info.url)

                    setPictureUrl(result.info.url);

                }
            });
        widget.open()
    }
    // ***** End Cloudinary code

    const { eventId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getEventById(eventId).then(setEvent)
    }, []);

    const handleSubmitEventUpdates = (e) => {
        e.preventDefault()
        const eventToSendToAPI = {
            name: name ? name : event.name,
            dateTime: `${date ? date : event.dateTime?.split("T")[0]}T${time ? time : event.dateTime?.split("T")[1]}`,
            duration: duration ? duration : event.duration,
            cost: cost ? cost : event.cost,
            address: address ? address : event.address,
            body: body ? body : event.body,
            pictureUrl: pictureUrl ? pictureUrl : event.pictureUrl,
            totalSeats: totalSeats ? totalSeats : event.totalSeats
        }
        updateEvent(parseInt(eventId), eventToSendToAPI).then(() => navigate(`/community/${parseInt(eventId)}`))
    }

    return (
        <>
            <Form>
                <h2>Edit Item</h2>
                <FormGroup>
                    <Label>Name:</Label>
                    <Input type="text" defaultValue={event.name} className="event.name"
                        onChange={(e) =>
                            setName(e.target.value)} />
                </FormGroup>

                <FormGroup>
                    <Label>Current Event Date:</Label>
                    <Input disabled="disabled" type="date" value={event?.dateTime?.split("T")[0]} />
                </FormGroup>

                <FormGroup>
                    <Label>New Event Date:</Label>
                    <Input type="date" value={event.date} className="event.date"
                        onChange={(e) => setDate(e.target.value)} />
                </FormGroup>

                <FormGroup>
                    <Label>Current Event Time:</Label>
                    <Input disabled="disabled" type="time"
                        value={event?.dateTime?.split("T")[1]}
                    />
                </FormGroup>

                <FormGroup>
                    <Label>New Event Time:</Label>
                    <Input type="time" value={event.time}
                        onChange={(e) => setTime(e.target.value)} />
                </FormGroup>

                <FormGroup>
                    <Label>Duration:</Label>
                    <Input type="text" defaultValue={event.duration} className="event.duration"
                        onChange={(e) => setDuration(e.target.value)} />
                </FormGroup>

                <FormGroup>
                    <Label>Cost:</Label>
                    <Input type="text" defaultValue={event.cost} className="event.cost"
                        onChange={(e) => setCost(e.target.value)} />
                </FormGroup>

                <FormGroup>
                    <Label>Address:</Label>
                    <Input type="text" defaultValue={event.address} className="event.address"
                        onChange={(e) => setAddress(e.target.value)} />
                </FormGroup>

                <FormGroup>
                    <Label>Body:</Label>
                    <Input type="text" defaultValue={event.body} className="event.body"
                        onChange={(e) => setBody(e.target.value)} />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="event.pictureUrl">Picture:</Label>
                    <Button className="yellowButton"
                        onClick={(clickEvent) => {
                            UploadWidget(clickEvent)
                        }}>Upload Picture</Button>
                    <div className="imagePreview">
                        {
                            event.pictureUrl !== ""
                                ? <>
                                    <div><img src={event.pictureUrl}></img></div>
                                </>
                                : <>(Image will preview here)</>
                        }
                    </div>
                </FormGroup>

                <FormGroup>
                    <Label>Total Seats:</Label>
                    <Input type="text" defaultValue={event.totalSeats} className="event.totalSeats"
                        onChange={(e) => setTotalSeats(e.target.value)} />
                </FormGroup>

                <Button className="greenButton"
                    onClick={(e) => {
                        handleSubmitEventUpdates(e)
                    }}>Save Changes</Button>
            </Form>
        </>
    )
}