import AniCard from "@/components/ani/AniCard";
import Container from "@/components/shared/Container";
import Divider from "@/components/shared/Divider";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import Text from "@/components/shared/Text";
import { anilarAtom } from "@/lib/atoms/anilarAtom";
import { useAtom } from "jotai";
import type { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Anilarim({ $anilar }: { $anilar: any[] }) {

  useEffect(() => {
    if (set) return;
    setAnilar($anilar);
    setSet(true);
  }, []);

  const [set, setSet] = useState(false);
  const [anilar, setAnilar] = useAtom(anilarAtom);

  return (
    <>
      <Head>
        <title>Anılarım | Emirhan Gümüş</title>
      </Head>
      <Container>
        <div className="flex flex-col gap-2">
          <Text level="h1">Anılarım</Text>
          <Text level="p">Kendi küçük galerim gibi bir yer burası. Kaydedilmeye değer bulduğum anları ölümsüzleştirmek için burada paylaşıyorum. Benim zaten bir anı kutum var. Burası da onun dijital hali 😁</Text>
        </div>
        <Divider />
        {!set && <LoadingSpinner />}
        {set && anilar.length === 0 && (
          <div className="text-center">
            <div className="text-2xl font-bold">Henüz hiç anım yok.</div>
            <div className="text-xl">Biraz ekleyince gözükür burada.</div>
          </div>
        )}
        {set && anilar.length > 0 && (
          <div className="grid grid-cols-1 gap-8 max-w-md mx-auto pb-8">
            {anilar.map((ani) => (
              <AniCard key={ani.id} ani={ani} />
            ))}
          </div>
        )}
      </Container>
    </>
  );
}


export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const anilar = await fetch(`${process.env.BASE_URL}/api/anilar`)
    .then(res => res.json())

  if (!anilar || !anilar.data || !anilar.success) {
    return {
      props: {
        $anilar: []
      }
    }
  }

  return {
    props: {
      $anilar: anilar.data
    }
  }
}