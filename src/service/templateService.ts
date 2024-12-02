import { join, dirname } from '@std/path';
import chalk from 'chalk';
import { existsSync } from '@std/fs';
import { copyTemplateFile } from '../utils/fileUtils.ts';
import { ApplyConfigOptions } from '../types/applyConfigOptions.ts';

export const applyTemplates = (options: ApplyConfigOptions): void => {
    let basePath: string;

    if (Deno.execPath().endsWith(".exe")) {
        basePath = dirname(Deno.execPath());
    } else {
        basePath = dirname(new URL(import.meta.url).pathname);
        if (Deno.build.os === "windows" && basePath.startsWith("/")) {
            basePath = basePath.slice(1); // Corrige caminhos no Windows
        }
    }

    const templatesPath = join(basePath, 'templates');
    const templateMapPath = join(templatesPath, 'templateMap.json');

    if (!existsSync(templateMapPath)) {
        console.error(chalk.red('Arquivo templateMap.json não encontrado!'));
        return;
    }

    const templateMap = JSON.parse(Deno.readTextFileSync(templateMapPath));

    Object.keys(options).forEach((key) => {
        if (options[key]) {
            copyTemplateFile(key, templatesPath, templateMap);
        }
    });

    console.log(chalk.green('Configurações aplicadas com sucesso!'));
};
