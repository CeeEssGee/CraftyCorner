import { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, CardSubtitle, CardTitle } from "reactstrap";
import { getItemById } from "../../managers/itemManager";


export default function ItemDetails({ detailsItemId }) {
    const [item, setItem] = useState(null);

    const getItemDetails = (id) => {
        getItemById(id).then(setItem);
    };

    useEffect(() => {
        if (detailsItemId) {
            getItemDetails(detailsItemId)
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
                    <p>Owner: {item.userProfile.fullName}</p>
                    <p>{item.category.name}</p>
                    <img src={item.pictureUrl} alt={item.name} />
                    <p>{item.notes}</p>
                </CardBody>

                <CardFooter>
                    Comments:
                    {item.itemComments.map((c) => (
                        <div key={`comment--${c.id}`}>

                            {/* How do I get the userProfile's name? */}

                            {/* {c.userProfile.map((up) => (
                                <div key={`up--${up.id}`}>
                                    {up.fullName}
                                </div>
                            ))} */}

                            {/* <p>{c.userProfile.fullName}</p>  */}
                            <p>{c.date}</p>
                            <p>{c.body}</p>
                        </div>
                    ))}
                </CardFooter>
            </Card>
        </>
    )

}