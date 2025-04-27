export default abstract class DB<T> {
	// 初始化
	abstract init(): void;
	// 存入localStorage的key
	abstract readonly key: string;

	// 从localStorage中获取数据
	protected getItems() {
		return localStorage.getItem(this.key);
	}

	// 将数据存储到localStorage中
	protected setItems(data: T) {
		localStorage.setItem(this.key, JSON.stringify(data));
	}

	// 获取数据，如果数据不存在，则抛出NotFound异常
	get(): T {
		const data = this.getItems();
		if (!data) {
			throw new Deno.errors.NotFound(`${this.key} not found`);
		}
		return JSON.parse(data);
	}

	// 设置数据
	protected set(data: T) {
		this.setItems(data);
	}
}
