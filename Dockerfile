# Utiliser une image de base
FROM node:22-alpine AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et yarn.lock
COPY package.json yarn.lock .yarnrc.yml ./

RUN corepack enable

# Installer les dépendances
RUN yarn install

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application
RUN yarn build

# Utiliser une image de base légère pour le serveur
FROM nginx:alpine

# Copier les fichiers de build dans le répertoire nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Démarrer nginx
CMD ["nginx", "-g", "daemon off;"]
