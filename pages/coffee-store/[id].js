import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

const CoffeeStore = () => {
  const router = useRouter();
  console.log("router:", router.query.id);
  return (
    <div>
      {/*<Head>*/}
      {/*  <title>{router.query.id}</title>*/}
      {/*</Head>*/}
      Coffee store page {router.query.id}
      <Link href="/">Back To Home Page.</Link>
      <Link href="/coffee-store/dynamic">Go to dynamic</Link>
    </div>
  );
};

export default CoffeeStore;
