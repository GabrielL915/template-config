import { Command } from "commander";
import { applyCommand } from "./command/applyCommand.ts";

const program = new Command();

program.name("template-config")
  .description('A CLI para aplicar configurações de projetos')
  .version('1.0.0');

program.addCommand(applyCommand);

try {
  program.parse();
} catch (error) {
  if (error instanceof Error) {
    console.error("Erro ao processar os comandos:", error.message);
  } else {
    console.error("Erro ao processar os comandos:", error);
  }
  Deno.exit(1);
}
