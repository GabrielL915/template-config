import { existsSync } from '@std/fs';
import { join, dirname } from '@std/path';
import chalk from 'chalk';
import process from "node:process";

export const copyTemplateFile = (templateRelativePath: string): void => {
    const templatesPath = join(dirname(import.meta.url), '../../templates');
    const source = join(templatesPath, templateRelativePath);
    const destination = join(process.cwd(), templateRelativePath);

    if (!existsSync(source)) {
        console.error(chalk.red(`Template não encontrado: ${templateRelativePath}`));
        return;
    }

    const destinationDir = dirname(destination);
    if (!existsSync(destinationDir)) {
        Deno.mkdirSync(destinationDir, { recursive: true });
    }

    Deno.copyFileSync(source, destination);
    console.log(chalk.green(`Arquivo aplicado: ${templateRelativePath}`));
};
