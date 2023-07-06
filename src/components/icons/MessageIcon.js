import React, { useContext } from "react";
import { store } from "../../context/MainContext";

function MessageIcon({ isActive }) {
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
        d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
        stroke={`${isActive ? "#2196F3" : darkMode ? "#F5F5F5" : "#1C1C1E"}`}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 7H7"
        stroke={`${isActive ? "#2196F3" : darkMode ? "#F5F5F5" : "#1C1C1E"}`}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 10H7"
        stroke={`${isActive ? "#2196F3" : darkMode ? "#F5F5F5" : "#1C1C1E"}`}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 13H7"
        stroke={`${isActive ? "#2196F3" : darkMode ? "#F5F5F5" : "#1C1C1E"}`}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default MessageIcon;
