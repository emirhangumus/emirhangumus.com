import FrontPageBanner from "@/components/FrontPageBanner";
import { userAtom } from "@/lib/atoms/userAtom";
import { useAtom } from "jotai";
import Head from "next/head";

export default function Home() {

  const [user, setUser] = useAtom(userAtom);

  return (
    <>
      <Head>
        <title>Anasayfa</title>
      </Head>
      <FrontPageBanner />
    </>
  )
}
