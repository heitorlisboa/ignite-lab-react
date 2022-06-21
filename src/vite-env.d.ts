/// <reference types="vite/client" />
/* eslint-disable @typescript-eslint/consistent-type-definitions */
interface ImportMetaEnv {
  readonly VITE_API_URI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
