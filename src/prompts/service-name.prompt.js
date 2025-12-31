
export const serviceNamePrompt = {
  type: 'input',
  name: 'serviceName',
  message: 'Qual o nome do microservice?',
  validate: (input) => {
    if (!input) return 'O nome do serviço é obrigatório';

    const isValid = /^[a-z][a-z0-9-]+$/.test(input);
    if (!isValid) {
      return 'Use kebab-case. Ex: adsb-feed-service';
    }

    return true;
  }
};
