import React from "react";

type Props = {
    className?: string;
    height?: string;
    width?: string;
};

function FlutterSVG({ className, height, width }: Props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width || "24"}
            height={height || "24"}
            viewBox="0 0 32 32"
            className={className}
        >
            <path
                fill="#40d0fd"
                d="M15.383 18.316l3.361-3.274h8.349l-7.396 7.396-4.314-4.122"
            ></path>
            <path
                style={{ isolation: "isolate" }}
                fill="#41d0fd"
                d="M4.907 16.125l4.199 4.299L27.093 2.287h-8.349L4.907 16.125z"
            ></path>
            <path
                fill="#1fbcfd"
                d="M11.176 22.479l4.259 4.196 4.262-4.237-4.314-4.122-4.207 4.163z"
            ></path>
            <path
                fill="#095a9d"
                d="M15.435 26.675l4.262-4.237 7.292 7.375h-8.396l-3.158-3.138z"
            ></path>
            <path
                fill="#0e5199"
                d="M15.435 26.675l3.971-1.321-1.338-1.297-2.633 2.618z"
            ></path>
        </svg>
    );
}

export default FlutterSVG;
