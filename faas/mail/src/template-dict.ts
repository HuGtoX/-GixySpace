// src/template-dict.ts
import {
    cancelNotification,
    verificationCode,
    participateNotification,
    organizerNotification,
  } from '../templates/mod.ts';
  export const templateDict = {
    cancelNotification,
    verificationCode,
    participateNotification,
    organizerNotification,
  };

  export const isTemplateDictKey = (key: string): key is keyof typeof templateDict => {
    return key in templateDict;
  };
