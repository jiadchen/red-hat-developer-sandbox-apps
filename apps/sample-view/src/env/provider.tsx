// env/provider.tsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getEnv, EnvConfig } from "./env";

export const EnvContext = createContext({} as EnvConfig);

export const EnvProvider = ({
  children,
  env,
}: Readonly<{
  children: React.ReactNode;
  env?: EnvConfig;
}>) => {
  console.log("EnvProvider initialized with env:", env);

  const [config, setConfig] = useState<EnvConfig>(env || ({} as EnvConfig));

  useEffect(() => {
    console.log("useEffect triggered with env:", env);
    if (!env) {
      console.log("getting env");
      getEnv().then((config) => {
        setConfig(config);
        console.log("env fetched:", config);
      });
    }
  }, [env]);

  return <EnvContext.Provider value={config}>{children}</EnvContext.Provider>;
};

export const useEnv = () => {
  return useContext(EnvContext);
};
