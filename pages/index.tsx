import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "styles/Home.module.scss";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>IG Information</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <span>IG Information!</span>
        </h1>

        <h2>The place to handle your personal data exported by Instagram</h2>

        <p className={styles.description}>
          Get started by choosing one of our available options!
        </p>

        <div className={styles.grid}>
          <Link href="/follow-back">
            <div className={styles.card}>
              <h2>Who does not follow you back? &rarr;</h2>
              <p>
                Find exactly who person doesn&apos;t follow you by providing the
                files <code className={styles.code}>followers.json</code> and{" "}
                <code className={styles.code}>following.json</code>{" "}
              </p>
            </div>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
