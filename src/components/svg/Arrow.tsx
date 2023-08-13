type Props = {
    className?: string;
    height?: string;
    width?: string;
};

function Arrow(props: Props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            enableBackground="new 0 0 200.981 200.981"
            viewBox="0 0 200.981 200.981"
            width={props.width ?? "20"}
            height={props.height ?? "20"}
            className={`fill-cinder-100 ${props.className}`}
        >
            <path
                d="M17.511 10.264h111.557V0H.007v129.068h10.25l.014-111.553L193.72 200.981l7.254-7.254z"
            ></path>
        </svg>
    );
}

export default Arrow;
