import { GetStaticProps, GetStaticPaths } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { Arrow } from "../../../components/arrow";
import { BlogItem } from "../../../components/blog/blog_item";
import { TagsList } from "../../../components/blog/tags_list";
import { Flex } from "../../../components/flex";
import { Grid } from "../../../components/grid";
import { Layout } from "../../../components/layout";
import { useBreakpoint } from "../../../components/layout/useBreakpoint";
import { MetaTags } from "../../../components/meta_tags";
import { Spacer } from "../../../components/spacer";
import { Text } from "../../../components/text";

import { getPostsByTag, getAllTags, Post, TAGS, Tag } from "../../../lib/blog";

import styles from "./tag.page.module.scss";

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
      <MetaTags title={`${name} articles`} />

      <Grid>
        <Grid.Col span={12}>
          <Link href="/blog">
            <a className={styles.back}>
              <Flex type="inline" gap="16" align="center" as="span">
                <Arrow direction={"left"} />
                <Text size="m01">Back to Blog</Text>
              </Flex>
            </a>
          </Link>

          <Spacer vertical={breakpoint ? "40" : "24"} />
          <TagsList tags={tags} activeTag={tag} filled={true} />
          <Spacer vertical={breakpoint ? "80" : "60"} />

          <Text size="h00" as="h1">
            {name} <Text color="muted">articles</Text>
          </Text>
        </Grid.Col>

        <Grid.Col span={breakpoint === "md" ? 10 : 8}>
          <Spacer vertical="8" />
          <Text as="p">{description}</Text>
        </Grid.Col>
      </Grid>

      <Spacer vertical={breakpoint ? "80" : "40"} />

      <Flex
        as="ul"
        type="stack"
        gap={breakpoint ? "80" : "40"}
        className={styles.list}
      >
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
