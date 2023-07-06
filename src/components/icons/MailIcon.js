import React, { useContext } from "react";
import { store } from "../../context/MainContext";

function MailIcon({ isActive }) {
  const { darkMode } = useContext(store);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
        stroke={`${isActive ? "#2196F3" : darkMode ? "#F5F5F5" : "#1C1C1E"}`}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 6L12 13L2 6"
        stroke={`${isActive ? "#2196F3" : darkMode ? "#F5F5F5" : "#1C1C1E"}`}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default MailIcon;
