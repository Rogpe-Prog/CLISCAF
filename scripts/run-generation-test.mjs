#!/usr/bin/env node

import path from 'path';
import fs from 'fs-extra';
import { spawn } from 'child_process';
import { generateNodeService } from '../src/generators/node-service/node-service.generator.js';

function sleep(ms){return new Promise(r=>setTimeout(r,ms));}

async function runCommandStreaming(cmd, args, cwd){
  return new Promise((resolve, reject)=>{
    const p = spawn(cmd, args, { cwd, shell: true, stdio: 'inherit' });
    p.on('error', reject);
    p.on('close', code => code === 0 ? resolve() : reject(new Error(`${cmd} ${args.join(' ')} exited with ${code}`)));
  });
}

async function runBackground(cmd, args, cwd){
  const p = spawn(cmd, args, { cwd, shell: true, stdio: 'inherit' });
  p.on('error', (e)=> console.error('Process error', e));
  return p;
}

async function main(){
  const argv = process.argv.slice(2);
  let serviceType = 'microservice';
  let durationMs = 20000;
  let destination = '.tmp-gen';

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--type' || a === '-t') {
      serviceType = argv[i + 1] || serviceType;
      i++;
      continue;
    }
    if (a.startsWith('--type=')) {
      serviceType = a.split('=')[1] || serviceType;
      continue;
    }
    if (a.startsWith('--duration=')) {
      const v = Number(a.split('=')[1]);
      if (!Number.isNaN(v)) durationMs = v;
      continue;
    }
    if (a === '--destination') {
      destination = argv[i + 1] || destination;
      i++;
      continue;
    }
    if (a.startsWith('--destination=')) {
      destination = a.split('=')[1] || destination;
      continue;
    }
  }

  const ts = Date.now();
  const serviceName = `gen-test-${ts}`;
  const targetDir = path.resolve(process.cwd(), destination, serviceName);

  console.log('Generating project %s (type=%s) in %s', serviceName, serviceType, targetDir);
  try{
    await generateNodeService({ serviceName, destination, serviceType });
  }catch(err){
    console.error('Generation failed:', err);
    process.exit(1);
  }

  console.log('Installing dependencies (this may take a while)');
  try{
    await runCommandStreaming('npm', ['install'], targetDir);
  }catch(err){
    console.error('npm install failed:', err);
    process.exit(1);
  }

  console.log('Starting worker and dev server (will run for %sms)', durationMs);
  const worker = await runBackground('npm', ['run', 'worker'], targetDir);
  const dev = await runBackground('npm', ['run', 'dev'], targetDir);

  // Let them run for a short while then shut down
  await sleep(durationMs);

  console.log('Stopping background processes');
  try{ worker.kill(); }catch(e){/*ignore*/}
  try{ dev.kill(); }catch(e){/*ignore*/}

  console.log('Test run completed. Project location:', targetDir);
  console.log('You can inspect logs above or run the project manually:');
  console.log(`  cd ${destination}/${serviceName}`);
  console.log('  npm run dev');
  console.log('  npm run worker');
}

main().catch(err=>{
  console.error('Unexpected error', err);
  process.exit(1);
});
