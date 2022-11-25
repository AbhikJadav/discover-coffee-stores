import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Banner from "../components/Banner";

export default function Home() {
  const handleOnBannerBtnClick = () => {
    console.log("hii banner button click");
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Conoisseur</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/*<h1 className={styles.title}>Coffee Connoissuer</h1>*/}
        <Banner
          buttonText={"View stores nearby"}
          handleOnClick={handleOnBannerBtnClick}
        />
        <div className={styles.heroImage}>
          <Image src="/static/hero-image.png" width={700} height={400} />
        </div>
      </main>

      {/*<footer className={styles.footer}></footer>*/}
    </div>
  );
}
