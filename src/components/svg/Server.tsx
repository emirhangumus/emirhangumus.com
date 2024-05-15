import React from "react";

type Props = {
    className?: string;
    height?: string;
    width?: string;
};

function Server({ className, height, width }: Props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width ?? "16"}
            height={height ?? "16"}
            fill="none"
            viewBox="0 0 16 16"
            className={className}
        >
            <g>
                <path d="M3 3.25a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5A.75.75 0 013 3.25z"></path>
                <path
                    fillRule="evenodd"
                    d="M2.25 0A2.25 2.25 0 000 2.25v2.5A2.25 2.25 0 002.25 7h11.5A2.25 2.25 0 0016 4.75v-2.5A2.25 2.25 0 0013.75 0H2.25zM1.5 2.25a.75.75 0 01.75-.75h11.5a.75.75 0 01.75.75v2.5a.75.75 0 01-.75.75H2.25a.75.75 0 01-.75-.75v-2.5z"
                    clipRule="evenodd"
                ></path>
                <path d="M3.75 11.5a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5z"></path>
                <path
                    fillRule="evenodd"
                    d="M2.25 9A2.25 2.25 0 000 11.25v2.5A2.25 2.25 0 002.25 16h11.5A2.25 2.25 0 0016 13.75v-2.5A2.25 2.25 0 0013.75 9H2.25zm-.75 2.25a.75.75 0 01.75-.75h11.5a.75.75 0 01.75.75v2.5a.75.75 0 01-.75.75H2.25a.75.75 0 01-.75-.75v-2.5z"
                    clipRule="evenodd"
                ></path>
            </g>
        </svg>
    );
}

export default Server;
