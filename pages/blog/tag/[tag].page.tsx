import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";

import { BlogItem } from "../../../components/blog/blog_item";
import { Flex } from "../../../components/flex";
import { Text } from "../../../components/text";
import { Grid } from "../../../components/grid";
import { Layout } from "../../../components/layout";
import { Spacer } from "../../../components/spacer";
import { useBreakpoint } from "../../../components/layout/useBreakpoint";
import { getPostsByTag, getAllTags, Post, TAGS, Tag } from "../../../lib/blog";

import styles from "./tag.page.module.scss";
import { TagsList } from "../../../components/blog/tags_list";
import { Arrow } from "../../../components/arrow";

type Props = {
  posts: Post[];
  tags: Tag[];
};

export default function PostsByTag(props: Props) {
  const { breakpoint } = useBreakpoint();
  const router = useRouter();
  const { posts, tags } = props;

  const tag = router.query.tag as Tag;
  const { name, description } = TAGS[tag];

  return (
    <Layout>
      <Head>
        <title>Articles containing {name} tag</title>
      </Head>

      {breakpoint && <Spacer vertical="100" />}

      <Grid.Full>
        <Link href="/blog">
          <a className={styles.back}>
            <Flex type="inline" gap="16" align="center" as="span">
              <Arrow direction={"left"} />
              <Text size="m01">Back to Blog</Text>
            </Flex>
          </a>
        </Link>

        <Spacer vertical={breakpoint ? "40" : "24"} />

        <Text size="h00" as="h1">
          Tag: {name}
        </Text>
        <br />
        <Text as="p">{description}</Text>

        <Spacer vertical="32" />

        <TagsList tags={tags} activeTag={tag} />
      </Grid.Full>

      <Spacer vertical="60" />

      <Flex as="ul" type="stack" gap="140" className={styles.list}>
        {posts.map((post) => (
          <BlogItem post={post} key={post.id} />
        ))}
      </Flex>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const tags = getAllTags();

  const paths = tags.map((tag) => ({
    // "params" key is required
    // "tag" key must match the [tag] slug name
    params: { tag: encodeURI(tag).toLowerCase() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const posts = getPostsByTag(params?.tag as string);
  const tags = getAllTags();

  return {
    props: {
      posts,
      tags,
    },
  };
};
