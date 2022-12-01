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
          <Image src={imgUrl} width={500} height={400} alt={name} />
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
