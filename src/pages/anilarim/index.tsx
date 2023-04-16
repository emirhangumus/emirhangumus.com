import AniCard from "@/components/ani/AniCard";
import Container from "@/components/shared/Container";
import Divider from "@/components/shared/Divider";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import Text from "@/components/shared/Text";
import { anilarAtom } from "@/lib/atoms/anilarAtom";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export default function Anilarim() {

  const [anilar, setAnilar] = useAtom(anilarAtom);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const f = async () => {
      const res = await fetch("/api/anilar");
      const data = await res.json();
      if (data.success) {
        setAnilar(data.data);
      }
      setLoading(false);
    }
    f();
  }, []);

  return (
    <>
      <Container>
        <div className="flex flex-col gap-2">
          <Text level="h1">Anılarım</Text>
          <Text level="p">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit doloremque culpa impedit repellendus vitae non illum nulla modi reiciendis, accusantium quisquam dolorem veniam natus sed! Quaerat earum harum deleniti odit aut, itaque veniam. Totam pariatur quo assumenda voluptas ad necessitatibus!</Text>
        </div>
        <Divider />
        {loading && anilar.length === 0 && (
          <LoadingSpinner />
        )}
        {!loading && anilar.length === 0 && (
          <div className="text-center">
            <div className="text-2xl font-bold">Henüz hiç anım yok.</div>
            <div className="text-xl">Biraz ekleyince gözükür burada.</div>
          </div>
        )}
        {!loading && anilar.length > 0 && (
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