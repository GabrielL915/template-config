import { existsSync } from '@std/fs';
import { join, dirname } from '@std/path';
import chalk from 'chalk';

export const copyTemplateFile = (templateName: string, templatesPath: string, templateMap: Record<string, string>): void => {
    const templateRelativePath = templateMap[templateName];

    if (!templateRelativePath) {
        console.error(chalk.red(`Template '${templateName}' não encontrado no templateMap.json.`));
        return;
    }

    const source = join(templatesPath, templateRelativePath);
    const destination = join(Deno.cwd(), templateRelativePath);

    if (!existsSync(source)) {
        console.error(chalk.red(`Template não encontrado: ${source}`));
        return;
    }

    const destinationDir = dirname(destination);
    if (!existsSync(destinationDir)) {
        Deno.mkdirSync(destinationDir, { recursive: true });
    }

    Deno.copyFileSync(source, destination);
    console.log(chalk.green(`Arquivo aplicado: ${templateName}`));
};
