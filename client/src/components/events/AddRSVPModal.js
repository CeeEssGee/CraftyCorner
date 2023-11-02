import { useState } from "react"
import { createRsvp } from "../../managers/rsvpManager";
import { Button, Form, FormFeedback, FormGroup, Input, Label, ModalBody } from "reactstrap";


export const AddRSVPModal = ({ loggedInUser, eventId, toggle, getAllRsvps, getEventDetails }) => {
    const [note, setNote] = useState("");
    const [error, setError] = useState(false);

    const handleCreate = () => {
        const newRsvp = {
            rsvpNote: note,
            eventId: parseInt(eventId),
            userProfileId: parseInt(loggedInUser.id)

        }
        if (!note) {
            setError(true);
        }
        else {
            createRsvp(newRsvp)
                .then(() => {
                    toggle()
                    getAllRsvps(eventId)
                    getEventDetails(eventId)
                })
        }
    }

    return (
        <>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Note: </Label>
                        <Input
                            type="textarea"
                            invalid={error}
                            onChange={(e) => {
                                setNote(e.target.value);
                            }}
                        />
                        {
                            error
                                ?
                                <FormFeedback>
                                    RSVP note cannot be blank.
                                </FormFeedback>
                                :
                                ""
                        }
                    </FormGroup>
                    <Button className="greenButton"
                        onClick={() => { handleCreate() }}>Save</Button>

                </Form>
            </ModalBody>
        </>

    )

}