interface ImportMetaEnv {
  readonly VITE_BASENAME?: string
  readonly VITE_BACKEND_URL?: string
  readonly VITE_DOCS_ROUTE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
