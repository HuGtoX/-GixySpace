import React from "react";
import { Carousel } from "antd";
import style from "./style.module.scss";

const contentStyle: React.CSSProperties[] = [1, 2, 3].map((num) => ({
  maxWidth: "1080px",
  height: "100%",
  backgroundImage: `url("/banner/${num}.jpg")`,
  backgroundSize: "100% 100%",
  backgroundRepeat: "no-repeat",
}));

const Banner: React.FC = () => (
  <Carousel autoplaySpeed={6000} autoplay>
    {contentStyle.map((item, index) => (
      <div style={{ position: "relative" }} key={index}>
        <div className={style.banner}>
          <div
            className={style.banner__item__inner}
            style={{ backgroundImage: item.backgroundImage }}></div>
          <div className={style.banner__item} style={item}></div>
        </div>
      </div>
    ))}
  </Carousel>
);

export default Banner;
