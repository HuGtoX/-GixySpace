import { handlers, setup, getLogger, join } from '../../deps.ts';
import { logDir } from '../../store.constants.ts';

if (
	(await Deno.permissions.query({ name: 'write', path: logDir })).state !==
	'granted'
) {
	console.error('错误: 没有写权限', logDir);
	Deno.exit(1);
}
if (
	(await Deno.permissions.query({ name: 'read', path: logDir })).state !==
	'granted'
) {
	console.error('错误: 没有读权限', logDir);
	Deno.exit(1);
}

await setup({
	handlers: {
		fileHandler: new handlers.RotatingFileHandler('DEBUG', {
			filename: join(logDir, 's3.log'),
			maxBytes: 10000,
			maxBackupCount: 10,
			formatter: (logRecord) =>
				JSON.stringify({
					loggerName: logRecord.loggerName,
					datetime: logRecord.datetime.toLocaleString(),
					level: logRecord.levelName,
					msg: logRecord.msg
				})
		})
	},
	loggers: {
		default: {
			level: 'DEBUG',
			handlers: ['fileHandler']
		}
	}
});

export const log = getLogger();
