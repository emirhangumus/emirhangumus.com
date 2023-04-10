import Container from "@/components/shared/Container";
import { getSession } from "@/lib/functions/getSession";
import { useRouter } from "next/router";
import type { GetServerSidePropsContext } from "next/types";
import { logout } from "@/lib/functions/logout";


export default function Dashboard() {

    const router = useRouter();

    return (
        <>
            <Container>
                <button onClick={async () => await logout(router)}>Logout</button>
            </Container>
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