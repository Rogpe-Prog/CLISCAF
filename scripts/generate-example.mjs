import { generateNodeService } from '../src/generators/node-service/node-service.generator.js';

async function run() {
  try {
    await generateNodeService({ serviceName: 'tmp-example', destination: '.' });
    console.log('\n✅ Geração finalizada');
  } catch (err) {
    console.error('\n❌ Erro durante geração:', err);
    process.exit(1);
  }
}

run();
