// .storybook/preview.tsx
import type { Preview } from "@storybook/react";
import Layout from "../src/app/layout";
import { initialize, mswLoader } from 'msw-storybook-addon';
import React from "react";
import { EnvConfig } from "../src/env/env";

// Initialize MSW
initialize();

/**
 * Mock environment configuration
 */
const mockEnv: EnvConfig = {
  API_BASE_URL: "http://localhost:8080"
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  loaders: [mswLoader],
  decorators: [
    (Story) => {
      console.log("Applying Layout decorator with mockEnv:", mockEnv);
      return (
        <Layout params={{ env: mockEnv }}>
            <Story />
        </Layout>
      );
    },
  ],
};

export default preview;
