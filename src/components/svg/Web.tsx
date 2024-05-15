import React from "react";

type Props = {
    className?: string;
    height?: string;
    width?: string;
};

function Web({ className, height, width }: Props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width ?? "24"}
            height={height ?? "24"}
            className={className}
            viewBox="-1 0 19 19"
        >
            <path d="M16.417 9.57a7.917 7.917 0 11-8.144-7.908 1.758 1.758 0 01.451 0 7.913 7.913 0 017.693 7.907zM5.85 15.838q.254.107.515.193a11.772 11.772 0 01-1.572-5.92h-3.08a6.816 6.816 0 004.137 5.727zM2.226 6.922a6.727 6.727 0 00-.511 2.082h3.078a11.83 11.83 0 011.55-5.89q-.249.083-.493.186a6.834 6.834 0 00-3.624 3.622zm8.87 2.082a14.405 14.405 0 00-.261-2.31 9.847 9.847 0 00-.713-2.26c-.447-.952-1.009-1.573-1.497-1.667a8.468 8.468 0 00-.253 0c-.488.094-1.05.715-1.497 1.668a9.847 9.847 0 00-.712 2.26 14.404 14.404 0 00-.261 2.309zm-.974 5.676a9.844 9.844 0 00.713-2.26 14.413 14.413 0 00.26-2.309H5.903a14.412 14.412 0 00.261 2.31 9.844 9.844 0 00.712 2.259c.487 1.036 1.109 1.68 1.624 1.68s1.137-.644 1.623-1.68zm4.652-2.462a6.737 6.737 0 00.513-2.107h-3.082a11.77 11.77 0 01-1.572 5.922q.261-.086.517-.194a6.834 6.834 0 003.624-3.621zM11.15 3.3a6.82 6.82 0 00-.496-.187 11.828 11.828 0 011.55 5.89h3.081A6.815 6.815 0 0011.15 3.3z"></path>
        </svg>
    );
}

export default Web;
