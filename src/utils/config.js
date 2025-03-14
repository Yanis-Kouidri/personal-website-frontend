const config = {
  backendUrl: import.meta.env.VITE_BACKEND_URL,
}

for (const key in config) {
  //console.log(`Vérification de ${key} avec la valeur ${config[key]}`);
  if (!config[key]) {
    throw new Error(`Field ${key} is empty`)
  }
}

export default config
