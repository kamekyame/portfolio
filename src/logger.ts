import winston from "winston";

import { LoggingWinston } from "@google-cloud/logging-winston";

// base64 形式のサービスアカウント設定を復元
// 環境変数に設定されていなければデフォルトの動作をするはず
const gcpCredentials = process.env.GCP_SERVICE_ACCOUNT_BASE64
  ? JSON.parse(
    Buffer.from(process.env.GCP_SERVICE_ACCOUNT_BASE64, "base64").toString(),
  )
  : undefined;

const loggingWinston = new LoggingWinston({
  logName: "portfolio",
  credentials: gcpCredentials,
});

const transports: winston.transport[] = [
  new winston.transports.Console(),
];

// デプロイされていたら Cloud Logging にログを送信する
const isDeployed = process.env.NEXT_PUBLIC_VERCEL_URL;
if (isDeployed) {
  transports.push(loggingWinston);
}

export const logger = winston.createLogger({
  level: "info",
  transports,
});

logger.info("Logger Started");
