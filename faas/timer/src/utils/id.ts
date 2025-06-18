// src/utils/id.ts
// 获得一个 id，记录当前的 id 在 localStorage 中
export function getId(): number {
    let id = Number(localStorage.getItem('id')) ?? 0;
    const returnId = id++;
    localStorage.setItem('id', id.toString());
    return returnId;
  }
