import dynamic from "next/dynamic";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const Buttons = dynamic(() => import("../components/Buttons"), {
  suspense: true,
});
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>AI-9</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <code className={styles.homeCode}>
          You can use OPENAI to: <br />
          -Just ask what interests you <br />
          -Start your story and AI finishes it <br />
          -Describe your thoughts and AI gives you a corresponding color <br />
          -Tranform your Mood to color <br />
        </code>
        <Buttons />
      </main>

      <footer className={styles.footer}>
        <a href="#">Powered by Ere</a>
      </footer>
    </div>
  );
}
