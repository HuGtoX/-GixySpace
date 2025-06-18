// src/store.ts
import { baseStoreDir } from '../consts.ts';
import { ensureDir } from '../deps.ts';

interface StoreOptions<T> {
  prefix: string;
  id: number;
  data: T;
}
export abstract class Store<T> {
  private storeFile: string;
  private storeDir;
  protected prefix: string;
  protected id: number;
  protected data: T;
  protected constructor({ prefix, id, data }: StoreOptions<T>) {
    this.prefix = prefix;
    this.id = id;
    this.data = data;
    // 每一个存储的数据的文件夹名字为：日期+时间+id
    this.storeDir = `${baseStoreDir}/${this.prefix}/${this.id}/`;
    // 每一个存储的数据的文件名字为：data.json
    this.storeFile = `${this.storeDir}/data.json`;
    this.setActiveId();
  }
  // 保存数据到磁盘
  protected async save(): Promise<void> {
    await ensureDir(this.storeDir);
    await Deno.writeTextFile(this.storeFile, JSON.stringify(this.data));
  }
  // 获取当前数据
  protected getData(): T {
    return this.data;
  }
  // 更新数据
  protected setData(data: T): void {
    this.data = data;
    Deno.writeTextFileSync(this.storeFile, JSON.stringify(this.data));
  }
  // 删除数据
  public async delete(): Promise<void> {
    await Deno.remove(this.storeDir, { recursive: true });
    this.deleteActiveId();
  }

  // 使用 activeId 记录还没有触发的事件 id，activeId 保存在 localStorage 中，相当于 json 数据的索引。
  // 数据格式为：{ [id]: id }
  private setActiveId() {
    const activeId: Record<number, number> = JSON.parse(localStorage.getItem('activeId') ?? '{}');
    activeId[this.id] = this.id;
    localStorage.setItem('activeId', JSON.stringify(activeId));
  }
  // 删除 activeId 中的 id
  private deleteActiveId() {
    const activeIdRaw = localStorage.getItem('activeId');
    if (!activeIdRaw) {
      throw new Error('activeId 不在 localStorage 中');
    }
    const activeId: Record<number, number> = JSON.parse(activeIdRaw);

    if (this.id in activeId) {
      delete activeId[this.id];
    } else {
      throw new Error(`${this.id} 不在 activeId`);
    }
    localStorage.setItem('activeId', JSON.stringify(activeId));
  }
}
