import { useState } from "react"
import Search from "../presentational/Search"

export default function SearchContainer({ onSearch }) {
    const [input, setInput] = useState("")

    const handleInputChange = (event) => {
        setInput(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        onSearch(input)
    }

    return (
        <Search
            input={input}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
        />
    )
}