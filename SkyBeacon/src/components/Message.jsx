import React from "react";
import "./Message.css";

function Message({ text, onClose }) {
  if (!text) return null;

  return (
    <div className="message">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        onClick={onClose}
        style={{ alignSelf: "flex-end", cursor: "pointer", padding: ".5rem 1rem 0rem 0rem" }}
      >
        <rect width="24" height="24" fill="none" />
        <path
          fill="none"
          stroke="var(--slate-grey)"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="3"
          d="M18 6L6 18M6 6l12 12"
        />
      </svg>
      <p style={{padding: "0rem 1.2rem 1.5rem 1.2rem"}}>{text}</p>
    </div>
  );
}

export default Message;
