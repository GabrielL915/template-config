import { copyTemplateFile } from '../utils/fileUtils.ts';
import { join, dirname } from '@std/path';
import { ApplyConfigOptions } from '../types/applyConfigOptions.ts';

export const applyTemplates = (options: ApplyConfigOptions): void => {
    const templatesPath = join(dirname(import.meta.url), '../../templates');

    const availableTemplates = Array.from(Deno.readDirSync(templatesPath)).reduce((acc: Record<string, string>, folder: Deno.DirEntry) => {
        if (folder.isDirectory) {
            const folderPath = join(templatesPath, folder.name);
            const files = Array.from(Deno.readDirSync(folderPath));

            files.forEach((file) => {
                acc[folder.name] = join(folder.name, file.name); // eslint -> eslint/.eslintrc.json
            });
        }
        return acc;
    }, {});

    // Aplicando os templates
    Object.keys(options).forEach((key) => {
        if (options[key] && availableTemplates[key]) {
            copyTemplateFile(availableTemplates[key]);
        }
    });

    console.log('Configurações aplicadas com sucesso!');
};
