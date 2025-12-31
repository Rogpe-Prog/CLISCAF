# vertex-service

Vertex AI Microservice

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The service will run on `http://localhost:3000`

### Build

```bash
npm run build
```

### Start Production

```bash
npm start
```

## API Endpoints

- `GET /` - Service info
- `GET /health` - Health check
- `GET /health/readiness` - Readiness probe

## Project Structure

```
src/
├── main.ts          # Entry point
├── server.ts        # Express app setup
└── health/
    └── health.route.ts  # Health check endpoints
```
