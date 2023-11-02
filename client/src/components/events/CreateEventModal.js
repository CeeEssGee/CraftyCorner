import { useEffect, useState } from "react"
import { cloud_name, preset_key } from "../../_env";
import { createEvent } from "../../managers/eventManager";
import { Button, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody } from "reactstrap";
import "./Event.css"


export const CreateEventModal = ({ toggle, getAllEvents, loggedInUser }) => {
    const [eventName, setEventName] = useState("");
    const [eventDuration, setEventDuration] = useState("");
    const [eventCost, setEventCost] = useState();
    const [eventAddress, setEventAddress] = useState("");
    const [eventBody, setEventBody] = useState("");
    const [eventPictureUrl, setEventPictureUrl] = useState("");
    const [eventDate, setEventDate] = useState();
    const [eventTime, setEventTime] = useState();
    const [eventTotalSeats, setEventTotalSeats] = useState();
    const [error, setError] = useState(false);

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

                    setEventPictureUrl(result.info.url);

                }
            });
        widget.open()
    }
    // ***** End Cloudinary code

    const handleCreate = () => {
        const newEvent = {
            name: eventName,
            duration: eventDuration,
            cost: eventCost,
            address: eventAddress,
            body: eventBody,
            pictureUrl: eventPictureUrl,
            totalSeats: eventTotalSeats,
            dateTime: `${eventDate}T${eventTime}:00`,
            userProfileId: loggedInUser.id
        }

        if (!eventName || !eventDuration || !eventAddress || !eventBody || !eventTotalSeats || !eventDate || !eventTime) {
            setError(true)
        }
        else {
            createEvent(newEvent)
                .then(() => {
                    getAllEvents();
                    toggle();
                })
        }
    }

    return (
        <>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label htmlFor="eventName">Event Name:
                        </Label>
                        <Input
                            type="text"
                            name="eventName"
                            invalid={error}
                            onChange={(e) => {
                                setEventName(e.target.value);
                            }}
                        />
                        {
                            error
                                ?
                                <FormFeedback>
                                    Event name cannot be blank.
                                </FormFeedback>
                                :
                                ""
                        }
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="eventDateTime">Event Date:
                        </Label>
                        <Input
                            type="Date"
                            invalid={error}
                            name="eventDate"
                            onChange={(e) => {
                                setEventDate(e.target.value);
                            }}
                        />
                        {
                            error
                                ?
                                <FormFeedback>
                                    Event date cannot be blank.
                                </FormFeedback>
                                :
                                ""
                        }
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="eventTime">Event Time:
                        </Label>
                        <Input
                            type="Time"
                            invalid={error}
                            name="eventTime"
                            onChange={(e) => {
                                setEventTime(e.target.value);
                            }}
                        />
                        {
                            error
                                ?
                                <FormFeedback>
                                    Event time cannot be blank.
                                </FormFeedback>
                                :
                                ""
                        }
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="eventDuration">Event Duration:
                        </Label>
                        <Input
                            type="text"
                            invalid={error}
                            name="eventDuration"
                            onChange={(e) => {
                                setEventDuration(e.target.value);
                            }}
                        />
                        {
                            error
                                ?
                                <FormFeedback>
                                    Event duration cannot be blank.
                                </FormFeedback>
                                :
                                ""
                        }
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="eventCost">Event Cost (if any):
                        </Label>
                        <Input
                            type="decimal"
                            name="eventCost"
                            invalid={error}
                            onChange={(e) => {
                                setEventCost(e.target.value);
                            }}
                        />
                        {
                            error
                                ?
                                <FormFeedback>
                                    Event cost cannot be blank.
                                </FormFeedback>
                                :
                                ""
                        }
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="eventAddress">Event Location:
                        </Label>
                        <Input
                            type="text"
                            invalid={error}
                            name="eventAddress"
                            onChange={(e) => {
                                setEventAddress(e.target.value);
                            }}
                        />
                        {
                            error
                                ?
                                <FormFeedback>
                                    Event location cannot be blank.
                                </FormFeedback>
                                :
                                ""
                        }
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="eventBody">Event Details:
                        </Label>
                        <Input
                            type="textarea"
                            name="eventBody"
                            invalid={error}
                            onChange={(e) => {
                                setEventBody(e.target.value);
                            }}
                        />
                        {
                            error
                                ?
                                <FormFeedback>
                                    Event details cannot be blank.
                                </FormFeedback>
                                :
                                ""
                        }
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="eventTotalSeats">Event Seat Availability:
                        </Label>
                        <Input
                            type="text"
                            name="eventTotalSeats"
                            invalid={error}
                            onChange={(e) => {
                                setEventTotalSeats(e.target.value);
                            }}
                        />
                        {
                            error
                                ?
                                <FormFeedback>
                                    Event seat availability cannot be blank.
                                </FormFeedback>
                                :
                                ""
                        }
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="eventPictureUrl">Picture (if any):
                        </Label>
                        <Button className="yellowButton"
                            onClick={(clickEvent) => {
                                UploadWidget(clickEvent)
                            }}
                        >Upload Picture</Button>
                        <div className="imagePreview">
                            {
                                eventPictureUrl !== ""
                                    ? <>
                                        <div><img src={eventPictureUrl} ></img></div>

                                    </>
                                    : <>(Image will preview here)</>
                            }
                        </div>
                    </FormGroup>

                    <Button
                        className="greenButton"
                        onClick={() => {
                            handleCreate();
                        }}>Save</Button>
                </Form>
            </ModalBody>

        </>
    )
}