import React, { useState, useEffect, useRef } from "react";
import "./AirportsDropdown.css";

const AirportsDropdown = ({ fetchItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState("AIRPORTS");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchItems();
      setItems(data);
    };
    fetchData();
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  return (
    <div className="airports-dropdown" ref={dropdownRef}>
      <button className="airports-dropdown-toggle" onClick={toggleDropdown}>
        {selectedItem}
      </button>
      <ul className={`airports-dropdown-menu ${isOpen ? "open" : ""}`}>
        {items.map((item, index) => (
          <li
            key={index}
            className="airports-dropdown-item"
            onClick={() => handleSelect(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AirportsDropdown;
