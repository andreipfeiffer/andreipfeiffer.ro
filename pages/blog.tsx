import Head from "next/head";
import Layout, { SITE_TITLE } from "../components/layout";
import { getAllPosts, Post } from "../lib/blog";
import Link from "next/link";
import Date from "../components/date";
import { GetStaticProps } from "next";

type Props = {
  posts: Post[];
};

export default function Blog(props: Props) {
  const { posts } = props;

  return (
    <Layout>
      <Head>
        <title>Blog: {SITE_TITLE}</title>
      </Head>

      <h2>Blog</h2>
      <ul>
        {posts.map(({ id, meta }) => (
          <li key={id}>
            <Link href={`/blog/${id}`}>
              <a>{meta.title}</a>
            </Link>{" "}
            {meta.category && (
              <small>
                [
                <Link
                  href={`/blog-category/${encodeURIComponent(meta.category)}`}
                >
                  <a>{meta.category}</a>
                </Link>
                ]
              </small>
            )}
            <br />
            <small>
              <Date dateString={meta.date} />
            </small>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      posts: getAllPosts(),
    },
  };
};
