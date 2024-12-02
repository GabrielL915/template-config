import { Command } from "commander";
import { applyCommand } from "./command/applyCommand.ts";

const program = new Command();

program.name("teamp-config")
  .description('A CLI para aplicar configurações de projetos')
  .version('1.0.0');

program.addCommand(applyCommand);
program.parse();