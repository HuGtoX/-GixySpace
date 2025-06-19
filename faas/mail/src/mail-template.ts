// mail-template.ts
import { template, intersect } from '../deps.ts';

export class MailTemplate<T extends Record<string, string>> {
  constructor(private templateContent: string, private argsDict: T, private subject: string) {}
  public render(args: T) {
    return { html: template(this.templateContent)(args), subject: this.subject };
  }
  public isArgsValid(args: string[]): boolean {
    const argsDictKeys = Object.keys(this.argsDict);
    const common = intersect(argsDictKeys, args);
    return common.length === argsDictKeys.length;
  }
}
