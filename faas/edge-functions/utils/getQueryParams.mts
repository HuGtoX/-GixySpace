import { Status } from '../deps/http_status.ts';

type ParamValidator<T> = {
	name: keyof T;
	required?: boolean;
	validator?: (value: string) => boolean;
	transform?: (value: string) => unknown;
	errorMessage?: string;
};

export class ParamsError extends Error {
	constructor(
		message: string,
		public status: number = Status.BadRequest
	) {
		super(message);
		this.name = 'ParamsError';
	}
}
export function getQueryParams<T extends Record<string, unknown>>(
	request: Request,
	validators: ParamValidator<T>[]
): T {
	const url = new URL(request.url);
	const params = {} as T;
	for (const validator of validators) {
		const value = url.searchParams.get(validator.name as string);

		if (!value && validator.required) {
			throw new ParamsError(
				validator.errorMessage ||
					`缺少必要的参数: ${String(validator.name)}`
			);
		}

		if (value) {
			if (validator.validator && !validator.validator(value)) {
				throw new ParamsError(
					validator.errorMessage ||
						`参数 ${String(validator.name)} 格式不正确`
				);
			}
			// @ts-ignore - 忽略类型检查
			params[validator.name] = validator.transform
				? validator.transform(value)
				: value;
		}
	}

	return params;
}
