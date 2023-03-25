/* eslint-disable prettier/prettier */
import { registerAs } from "@nestjs/config";
import * as Joi from "joi";

export interface GlobalConfig {
  azure: {
    container: string;
    connectionString: string;
  };
}

const GlobalConfigSchema = Joi.object<GlobalConfig>({
  azure: Joi.object<GlobalConfig["azure"]>({
    container: Joi.string().required(),
    connectionString: Joi.string().required(),
  }),
});

export const globalConfig = registerAs("global", () => {
  const cfg = {
    azure: {
      container: process.env.AZURE_STORAGE_CONTAINER,
      connectionString: process.env.AZURE_CONTAINER_CONNECTION_STRING,
    },
  } as GlobalConfig;

  // Validate
  const result = GlobalConfigSchema.validate(cfg, {
    allowUnknown: true,
    abortEarly: false,
  });
  if (result.error) {
    console.error("GlobalConfig Validation errors:");
    for (const v of result.error.details) {
      console.error(v.message);
    }
    throw new Error("Missing configuration options");
  }
  return cfg;
});
