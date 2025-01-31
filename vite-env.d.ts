/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CAT_API_KEY: string;
  readonly VITE_CAT_API_BASE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
