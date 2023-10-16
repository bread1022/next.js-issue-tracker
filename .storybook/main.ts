import type { StorybookConfig } from '@storybook/nextjs';
import * as path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    '@storybook/addon-styling',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {
      nextConfigPath: path.resolve(__dirname, '../next.config.js'),
    },
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async (config) => {
    if (!config.resolve) {
      config.resolve = {};
    }
    config.resolve.alias = {
      ...config.resolve?.alias,
      '@': path.resolve(__dirname, '../src/'),
      'react-dom': 'react-dom',
    };
    return config;
  },
};
export default config;
