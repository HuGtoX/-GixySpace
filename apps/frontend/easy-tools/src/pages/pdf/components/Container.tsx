import React from "react";
import Header from "./Header";
import styles from "./style.module.scss";

interface ContainerProps {
  title: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = (props) => {
  const { title, footer, header, children } = props;

  return (
    <div className={styles.container}>
      <div className="">
        <Header title={title} />
        {header}
      </div>

      <div className={styles.content}>{children}</div>

      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
};

export default Container;
