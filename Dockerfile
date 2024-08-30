# Utiliser une image de base
FROM node:22-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et yarn.lock
COPY package.json yarn.lock ./

# Installer les dépendances
RUN yarn install

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application
RUN yarn build

# Exposer le port
EXPOSE 3000

# Démarrer l'application
CMD ["yarn", "start"]
