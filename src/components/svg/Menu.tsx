import React from "react";

type Props = {
    className?: string;
    height?: string;
    width?: string;
};

function Menu({ className, height, width }: Props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMinYMin"
            viewBox="-5 -7 24 24"
            className={className}
            height={height ?? "1.5rem"}
            width={width ?? "1.5rem"}
        >
            <path d="M1 0h5a1 1 0 110 2H1a1 1 0 110-2zm7 8h5a1 1 0 010 2H8a1 1 0 110-2zM1 4h12a1 1 0 010 2H1a1 1 0 110-2z"></path>
        </svg>
    );
}

export default Menu;
