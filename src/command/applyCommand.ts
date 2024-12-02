import { Command } from 'commander';
import { applyTemplates } from '../service/templateService.ts';

export const applyCommand = new Command('apply')
    .description('Aplica configurações específicas ao projeto atual')
    .option('--eslint', 'Aplica configurações do ESLint')
    .option('--prettier', 'Aplica configurações do Prettier')
    .option('--editorconfig', 'Aplica configurações do EditorConfig')
    .action((options) => {
        if (!Object.values(options).some((opt) => opt)) {
            console.error("Nenhuma opção foi fornecida. Use --help para mais informações.");
            Deno.exit(1);
        }
        applyTemplates(options);
    });

