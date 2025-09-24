import { Rating } from "@mui/material";
import { useState } from "react";

export default function RatingComponent() {
    const [value, setValue] = useState<number>(0);
    const handleOnChange = (event: React.SyntheticEvent, value: number | null) => {
        event.preventDefault();
        setValue(value ?? 0);
    }
    return <Rating value={value}
        precision={0.5}
        onChange={(event, value) => handleOnChange(event, value)}
    />
}