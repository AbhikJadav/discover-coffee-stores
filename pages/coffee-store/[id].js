import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { coffeeStoreData } from "../../Data/coffee-store";
import styles from "../../styles/coffee-store.module.css";
import ArrowLeftOutlined from "@ant-design/icons/lib/icons/ArrowLeftOutlined";
import StarFilled from "@ant-design/icons/lib/icons/StarFilled";
import NearMe from "../../public/static/icons/nearMe.svg";
import Location from "../../public/static/icons/location.svg";
import { fetchAllCoffeeStore } from "../../lib/coffeeStoreLibrary";

export async function getStaticProps(staticProps) {
  const params = staticProps.params;
  // const data = fetchDetailCoffeeStore(params?.id);
  const coffeeStores = await fetchAllCoffeeStore();
  return {
    props: {
      coffeeStore: coffeeStoreData?.find((element) => {
        return element.fsq_id.toString() === params?.id; //dynamic id
      }),
    },
  };
}
export async function getStaticPaths() {
  const coffeeStores = await fetchAllCoffeeStore();
  console.log("coffeestore:", coffeeStores);
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
  console.log("router:", router);
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  console.log("props:", props);
  const { name, address, neighbourhood, imgUrl } = props?.coffeeStore;

  const handleUpvoteButton = () => {
    console.log("up vote");
  };
  return (
    <div className={styles.containerWrapper}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.backContainer}>
        <div className={styles.arrowContainer}>
          <Link href="/">
            <ArrowLeftOutlined /> Back To Home Page.
          </Link>
        </div>
        <div className={styles.nameWrapper}>
          <h1>{name}</h1>
        </div>
      </div>
      <div className={styles.informContainer}>
        <div className={styles.imageContainer}>
          <Image
            src={
              imgUrl ||
              "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            }
            width={500}
            height={400}
            alt={name}
          />
        </div>
        <div className={styles.detailWrapper}>
          <div className={styles.listWrapper}>
            <Image src={Location} width={30} height={30} alt={"location"} />{" "}
            {address}
          </div>
          <div className={styles.listWrapper}>
            <StarFilled />
            10
          </div>
          <div className={styles.listWrapper}>
            <Image src={NearMe} width={30} height={30} alt={"nearMe"} />
            {neighbourhood}
          </div>
          <div className={styles.listWrapper}>
            <button
              className={styles.upvoteButton}
              onClick={handleUpvoteButton}
            >
              Up Vote !
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
