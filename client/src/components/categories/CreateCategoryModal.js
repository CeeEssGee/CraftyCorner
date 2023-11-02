import { useState } from "react";
import { Button, Form, FormFeedback, FormGroup, Input, Label, ModalBody } from "reactstrap";
import { createCategory } from "../../managers/categoryManager";

export const CreateCategoryModal = ({ toggle, getAllCategories }) => {
    const [categoryName, setCategoryName] = useState("");
    const [error, setError] = useState(false);

    const handleCreate = () => {
        const newCategory = {
            name: categoryName
        }

        if (!categoryName) {
            setError(true);
        }
        else {
            createCategory(newCategory)
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
                        <Label htmlFor="categoryName">Name:</Label>
                        <Input
                            type="text"
                            name="categoryName"
                            invalid={error}
                            onChange={(e) => {
                                setCategoryName(e.target.value);
                            }}
                        />
                        {
                            error
                                ?
                                <FormFeedback>
                                    Category Name cannot be blank
                                </FormFeedback>
                                :
                                ""
                        }
                    </FormGroup>
                    <Button
                        className="blueButton"
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