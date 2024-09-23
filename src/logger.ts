import winston from "winston";

import { LoggingWinston, Options } from "@google-cloud/logging-winston";

// base64 形式のサービスアカウント設定を復元
// 環境変数に設定されていなければデフォルトの動作をするはず
const gcpCredentials = process.env.GCP_SERVICE_ACCOUNT_BASE64
  ? JSON.parse(
    Buffer.from(process.env.GCP_SERVICE_ACCOUNT_BASE64, "base64").toString(),
  )
  : undefined;

const credentialsOptions: Options = gcpCredentials
  ? {
    credentials: gcpCredentials,
    projectId: gcpCredentials["project_id"],
  }
  : {};

const loggingWinston = new LoggingWinston({
  logName: "portfolio",
  ...credentialsOptions,
});

const transports: winston.transport[] = [
  new winston.transports.Console(),
];

// デプロイされていたら Cloud Logging にログを送信する
const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL;
if (vercelUrl) {
  transports.push(loggingWinston);
}

export const logger = winston.createLogger({
  level: "info",
  transports,
  defaultMeta: { host: vercelUrl },
});

logger.info("Logger Started");
