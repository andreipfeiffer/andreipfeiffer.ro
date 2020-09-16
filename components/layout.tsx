import Head from "next/head";
import styles from "./layout.module.css";
import Link from "next/link";
import useDarkMode from "use-dark-mode";

const name = "Andrei Pfeiffer";
export const siteTitle = "Andrei Pfeiffer, personal website & blog";

type Props = {
  children: React.ReactNode;
};

export default function Layout(props: Props) {
  const { children } = props;

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Andrei Pfeiffer, Ecletic Code Designer, UI developer for Web and Mobile, Organizer of revo.js conference &amp; tim.js meetup"
        />
        {/* <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        /> */}
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <header>
        <Link href="/">
          <a>{name}</a>
        </Link>

        <ul>
          <li>
            <Link href="/talks">
              <a>Talks</a>
            </Link>
          </li>
          <li>
            <Link href="/workshops">
              <a>Workshops</a>
            </Link>
          </li>
          <li>
            <Link href="/blog">
              <a>Blog</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <a>Get in touch</a>
            </Link>
          </li>
        </ul>

        <ToggleDarkMode />
      </header>

      <main className={styles.main}>{children}</main>

      <footer>
        Follow me on Twitter{" "}
        <a href="https://twitter.com/pfeiffer_andrei">@pfeiffer_andrei</a>
      </footer>
    </div>
  );
}

function ToggleDarkMode() {
  const darkMode = useDarkMode();
  return (
    <button type="button" onClick={darkMode.toggle}>
      {`Toggle dark mode`}
    </button>
  );
}
