import { useState } from "react";
import { Button, Form, FormFeedback, FormGroup, Input, InputGroup, Label, ModalBody } from "reactstrap"
import { updateCategory } from "../../managers/categoryManager";

export const EditCategoryModal = ({ categoryObject, toggle, getAllCategories }) => {
    const [category, setCategory] = useState(categoryObject.name);
    const [error, setError] = useState(false);

    const handleEdit = () => {
        const newCategory = {
            id: categoryObject.id,
            name: category
        };

        if (!category) {
            setError(true);
        }
        else {
            updateCategory(categoryObject.id, newCategory)
                .then(() => {
                    getAllCategories();
                    toggle();
                })
        }
    }


    return (
        <>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label htmlFor="categoryEdit">Name:</Label>
                        <InputGroup>
                            <Input
                                type="text"
                                name="categoryEdit"
                                defaultValue={categoryObject.name}
                                invalid={error}
                                onChange={(e) => {
                                    setCategory(e.target.value);
                                }}
                            />
                            {
                                error
                                    ?
                                    <FormFeedback>
                                        Name can't be blank
                                    </FormFeedback>
                                    :
                                    ""
                            }
                        </InputGroup>
                    </FormGroup>
                    <Button
                        color="success"
                        onClick={() => {
                            handleEdit();
                        }}>
                        Save
                    </Button>
                    <Button
                        style={{ marginLeft: '10px' }}
                        color="danger"
                        onClick={toggle}>
                        Cancel
                    </Button>
                </Form>
            </ModalBody>
        </>
    )
}