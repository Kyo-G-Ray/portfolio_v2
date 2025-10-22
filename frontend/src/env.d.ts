

interface ImportMetaEnv {
  readonly VITE_DEV: boolean;  // ローカル開発環境かどうか
  readonly VITE_BASE_URL: string
  readonly VITE_WORK: string
  readonly VITE_INTERVIEW: string
  readonly VITE_VOICE: string
  // 他の VITE_ プレフィックスの変数もここに追加
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}