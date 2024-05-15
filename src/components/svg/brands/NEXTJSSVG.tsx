import React from "react";

type Props = {
    className?: string;
    height?: string;
    width?: string;
};

function NEXTJSSVG({ className, height, width }: Props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width ?? "24"}
            height={height ?? "24"}
            fill="none"
            viewBox="0 0 15 15"
            className={className}
        >
            <path
                fill="#000"
                fillRule="evenodd"
                d="M0 7.5a7.5 7.5 0 1111.697 6.216L4.907 4.21A.5.5 0 004 4.5V12h1V6.06l5.83 8.162A7.5 7.5 0 010 7.5zM10 10V4h1v6h-1z"
                clipRule="evenodd"
            ></path>
        </svg>
    );
}

export default NEXTJSSVG;
