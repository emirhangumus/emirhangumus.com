import React from "react";

type Props = {
    className?: string;
    height?: string;
    width?: string;
};

function FigmaSVG({ className, height, width }: Props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width ?? "24"}
            height={height ?? "24"}
            className={className}
            fill="none"
            viewBox="0 0 15 15"
        >
            <path
                stroke="#000"
                d="M7.5 1v8.5m0 0v2a2 2 0 11-2-2m2 0h-2m0 0a2 2 0 110-4m0 0h2m-2 0h4m-4 0a2 2 0 110-4h4a2 2 0 110 4m0 0a2 2 0 110 4 2 2 0 010-4z"
            ></path>
        </svg>
    );
}

export default FigmaSVG;
