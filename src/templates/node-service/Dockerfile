FROM node:20-alpine

WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy package files
COPY --chown=nodejs:nodejs package*.json ./

# Install all dependencies (needed for build)
RUN npm install

# Copy source code
COPY --chown=nodejs:nodejs . .

# Build and cleanup in a single layer to reduce image size
RUN npm run build && \
    npm prune --production && \
    rm -rf src tsconfig.json node_modules/@types

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the application
CMD ["node", "dist/main.js"]
