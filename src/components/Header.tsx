import Container from "./shared/Container";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Menu from "./svg/Menu";
import FadeIn from "./animations/FadeIn";
import Close from "./svg/Close";

export default function Header() {
  // get current path
  const [path, setPath] = useState<string>("/");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setPath(window.location.pathname);
  }, []);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // do something when the route changes
      setPath(url);
      setMenuOpen(false);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  const items = [
    {
      id: "blog",
      title: "Blog",
      href: "/blog",
    },
    {
      id: "hakkimda",
      title: "Hakkımda",
      href: "/hakkimda",
    },
    {
      id: "anilarim",
      title: "Anılarım",
      href: "/anilarim",
    },
    {
      id: "iletisim",
      title: "İletişim",
      href: "/iletisim",
    },
  ];

  return (
    <>
      {menuOpen && (
        <style jsx global>{`
          html,
          body {
            overflow: hidden;
          }
        `}</style>
      )}
      <header className="border-b border-cinder-900 mb-4 relative z-10">
        <Container>
          <div className="flex justify-between py-4 items-center">
            <Link href="/" className="text-2xl font-bold group">
              <div className="flex gap-4 items-center">
                <div>
                  <div className="flex flex-col">
                    <h1 className="lg:text-2xl text-base font-bold">
                      Emirhan Gümüş
                    </h1>
                    <p className="lg:text-2xl text-sm text-zinc-500 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-pink-700 group-hover:to-blue-700">
                      Full-Stack Developer
                    </p>
                  </div>
                </div>
              </div>
            </Link>
            <div className="lg:block hidden">
              <ul className="flex items-center">
                {items.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      className={`${
                        path === item.href
                          ? "bg-cinder-800 text-white"
                          : "hover:text-cinder-100"
                      } text-cinder-200 px-6 py-0.5 rounded-full block`}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:hidden block">
              <button
                className="flex items-center justify-center"
                aria-label="Menü"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <Menu className="[&_*]:fill-white" height="32px" width="32px" />
              </button>
            </div>
          </div>
        </Container>
      </header>
      {menuOpen && (
        <div
          className={`lg:hidden fixed top-0 left-0 w-full h-full bg-cinder-900 bg-opacity-95 z-20`}
        >
          <FadeIn className="h-full" delay={0}>
            <div className="absolute right-4 top-8">
              <button
                className="flex items-center justify-center"
                aria-label="Menü"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <Close />
              </button>
            </div>
            <div className="h-full grid place-items-center">
              <ul className="flex flex-col gap-4">
                {items.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      className={`text-cinder-200 rounded-full block text-lg`}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      )}
    </>
  );
}
