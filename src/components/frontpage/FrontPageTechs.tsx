import Container from "../shared/Container";
import DecoratedBox from "../shared/DecoratedBox";
import Divider from "../shared/Divider";
import Web from "../svg/Web";
import HTMLSVG from "../svg/brands/HTMLSVG";
import CSSSVG from "../svg/brands/CSSSVG";
import ReactSVG from "../svg/brands/ReactSVG";
import NEXTJSSVG from "../svg/brands/NEXTJSSVG";
import TailwindSVG from "../svg/brands/TailwindSVG";
import SASSSVG from "../svg/brands/SASSSVG";
import TypeScriptSVG from "../svg/brands/TypeScriptSVG";
import NodeJSSVG from "../svg/brands/NodeJSSVG";
import ExpressJSSVG from "../svg/brands/ExpressJSSVG";
import MySQLSVG from "../svg/brands/MySQLSVG";
import FlutterSVG from "../svg/brands/FlutterSVG";
import GITSVG from "../svg/brands/GITSVG";
import GitHubSVG from "../svg/brands/GitHubSVG";
import PrismaSVG from "../svg/brands/PrismaSVG";
import KnexSVG from "../svg/brands/KnexSVG";
import FigmaSVG from "../svg/brands/FigmaSVG";
import FadeIn from "../animations/FadeIn";
import SvelteSVG from "../svg/brands/Svelte";

const items = [
    {
        title: "Frontend",
        items: [
            {
                icon: <HTMLSVG className="fill-cinder-200" height="24" width="24" />,
                title: "HTML",
                link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
            },
            {
                icon: <CSSSVG className="[&_*]:fill-cinder-200" />,
                title: "CSS",
                link: "https://developer.mozilla.org/en-US/docs/Web/CSS",
            },
            {
                icon: <ReactSVG className="[&_*]:fill-cinder-200" />,
                title: "React",
                link: "https://react.dev/",
            },
            {
                icon: <NEXTJSSVG className="[&_*]:fill-cinder-200" />,
                title: "Next.js",
                link: "https://nextjs.org/",
            },
            {
                icon: <SvelteSVG className="[&_*]:fill-cinder-200" />,
                title: "Svelte",
                link: "https://svelte.dev/",
            },
            {
                icon: <SvelteSVG className="[&_*]:fill-cinder-200" />,
                title: "Svelte Kit",
                link: "https://kit.svelte.dev/",
            },
            {
                icon: <TailwindSVG className="[&_*]:fill-cinder-200" />,
                title: "Tailwind CSS",
                link: "https://tailwindcss.com/",
            },
            {
                icon: <SASSSVG className="[&_*]:fill-cinder-200" />,
                title: "Sass/Scss",
                link: "https://sass-lang.com/",
            },
            {
                icon: <TypeScriptSVG className="[&_*]:fill-cinder-200" />,
                title: "TypeScript",
                link: "https://www.typescriptlang.org/",
            },
        ],
    },
    {
        title: "Backend",
        items: [
            {
                icon: <NodeJSSVG className="[&_*]:fill-cinder-200" />,
                title: "Node.js",
                link: "https://nodejs.org/en/",
            },
            {
                icon: <ExpressJSSVG className="[&_*]:fill-cinder-200" />,
                title: "Express.js",
                link: "https://expressjs.com/",
            },
            {
                icon: <PrismaSVG className="[&_*]:fill-cinder-200" />,
                title: "Prisma",
                link: "https://www.prisma.io/",
            },
            {
                icon: <KnexSVG className="[&_*]:fill-cinder-200" />,
                title: "KnexJS",
                link: "https://knexjs.org/",
            },
            {
                icon: <MySQLSVG className="[&_*]:fill-cinder-200" />,
                title: "MySQL",
                link: "https://www.mysql.com/",
            },
        ],
    },
    {
        title: "Mobile",
        items: [
            {
                icon: <ReactSVG className="[&_*]:fill-cinder-200" />,
                title: "React Native",
                link: "https://reactnative.dev/",
            },
            {
                icon: <FlutterSVG className="[&_*]:fill-cinder-200" />,
                title: "Flutter",
                link: "https://flutter.dev/",
            },
        ],
    },
    {
        title: "Diğer",
        items: [
            {
                icon: <GITSVG className="[&_*]:fill-cinder-200" />,
                title: "Git",
                link: "https://git-scm.com/",
            },
            {
                icon: <GitHubSVG className="[&_*]:fill-cinder-200" />,
                title: "GitHub",
                link: "https://github.com/",
            },
            {
                icon: <FigmaSVG className="[&_*]:stroke-cinder-200" />,
                title: "Figma",
                link: "https://www.figma.com/",
            }
        ],
    },
];

export default function FrontPageTechs() {
    return (
        <>
            <Container className="flex flex-col my-8">
                <FadeIn>
                    <h1 className="font-bold lg:text-3xl text-xl">Kullandığım <span className="font-normal">Teknolojiler</span></h1>
                </FadeIn>
                <div className="grid lg:gap-8 gap-4">
                    {items.map((item, i) => (
                        <FadeIn key={i}>
                            <div className="flex flex-col gap-4 py-4">
                                <h2 className="font-bold lg:text-xl text-base font-mono">{item.title}</h2>
                                <Divider className="my-0" />
                                <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
                                    {item.items.map((tech, i) => (
                                        <DecoratedBox key={i} className="flex flex-col gap-2 py-4" href={tech.link} target="_blank">
                                            <div className="flex items-center gap-2">
                                                {tech.icon}
                                                <span className="font-bold text-xl">{tech.title}</span>
                                            </div>
                                        </DecoratedBox>
                                    ))}
                                </div>
                            </div>
                        </FadeIn >
                    ))}
                </div>
            </Container>
        </>
    )
}