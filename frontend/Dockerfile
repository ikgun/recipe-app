# Use Node 23 (matching your installed version)
FROM node:23

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of source code
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Start dev server (hot reload)
CMD ["npm", "run", "dev"]
