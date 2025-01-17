const config = {
  backendUrl: process.env.REACT_APP_BACKEND_URL,
}

for (const key in config) {
  if (!`${config[key]}`) {
    throw new Error(`Field ${key} is empty`)
  }
}

export default config
