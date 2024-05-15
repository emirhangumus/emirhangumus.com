import Container from "@/components/shared/Container";
import { getSession } from "@/lib/functions/getSession";
import { useRouter } from "next/router";
import type { GetServerSidePropsContext } from "next/types";
import { logout } from "@/lib/functions/logout";
import Link from "next/link";
import SessionProvider from "@/components/SessionProvider";


export default function Dashboard() {

	const router = useRouter();

	const items = [
		{
			id: "anilar",
			title: "Anılar",
		},
		{
			id: "blog",
			title: "Blog",
		},
		{
			id: "contacts",
			title: "İletişim",
		}
	];

	return (
		<>
			<SessionProvider>
				<Container>
					<div className="flex gap-8">
						<div>
							<button onClick={async () => await logout(router)} className="text-cinder-100 bg-red-500 rounded-full w-full px-4 py-1">Çıkış</button>
						</div>
						<div className="w-full grid lg:grid-cols-6 grid-cols-1 flex-1 gap-4">
							{items.map((item) => (
								<Link href={`/dashboard/${item.id}`} key={item.id} className="bg-cinder-900 text-white rounded aspect-square flex items-center justify-center text-lg hover:bg-cinder-800">
									{item.title}
								</Link>
							))}
						</div>
					</div>
				</Container>
			</SessionProvider>
		</>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await getSession(context);

	if (!session.success) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	return {
		props: {
			session,
		},
	};
}