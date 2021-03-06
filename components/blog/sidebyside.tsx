import React from "react";

import { useBreakpoint } from "../layout/useBreakpoint";

import { Fullpage } from "./fullpage";

import s from "./sidebyside.module.scss";

type Header = { lang?: string; file?: string };

type SideBySideProps = {
  children: JSX.Element[];
  left?: Header;
  right?: Header;
};

export function SideBySide({ children, left, right }: SideBySideProps) {
  return (
    <Fullpage>
      <div className={s.container}>
        <Side fullwidth={false} header={left}>
          {children[0]}
        </Side>
        <Side fullwidth={false} header={right}>
          {children[1]}
        </Side>
      </div>
    </Fullpage>
  );
}

type SideProps = {
  children: JSX.Element;
  header?: Header;
  fullwidth?: boolean;
};

export function Side({ children, header, fullwidth = true }: SideProps) {
  const { breakpoint } = useBreakpoint();

  // spread this single side on the entire width when on mobile
  if (fullwidth && (!breakpoint || breakpoint === "sm")) {
    return <Fullpage>{renderContent()}</Fullpage>;
  }

  return renderContent();

  function renderContent() {
    return (
      <div className={s.side}>
        {header && renderHeader(header)}
        {children}
      </div>
    );
  }

  function renderHeader(header: Header) {
    return (
      <header className={s.header}>
        <span className={s.file}>{header.file}</span>
        {!!header.lang && <span className={s.lang}>{header.lang}</span>}
      </header>
    );
  }
}
