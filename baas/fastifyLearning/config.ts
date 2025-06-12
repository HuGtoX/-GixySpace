// eslint-disable-next-line import/no-named-default
import { default as envSchema } from 'env-schema';
import { type Static, Type } from '@sinclair/typebox';

// 注意: 由于 TypeBox 增加了一些属性，而 envSchema 使用 AJV 不能有多余的属性。
const schema = Type.Object(
	{
		JWT_SECRET: Type.String(),
		LOG_LEVEL: Type.String({ default: 'info' }),
		PRETTY_PRINT: Type.Boolean({ default: true })
	},
	{
		additionalProperties: false,
		required: ['JWT_SECRET']
	}
);

export type Config = Static<typeof schema>;

// 给 envSchema 标注类型
const envConfig = envSchema<Config>({
	schema,
	dotenv: true
});

export default envConfig;
