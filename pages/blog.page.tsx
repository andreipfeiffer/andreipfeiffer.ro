import React from "react";
import Head from "next/head";
import Link from "next/link";
import { GetStaticProps } from "next";

import { Grid } from "../components/grid";
import { Text } from "../components/text";
import { Spacer } from "../components/spacer";
import { FormattedDate } from "../components/date";
import { Flex } from "../components/flex";
import { Layout } from "../components/layout";
import { useBreakpoint } from "../components/layout/useBreakpoint";
import { Tag } from "../components/blog/tag";

import { getPublishedPosts, Post } from "../lib/blog";

import styles from "./blog.module.scss";
import { BlogItem } from "../components/blog/blog_item";

type Props = {
  posts: Post[];
};

export default function Blog(props: Props) {
  const { posts } = props;
  const { breakpoint } = useBreakpoint();

  return (
    <Layout>
      <Head>
        <title>Blog, Andrei Pfeiffer</title>
      </Head>

      {breakpoint && <Spacer vertical="100" />}

      <Grid.Full>
        <Text size="h00" as="h1" className={styles.h1}>
          Blog
        </Text>
      </Grid.Full>

      <Spacer vertical="100" />

      <Flex as="ul" type="stack" gap={"100"} className={styles.list}>
        {posts.map((post) => (
          <BlogItem post={post} key={post.id} />
        ))}
      </Flex>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      posts: getPublishedPosts(),
    },
  };
};
