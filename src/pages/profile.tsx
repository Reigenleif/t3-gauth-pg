import styles from "./index.module.css";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { Profile } from "~/components/Profile";
import { AuthorizedRoleLayout } from "~/components/layout/AuthorizedRoleLayout";
import { withSession } from "~/server/auth/withSession";
import { api } from "~/utils/api";

export const getServerSideProps = withSession({force: true})

export default function ProfilePage() {
    const {data: session, status} = useSession()

    return <AuthorizedRoleLayout session={session}>
        <Profile/>
    </AuthorizedRoleLayout>
}