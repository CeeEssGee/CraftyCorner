import { useState } from "react";
import ItemList from "./ItemList";
import ItemDetails from "./ItemDetails";


export default function Items({ loggedInUser }) {
    const [detailsItemId, setDetailsItemId] = useState(null);

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-6">
                    <ItemList setDetailsItemId={setDetailsItemId} loggedInUser={loggedInUser} />
                </div>
                <div className="col-sm-6">
                    <ItemDetails detailsItemId={detailsItemId} />
                </div>
            </div>
        </div>
    );
}