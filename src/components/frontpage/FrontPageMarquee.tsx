import Marquee from "../shared/Marquee";

export default function FrontPageMarquee() {
    return (
        <>
            <div className="lg:my-16 my-8">
                <Marquee gradient={false} rotate={1} className="mb-2 bg-black border-y py-1 [&_span]:mr-2">
                    {
                        Array.from({ length: 25 }).map((_, i) => (
                            <span className="text-xl font-mono" key={i}>HIRE ME - </span>
                        ))
                    }
                </Marquee >
                <Marquee gradient={false} rotate={1} direction="right" className="mb-2 bg-black border-y py-1 [&_span]:mr-2">
                    {
                        Array.from({ length: 25 }).map((_, i) => (
                            <span className="text-xl font-mono" key={i}>HIRE ME - </span>
                        ))
                    }
                </Marquee>
            </div >
        </>
    )
}