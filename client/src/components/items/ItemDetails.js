import { useEffect, useState } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";


export default function ItemDetails({ detailsItemId }) {
    const [item, setItem] = useState(null);

    const getItemById = (id) => {
        getItemById(id).then(setItem);
    };

    useEffect(() => {
        if (detailsItemId) {
            getItemById(detailsItemId)
        }

    }, [detailsItemId])

    if (!item) {
        return (
            <>
                <h2>Item Details</h2>
                <p>Please choose an item...</p>
            </>
        );
    }

    return (
        <>
            <h2>Item Details</h2>
            <Card color="dark" inverse>
                <CardBody>
                    <CardTitle tag="h4">{item.manufacturer} {item.name}</CardTitle>
                </CardBody>
            </Card>
        </>
    )

}