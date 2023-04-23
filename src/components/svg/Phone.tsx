import React from "react";

type Props = {
    className?: string;
    height?: string;
    width?: string;
};

function Phone({ className, height, width }: Props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width ?? "36"}
            height={height ?? "36"}
            viewBox="0 0 36 36"
            className={className}
        >
            <path
                d="M25 4H11a2 2 0 00-2 2v24a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zm-6 26h-2v-2h2zm-8-4V6h14v20z"
                className="clr-i-solid clr-i-solid-path-1"
            ></path>
            <path fill="none" d="M0 0h36v36H0z"></path>
        </svg>
    );
}

export default Phone;
