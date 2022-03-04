import {useState, useRef} from "react";

function SearchTerm(props) {
    const [searchTerm, setSearchTerm] = useState('')
    const typingTimeoutRef = useRef(null)
    const handleSearchChange = e => {
        const currentValue = e.target.value;
        if(typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current)
        }
        setSearchTerm(currentValue)
        typingTimeoutRef.current = setTimeout(() => {
            const valueSearch = {
                searchTerm: currentValue
            }
            props.onSearch(valueSearch)
        },500)
    }
  return (
    <div>
      <input
        value={searchTerm}
        ref={typingTimeoutRef}
        onChange={handleSearchChange}
        placeholder="Search"
        type="search"
        className="form form-control"
      />
    </div>
  );
}

export default SearchTerm;
