// src/send-mail.ts
import { SMTPClient } from 'https://deno.land/x/denomailer@1.3.0/mod.ts';
import 'https://deno.land/std@0.182.0/dotenv/load.ts';

export async function sendMail(toMail: string, subject: string, html: string) {
	const client = new SMTPClient({
		connection: {
			hostname: 'smtp.163.com',
			port: 25,
			tls: false,
			auth: {
				username: Deno.env.get('MAIL_USERNAME')!,
				password: Deno.env.get('MAIL_PASSWORD')!
			}
		}
	});

	// console.log('sendMail', toMail, subject, html, Deno.env.get('MAIL_PASSWORD'));

	await client.send({
		from: `Monorepo 实战 <${Deno.env.get('MAIL_USERNAME')}>`,
		to: toMail,
		subject: subject,
		content: 'auto',
		html: html.replaceAll('\n', '')
	});

	await client.close();
}
