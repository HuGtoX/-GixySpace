import { v4 as uuidv4 } from "uuid";

// 生成或获取访客ID
export const getGuestId = async () => {
  // 优先从localStorage获取
  const storedId = localStorage.getItem("guest_id");
  if (storedId) return storedId;

  // 生成新访客ID
  const newId = uuidv4();
  localStorage.setItem("guest_id", newId);

  // 创建访客记录
  await fetch("/api/guest/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      guest_id: newId,
    }),
  });

  return newId;
};

// 获取访客头像
export const getGuestAvatar = (guestId) => {
  return `https://avatar.tomato-tools.com/${guestId}.svg`;
};
