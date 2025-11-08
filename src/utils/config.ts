const config = {
  backendUrl: import.meta.env.VITE_BACKEND_URL,
  docsRoute: import.meta.env.VITE_DOCS_ROUTE,
  strapiUrl: import.meta.env.VITE_STRAPI_URL,
}

type ConfigKey = keyof typeof config

for (const key in config) {
  const typedKey = key as ConfigKey
  if (!config[typedKey]) {
    throw new Error(`Field ${typedKey} is empty`)
  }
}

export default config
