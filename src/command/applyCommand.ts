import { Command } from 'commander';
import { applyTemplates } from '../service/templateService.ts';

export const applyCommand = new Command('apply')
    .description('Aplica configurações específicas ao projeto atual')
    .option('--eslint', 'Aplica configurações do ESLint')
    .option('--prettier', 'Aplica configurações do Prettier')
    .option('--editorconfig', 'Aplica configurações do EditorConfig')
    .action((options) => {
        applyTemplates(options);
    });
