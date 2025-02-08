import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

export interface HttpConfig {
  host: string;
  port: number;
}

export interface EnvironmentVariables {
  PORT: number;
  TIMEOUT: string;
}

const YAML_CONFIG_FILENAME = 'config.yml';

// Factory function for this kind of configuration
//
// A custom configuration file exports a factory function that returns a
// configuration object. The configuration object can be any arbitrarily nested
// plain JavaScript object
//
// During the build process, non TS files not move into dist built folder, to
// make sure it copied we need to config on nest-cli.json, see
// compilerOptions#assets
export default () => {
  // config get from yml file
  const ymlConfig = yaml.load(
    readFileSync(join(__dirname, YAML_CONFIG_FILENAME), 'utf-8'),
  ) as Record<string, any>;

  // Config module not validation, even use validationSchema so we need to take
  // it manually
  if (ymlConfig?.http?.port < 1024 || ymlConfig?.http?.port > 49151) {
    throw new Error('HTTP Port must be between 1024 and 49151');
  }

  console.log('Config loaded: ', JSON.stringify(ymlConfig));
  return ymlConfig;
};
