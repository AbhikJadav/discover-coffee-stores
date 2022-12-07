import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import cls from "classnames";

import styles from "../../styles/coffee-store.module.css";
import { fetchAllCoffeeStore } from "../../lib/coffeeStoreLibrary";
import { useSelector } from "react-redux";
import { isEmpty } from "../../utils";

export async function getStaticProps(staticProps) {
  const params = staticProps.params;
  const coffeeStores = await fetchAllCoffeeStore();
  const findCoffeeStoreById = coffeeStores?.find((element) => {
    return element.fsq_id.toString() === params?.id; //dynamic id
  });
  return {
    props: {
      coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
    },
  };
}
export async function getStaticPaths() {
  const coffeeStores = await fetchAllCoffeeStore();
  console.log("coffeestore:", coffeeStores);
  const paths = coffeeStores?.map((element) => {
    return {
      params: {
        id: element?.fsq_id?.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
}
const CoffeeStore = (initialprops) => {
  const router = useRouter();
  const id = router.query.id;
  const { coffeeStore } = useSelector((state) => state.reducer);
  const [coffeeStoreData, setCoffeeStoreData] = useState(
    initialprops.coffeeStore
  );
  console.log("router:", router);
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const handleCreateCoffeeStore = async (coffeeStoreFromContext) => {
    try {
      const { fsq_id, name, address, neighbourhood, imgUrl } =
        coffeeStoreFromContext;
      const response = await fetch(`/api/createCoffeeStore`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Neighbourhood: neighbourhood || "",
          Id: fsq_id,
          Name: name,
          Voting: 0,
          Address: address || "",
          ImageUrl: imgUrl,
        }),
      });
      const dbCoffeeStore = await response.json();
      console.log("dbCoffeeStore:", dbCoffeeStore);
    } catch (error) {
      console.log("Error creating a coffee store", error);
    }
  };

  useEffect(() => {
    if (isEmpty(initialprops.coffeeStore)) {
      if (coffeeStore.length > 0) {
        const coffeeStoreFromContext = coffeeStore?.find((element) => {
          return element.fsq_id.toString() === id; //dynamic id
        });
        setCoffeeStoreData(coffeeStoreFromContext);
        handleCreateCoffeeStore(coffeeStoreFromContext);
      }
    }
  }, [id]);
  const { name, address, neighbourhood, imgUrl } = coffeeStoreData;
  console.log(" props?.coffeeStore:", initialprops?.coffeeStore);
  console.log("location:", address);
  const handleUpvoteButton = () => {
    console.log("up vote");
  };
  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
        <meta name="description" content={`${name} coffee store`} />
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">← Back to home</Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={
              imgUrl ||
              "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            }
            width={500}
            height={360}
            className={styles.storeImg}
            alt={name}
          />
        </div>

        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/places.svg"
              width="24"
              height="24"
              alt="places icon"
            />
            <p className={styles.text}>{address}</p>
          </div>
          {neighbourhood && (
            <div className={styles.iconWrapper}>
              <Image
                src="/static/icons/nearMe.svg"
                width="24"
                height="24"
                alt="near me icon"
              />
              <p className={styles.text}>{neighbourhood}</p>
            </div>
          )}

          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/star.svg"
              width="24"
              height="24"
              alt="star icon"
            />
            <p className={styles.text}>10</p>
          </div>

          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
