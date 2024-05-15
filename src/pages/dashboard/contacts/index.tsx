import SessionProvider from "@/components/SessionProvider";
import Pagination from "@/components/blog/Pagination";
import ContactCard from "@/components/contact/ContactCard";
import Container from "@/components/shared/Container";
import Text from "@/components/shared/Text";
import TitleWithBackButton from "@/components/shared/TitleWithBackButton";
import { Contact } from "@/interfaces/ContactInterface";
import { getSession } from "@/lib/functions/getSession";
import Cookies from "js-cookie";
import Link from "next/link";
import type { GetServerSidePropsContext } from "next/types";
import { useEffect, useState } from "react";

export default function Contacts() {

	const LIMIT = 10
	const [loading, setLoading] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)
	const [total, setTotal] = useState(1)
	const [contacts, setContacts] = useState<Contact[]>([])

	useEffect(() => {
		const fetchInitalContactForms = async () => {
			setLoading(true);
			let data = await fetch("/api/contact?limit=" + LIMIT + "&page=" + currentPage, {
				method: "GET",
				headers: {
					'Content-Type': 'application/json',
					'token': Cookies.get('token') || '',
				}
			}).then((res) => res.json());

			if (data.success) {
				setContacts(data.data.contacts)
				setTotal(data.data.pagination.total)
				setLoading(false)
			}
		}
		fetchInitalContactForms()
	}, [currentPage])

	return (
		<>
			<SessionProvider>
				<Container>
					<div>
						<div className="flex items-center justify-between">
							<TitleWithBackButton backUrl="/dashboard" text="İletişim Formu" />
							<div className="">
								<Text>
									{total} sonuç bulundu.
								</Text>
							</div>
						</div>
						<div className="mt-4">
							{loading ? (
								<Text>Yükleniyor...</Text>
							) : (
								<>
									{contacts.map((contact) => (
										<>
											<ContactCard contact={contact} />
											<div className="h-4"></div>
										</>
									))}
								</>
							)}
						</div>
						<Pagination
							current={currentPage}
							limit={LIMIT}
							total={total}
							callback={(page) => setCurrentPage(parseInt(page))}
						/>
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