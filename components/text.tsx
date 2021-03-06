import classNames from "classnames";
import React from "react";

import styles from "./text.module.scss";

enum TextSize {
  // large paragraph
  p01 = "p01",
  // regular paragraph
  p02 = "p02",

  // largest heading, used on homepage only (I think)
  h00 = "h00",
  // large heading, usually h1
  h01 = "h01",
  // heading, usually h2
  h02 = "h02",
  // heading smaller, usually h2 variation
  h02_5 = "h02_5",
  // smaller heading, usually h3
  h03 = "h03",
  // tiny heading, usually h4, or bolder text
  h04 = "h04",
  // all caps heading
  h05 = "h05",
  // all caps text
  h06 = "h06",

  // monospace
  m01 = "m01",
  // monospace small
  m02 = "m02",
}

type Props = {
  children: React.ReactNode;
  as?: string;
  // https://projects.invisionapp.com/d/main#/console/20883010/443628189/inspect
  size?: keyof typeof TextSize | "inherit";
  color?: "default" | "primary" | "muted";
  align?: "start" | "center" | "end";
  display?: "inline" | "block";
  className?: string;
  nowrap?: boolean;
};

export function Text({
  children,
  as = "span",
  size = "inherit",
  color = "default",
  align = "start",
  nowrap = false,
  display,
  className,
}: Props) {
  return React.createElement(
    as,
    {
      className: classNames(className, display && [styles[display]], {
        [styles[size]]: size !== "inherit",
        [styles[`align_${align}`]]: true,
        [styles.primary]: color === "primary",
        [styles.nowrap]: nowrap === true,
        // global style
        muted: color === "muted",
      }),
    },
    children
  );
}
