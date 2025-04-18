import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = (props) => {
  return <div>{props.children}</div>;
};

export default Container;
