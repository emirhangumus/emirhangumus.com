import React from "react";

type Props = {
    className?: string;
    height?: string;
    width?: string;
    strokeWidth?: number;
};

function Close({ className, height, width, strokeWidth }: Props) {
    return (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} height={height ?? "24px"} width={width ?? "24px"}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth ?? 1} d="M6 18L18 6M6 6l12 12" />
        </svg>
    );
}

export default Close;
