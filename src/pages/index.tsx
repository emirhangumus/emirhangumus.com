import FrontPageBanner from "@/components/FrontPageBanner";
import { userAtom } from "@/lib/atoms/userAtom";
import { useAtom } from "jotai";

export default function Home() {

  const [user, setUser] = useAtom(userAtom);

  return (
    <>
      <FrontPageBanner />
    </>
  )
}
