"use client";

import React from "react";
import { Layout, Button } from "antd";
import { useRouter } from "next/navigation";

const { Header: AntHeader } = Layout;

type HeaderProps = {
  title: string;
};

function ToolHeader({ title }: HeaderProps) {
  const router = useRouter();

  return (
    <AntHeader
      className={
        "!dark:border-gray-700 !dark:bg-gray-800 mb-2.5 flex h-14 items-center overflow-hidden rounded-md border-b border-solid !border-gray-200 !bg-white px-3"
      }
    >
      <Button
        icon={<span>⬅️</span>}
        style={{ marginRight: 10 }}
        onClick={() => router.back()}
      />
      <div style={{ fontSize: 18, fontWeight: "bold", marginRight: "auto" }}>
        {title}
      </div>
    </AntHeader>
  );
}

export default ToolHeader;
