import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { coffeeStoreData } from "../../Data/coffee-store";

export function getStaticProps(staticProps) {
  const params = staticProps.params;
  return {
    props: {
      coffeeStore: coffeeStoreData?.find((element) => {
        return element.id.toString() === params?.id; //dynamic id
      }),
    },
  };
}
export function getStaticPaths() {
  const paths = coffeeStoreData.map((element) => {
    return {
      params: {
        id: element.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
}

const CoffeeStore = (props) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const { name, address, neighbourhood } = props?.coffeeStore;
  return (
    <div>
      <Head>
        <title>{name}</title>
      </Head>
      <Link href="/">Back To Home Page.</Link>

      <ul>
        <li>{name}</li>
        <li>{address}</li>
        <li>{neighbourhood}</li>
      </ul>
    </div>
  );
};

export default CoffeeStore;
