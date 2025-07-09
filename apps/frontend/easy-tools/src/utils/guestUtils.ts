import axiosInstance from "@/server";
import { GuestID } from "../../config/Const";

// 生成或获取访客ID
export const getGuestId = async () => {
  const storedId = localStorage.getItem(GuestID);
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
