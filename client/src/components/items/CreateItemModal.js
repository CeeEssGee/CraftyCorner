import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label, ModalBody } from "reactstrap";
import { getCategories } from "../../managers/categoryManager";
import { createItem } from "../../managers/itemManager";
import { cloud_name, preset_key } from "../../_env";


export const CreateItemModal = ({ toggle, getAllItems, loggedInUser }) => {
    const [itemManufacturer, setItemManufacturer] = useState("");
    const [itemName, setItemName] = useState("");
    const [itemNotes, setItemNotes] = useState("");
    const [itemIsActive, setItemIsActive] = useState(true);
    const [itemCategory, setItemCategory] = useState([]);
    const [error, setError] = useState(false);
    const [categories, setCategories] = useState([]);
    const [itemPictureUrl, setItemPictureUrl] = useState("");

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

                    setItemPictureUrl(result.info.url);

                }
            });
        widget.open()
    }
    // ***** End Cloudinary code

    useEffect(() => {
        getCategories().then(setCategories)
    }, [])

    const handleCreate = () => {
        const newItem = {
            manufacturer: itemManufacturer,
            name: itemName,
            notes: itemNotes,
            isActive: itemIsActive,
            categoryId: itemCategory,
            pictureUrl: itemPictureUrl,
            userProfileId: loggedInUser.id
        }

        if (!itemManufacturer || !itemName || !itemCategory) {
            setError(true);
        }
        else {
            createItem(newItem)
                .then(() => {
                    getAllItems();
                    toggle();
                })
        }
    }


    return (
        <>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label htmlFor="itemManufacturer">Manufacturer:</Label>
                        <Input
                            type="text"
                            name="itemManufacturer"
                            onChange={(e) => {
                                setItemManufacturer(e.target.value);
                            }}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="itemName">Name:</Label>
                        <Input
                            type="text"
                            name="itemName"
                            onChange={(e) => {
                                setItemName(e.target.value);
                            }}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="itemNotes">Notes:</Label>
                        <Input
                            type="textarea"
                            name="text"
                            onChange={(e) => {
                                setItemNotes(e.target.value);
                            }}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="itemCategory">Category:</Label>
                        <Input
                            type="select"
                            name="select"
                            onChange={(e) => {
                                setItemCategory(parseInt(e.target.value));
                            }}
                        >
                            <option value="default" hidden>Select a category</option>
                            {categories.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="itemPictureId">Picture:</Label>
                        <Button
                            onClick={(clickEvent) => {
                                UploadWidget(clickEvent)
                            }}
                        >Upload Picture</Button>
                        <div className="imagePreview">
                            {
                                itemPictureUrl !== ""
                                    ? <>
                                        <div><img src={itemPictureUrl} ></img></div>

                                    </>
                                    : <>(Image will preview here)</>
                            }
                        </div>
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