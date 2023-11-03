import { useState } from "react";
import ItemList from "./ItemList";
import { ItemSearch } from "./ItemSearch";


export default function Items({ loggedInUser }) {
    const [searchTerms, setSearchTerms] = useState("");

    return <>
        <ItemSearch setterFunction={setSearchTerms} />
        <ItemList loggedInUser={loggedInUser} searchTermState={searchTerms} />
    </>
}