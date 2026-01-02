import fs from 'fs-extra';
import path from 'path';
import Handlebars from 'handlebars';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function generateNodeService({ serviceName, destination = '.', serviceType = 'microservice' }) {
  // destination pode ser relativo ou absoluto
  const targetDir = path.resolve(process.cwd(), destination || '.', serviceName);
  const templateName = serviceType === 'bff' ? 'bff-service' : 'node-service';
  // Caminho baseado no diretório do gerador (não no cwd)
  const templateDir = path.resolve(__dirname, '../../templates', templateName);

  // Verifica se o microservice já existe
  if (await fs.pathExists(targetDir)) {
    throw new Error(`A pasta '${targetDir}' já existe`);
  }

  // Cria apenas a raiz
  await fs.mkdir(targetDir, { recursive: true });

  // Copia todos os templates (incluindo src, health, etc)
  await fs.copy(templateDir, targetDir);

  // Processa os arquivos .hbs
  await processTemplates(targetDir, { serviceName, serviceType });

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
