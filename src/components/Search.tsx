import { useState } from "react";
import { useBookContext } from "../hooks/useBooksContext";



export default function Search() {
    const { books } = useBookContext();
    const [searchString, setSearchString] = useState<string>("");


    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        console.log("Value: ", value)
        setSearchString(value);
    }

    return <input placeholder="Search for book..." onChange={handleOnChange} />
}