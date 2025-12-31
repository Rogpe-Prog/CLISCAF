export const destinationPrompt = {
  type: 'input',
  name: 'destination',
  message: 'Destino para criar o microservice (caminho relativo ou absoluto). Deixe vazio para usar a pasta atual):',
  default: '.',
  validate: (input) => {
    if (!input) return true; // aceita vazio -> usa '.'
    return true;
  }
};
