import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getItemById, updateItem } from "../../managers/itemManager";
import { getCategories } from "../../managers/categoryManager";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";


export const EditItem = () => {
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState(0);
    const [manufacturer, setManufacturer] = useState("")
    const [name, setName] = useState("")
    const [isActive, setIsActive] = useState("true")
    const [notes, setNotes] = useState("")
    const [pictureUrl, setPictureUrl] = useState("");
    const [item, setItem] = useState({
        manufacturer: "",
        name: "",
        notes: "",
        pictureUrl: "",
        categoryId: "",
        isActive: "true"
    })

    const { itemId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getItemById(itemId).then(setItem)
        getCategories().then(setCategories);
    }, [])

    const handleSubmitItemUpdates = (e) => {
        e.preventDefault()
        const itemToSendToAPI = {
            manufacturer: manufacturer ? manufacturer : item.manufacturer,
            name: name ? name : item.name,
            notes: notes ? notes : item.notes,
            pictureUrl: pictureUrl ? pictureUrl : item.pictureUrl,
            categoryId: categoryId ? categoryId : item.categoryId,
            isActive: item.isActive
        }
        updateItem(parseInt(itemId), itemToSendToAPI).then(() => navigate(`/items/${parseInt(itemId)}`))
    }


    return (
        <>
            <Form>
                <h2>Edit Item</h2>
                <FormGroup>
                    <Label>Manufacturer:</Label>
                    <Input type="text" value={item.manufacturer} className="item.manufacturer"
                        onChange={(e) => {
                            const copy = { ...item }
                            copy.manufacturer = e.target.value
                            setItem(copy)
                        }} />
                </FormGroup>

                <FormGroup>
                    <Label>Name:</Label>
                    <Input type="text" value={item.name} className="item.name"
                        onChange={(e) => {
                            const copy = { ...item }
                            copy.name = e.target.value
                            setItem(copy)
                        }} />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="isActive">Active?
                    </Label>
                    <Input
                        type="checkbox"
                        name="isActive"
                        value={item.isActive}
                        onChange={(e) => {
                            const copy = { ...item }
                            copy.isActive = e.target.checked
                            setItem(copy);
                        }}
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Notes:</Label>
                    <Input type="textarea" value={item.notes} className="item.notes"
                        onChange={(e) => {
                            const copy = { ...item }
                            copy.notes = e.target.value
                            setItem(copy)
                        }} />
                </FormGroup>

                <FormGroup>
                    <Label>Picture URL:</Label>
                    <Input type="text" value={item.pictureUrl} className="item.pictureUrl"
                        onChange={(e) => {
                            const copy = { ...item }
                            copy.pictureUrl = e.target.value
                            setItem(copy)
                        }} />
                </FormGroup>

                <FormGroup>
                    <Label>Category:</Label>
                    <Input type="select" value={item.categoryId} className="item.category"
                        onChange={(e) => {
                            const copy = { ...item }
                            copy.categoryId = e.target.value
                            setItem(copy)

                        }}>
                        {categories.map((c) => {
                            return <option value={c.id}
                                key={`category--{c.id}`}>{c.name}</option>
                        })}
                    </Input>

                </FormGroup>
                <Button
                    onClick={(e) => {
                        handleSubmitItemUpdates(e)
                    }}
                >Save Changes</Button>
            </Form>
        </>

    )
}