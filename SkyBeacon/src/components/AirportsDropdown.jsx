import React, { useState, useEffect, useRef } from 'react';
import './AirportsDropdown.css';

const AirportsDropdown = ({ fetchItems, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(
    <span
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      Airports
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 48 48"
      >
        <rect width="48" height="48" fill="none" />
        <g fill="none" stroke="#d6b896" stroke-linecap="round" stroke-width="4">
          <path stroke-linejoin="round" d="M40 28L24 40L8 28" />
          <path d="M8 10h32M8 18h32" />
        </g>
      </svg>
    </span>,
  );

  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchItems();
      setItems(['All Airports', ...data]);
    };
    fetchData();
  }, [fetchItems]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
    if (onSelect) {
      onSelect(item === 'All Airports' ? null : item);
    }
  };

  return (
    <div
      className="airports-dropdown"
      ref={dropdownRef}
    >
      <button
        className="airports-dropdown-toggle"
        onClick={toggleDropdown}
      >
        {selectedItem}
      </button>
      <ul className={`airports-dropdown-menu ${isOpen ? 'open' : ''}`}>
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
