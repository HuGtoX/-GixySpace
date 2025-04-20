import React from "react";
import style from "./style.module.scss";

const Header: React.FC = () => {
  return (
    <header className={style.header}>
      <div className={style.title__wrapper}>
        <img width={60} height={60} src="/logo.png" alt="BitCraft" />
        <h1 className={style.title}>BitCraft</h1>
      </div>
      <div className={style.description__container}>
        <div className={style.description}>
          该网站主要提供一些日常需要用到的实用工具。
        </div>
        <div className={style.description}>
          通过极简交互实现专业级数据处理。
        </div>
      </div>
    </header>
  );
};

export default Header;
