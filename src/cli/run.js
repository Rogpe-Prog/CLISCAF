#!/usr/bin/env node
import { Command } from 'commander';
import { generateNodeService } from '../generators/node-service/node-service.generator.js';
import { serviceNamePrompt } from '../prompts/index.js';
import inquirer from 'inquirer';
import chalk from 'chalk';

const program = new Command();

program
  .name('create-vertex-service')
  .description('CLI to scaffold Vertex AI services')
  .version('1.0.0');

program
  .command('init')
  .description('Initialize a new Vertex Microservice')
  .action(async () => {
    try {
      const answers = await inquirer.prompt([serviceNamePrompt]);
      const { serviceName } = answers;

      console.log(chalk.blue('\n📦 Criando microservice...\n'));
      console.log(`  Service name: ${chalk.cyan(serviceName)}\n`);

      await generateNodeService({ serviceName });

      console.log(chalk.green(`\n✅ Microservice '${serviceName}' criado com sucesso!\n`));
      console.log(chalk.gray(`Execute: cd ${serviceName} && npm install`));
    } catch (error) {
      console.error(chalk.red(`\n❌ Erro: ${error.message}\n`));
      process.exit(1);
    }
  });

export function run() {
  program.parse(process.argv);
}
