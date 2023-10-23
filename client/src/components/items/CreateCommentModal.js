import { useEffect, useState, useSyncExternalStore } from "react"
import { createItemComment, getItemComments } from "../../managers/itemCommentManager";
import { getItemById } from "../../managers/itemManager";
import { Button, Form, FormGroup, Input, Label, ModalBody } from "reactstrap";
import { useNavigate } from "react-router-dom";


export const CreateCommentModal = ({ loggedInUser, itemId, toggle, getComments }) => {
    const [commentBorrowRequest, setCommentBorrowRequest] = useState(false);
    const [commentBody, setCommentBody] = useState("");
    const [error, setError] = useState(false);

    const handleCreate = () => {
        const newComment = {
            body: commentBody,
            borrowRequest: commentBorrowRequest,
            userProfileId: loggedInUser.id,
            itemId: parseInt(itemId)
        }
        if (!commentBody) {
            setError(true);
        }
        else {
            createItemComment(newComment)
                .then(() => {
                    toggle()
                    getComments(itemId)
                })
        }

    }

    return (
        <>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label htmlFor="borrowRequest">Borrow Request?
                        </Label>
                        <Input
                            type="checkbox"
                            name="borrowRequest"
                            onChange={(e) => {
                                setCommentBorrowRequest(e.target.checked);
                            }}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="body">Body:</Label>
                        <Input
                            type="textarea"
                            name="text"
                            onChange={(e) => {
                                setCommentBody(e.target.value);
                            }}
                        />
                    </FormGroup>

                    <Button
                        color="success"
                        onClick={() => {
                            handleCreate();
                        }}>
                        Save
                    </Button>
                </Form>
            </ModalBody>
        </>
    )
}