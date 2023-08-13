import React from "react";

type Props = {
    color?: string;
};

function Danger({ color }: Props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
        >
            <rect
                width="14"
                height="14"
                x="5"
                y="5"
                stroke={color || "#000"}
                strokeWidth="2"
                rx="4"
            ></rect>
            <path
                stroke={color || "#000"}
                strokeLinecap="round"
                strokeWidth="2"
                d="M12 9L12 12"
            ></path>
            <path
                stroke={color || "#000"}
                strokeLinecap="round"
                strokeWidth="2"
                d="M12 15.02v-.01"
            ></path>
        </svg>
    );
}

export default Danger;
