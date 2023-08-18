import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getCsrfToken, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { SignIn } from "~/components/SignIn";

export default function Signin({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    router.push("/");
  }

  return <SignIn csrfToken={csrfToken || ""} />;
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken: csrfToken ?? null },
  };
};
