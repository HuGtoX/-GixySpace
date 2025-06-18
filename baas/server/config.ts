// eslint-disable-next-line import/no-named-default
import { default as envSchema } from 'env-schema';
import { type Static, Type } from '@sinclair/typebox';

// 注意: 由于 TypeBox 增加了一些属性，而 envSchema 使用 AJV 不能有多余的属性。
// 所以要使用 Type.Strict() 去除掉多余的属性
const schema = Type.Object(
	{
		JWT_SECRET: Type.String(),
		LOG_LEVEL: Type.String({ default: 'info' }),
		PRETTY_PRINT: Type.Boolean({ default: true })
	},
	{
		additionalProperties: false
	}
);

export type Config = Static<typeof schema>;
// .env 文件的路径
const envPath = new URL('.env', import.meta.url);
// 给 envSchema 标注类型
export default envSchema<Config>({
	schema,
	dotenv: { path: envPath.pathname }
});
