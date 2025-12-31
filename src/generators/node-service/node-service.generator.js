import fs from 'fs-extra';
import path from 'path';
import Handlebars from 'handlebars';

export async function generateNodeService({ serviceName }) {
  const targetDir = path.resolve(process.cwd(), serviceName);
  const templateDir = path.resolve(process.cwd(), 'src/templates/node-service');

  // Verifica se o microservice já existe
  if (await fs.pathExists(targetDir)) {
    throw new Error(`A pasta '${serviceName}' já existe`);
  }

  // Cria apenas a raiz
  await fs.mkdir(targetDir, { recursive: true });

  // Copia todos os templates (incluindo src, health, etc)
  await fs.copy(templateDir, targetDir);

  // Processa os arquivos .hbs
  await processTemplates(targetDir, { serviceName });

  console.log(`✅ Microservice '${serviceName}' criado com sucesso!`);
  console.log(`Local: ${targetDir}`);
};

// processTemplates agora só processa arquivos .hbs, sem criar pastas
async function processTemplates(dir, context) {
  const entries = await fs.readdir(dir);

  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stat = await fs.stat(fullPath);

    if (stat.isDirectory()) {
      await processTemplates(fullPath, context);
      continue;
    }

    if (entry.endsWith('.hbs')) {
      const content = await fs.readFile(fullPath, 'utf8');
      const template = Handlebars.compile(content);
      const result = template(context);

      const finalPath = fullPath.replace('.hbs', '');
      await fs.writeFile(finalPath, result);
      await fs.remove(fullPath);
    }
  }
}
