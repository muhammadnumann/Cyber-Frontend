import React, { useContext } from "react";
import { store } from "../../context/MainContext";

function EditIcon() {
  const { darkMode } = useContext(store);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
    >
      <g clipPath="url(#clip0_1572_2341)">
        <path
          d="M9.16699 3.33334H3.33366C2.89163 3.33334 2.46771 3.50894 2.15515 3.8215C1.84259 4.13406 1.66699 4.55798 1.66699 5.00001V16.6667C1.66699 17.1087 1.84259 17.5326 2.15515 17.8452C2.46771 18.1577 2.89163 18.3333 3.33366 18.3333H15.0003C15.4424 18.3333 15.8663 18.1577 16.1788 17.8452C16.4914 17.5326 16.667 17.1087 16.667 16.6667V10.8333"
          stroke={darkMode ? "#F5F5F5" : "#1C1C1E"}
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.417 2.08332C15.7485 1.7518 16.1982 1.56555 16.667 1.56555C17.1358 1.56555 17.5855 1.7518 17.917 2.08332C18.2485 2.41484 18.4348 2.86448 18.4348 3.33332C18.4348 3.80216 18.2485 4.2518 17.917 4.58332L10.0003 12.5L6.66699 13.3333L7.50033 9.99999L15.417 2.08332Z"
          stroke={darkMode ? "#F5F5F5" : "#1C1C1E"}
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1572_2341">
          <rect width={20} height={20} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default EditIcon;
