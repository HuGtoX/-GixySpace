import axiosInstance from "@/server";
import { GuestVisitStats } from "@gixy/types";
import { GuestID } from "../../config/Const";

// 获取访问统计数据
export const fetchVisitStats = async () => {
  return await axiosInstance.get<GuestVisitStats>("/api/guest/stats");
};

// 记录访问次数
export const countVisits = async () => {
  const guestId = await getGuestId();
  await axiosInstance.post("/api/guest/visit", {
    fingerprint: guestId,
  });
};

// 生成或获取访客ID
export const getGuestId = async () => {
  const storedId = localStorage.getItem(GuestID);

  console.log("-- [ GuestID ] --", storedId);
  if (storedId) return storedId;

  // 生成新ID
  const newId =
    [
      navigator.hardwareConcurrency,
      screen.width,
      screen.height,
      navigator.language,
      Date.now().toString(36),
    ].join("-") +
    "-" +
    Math.random().toString(36).slice(2, 10);

  await axiosInstance.post("/api/guest/create", {
    guestId: newId,
  });

  localStorage.setItem(GuestID, newId);

  return newId;
};

// 获取访客头像
export const getGuestAvatar = (guestId) => {
  return `https://avatar.tomato-tools.com/${guestId}.svg`;
};
