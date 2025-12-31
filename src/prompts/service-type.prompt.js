export const serviceTypePrompt = {
  type: 'list',
  name: 'serviceType',
  message: 'Tipo de serviço:',
  choices: [
    { name: 'Microservice (API backend)', value: 'microservice' },
    { name: 'BFF (Backend For Frontend)', value: 'bff' }
  ],
  default: 'microservice'
};
