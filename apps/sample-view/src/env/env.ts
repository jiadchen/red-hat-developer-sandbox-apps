"use server";
// インターフェースを定義
export interface EnvConfig {
  API_BASE_URL: string;
}

// ファイルの後半でインターフェースを使用
export const getEnv = async (): Promise<EnvConfig> => {
  return {
    API_BASE_URL: process.env.API_BASE_URL as string,
  };
};
