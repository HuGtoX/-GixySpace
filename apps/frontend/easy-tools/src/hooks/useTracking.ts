import { useCallback } from "react";
import axios from "@/server";
import { GuestID } from "../../config/Const";
import { isDev } from "@/utils/getEnv";

interface TrackingEventProps {
  eventName: string;
  eventCategory?: string;
  properties?: Record<string, any>;
}

export const useTracking = () => {
  const guestId = localStorage.getItem(GuestID);

  const trackEvent = useCallback(
    async ({
      eventName,
      eventCategory,
      properties = {},
    }: TrackingEventProps) => {
      if (!guestId || isDev) return;

      try {
        const response = await axios.post("/api/tracking/create", {
          eventName,
          eventCategory,
          guestId,
          properties,
          path: window.location.pathname,
          referrer: document.referrer,
          userAgent: navigator.userAgent,
        });

        return response;
      } catch (error) {
        console.error("Error tracking event:", error);
        throw error;
      }
    },
    [guestId],
  );

  return { trackEvent };
};

// 使用示例:
/*
import { useTracking } from '@/hooks/useTracking';

const MyComponent = () => {
  const { trackEvent } = useTracking();

  const handleClick = () => {
    trackEvent(
      'button_click',           // 事件名称
      'user_interaction',       // 事件类别
      {                         // 自定义属性
        buttonId: 'submit-btn',
        pageSection: 'hero'
      }
    );
  };

  return (
    <button onClick={handleClick}>
      点击我
    </button>
  );
};
*/
