import express from "express";
import crypto from "node:crypto";

import {
  GeneralWebhook,
  WebhookTypes,
} from "../models/WebhookModels/GeneralWebhookModel";
import { TBAUpcomingMatchNotification } from "../models/WebhookModels/TBAUpcomingMatchNotificationModel";
import { processUpcomingMatch } from "../lib/webhooks/upcomingMatch";
import { stringifyWithSpaces } from "../lib/customJson";
import { TBAMatchScoreNotification } from "../models/WebhookModels/TBAMatchScoreNotificationModel";
import { processMatchScore } from "../lib/webhooks/matchScore";

export const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "No endpoint" });
});

/**
 * Hosted Webhook receiver for TBA
 */
app.post("/webhooks/tba", async (req, res) => {
  const body = req.body as GeneralWebhook;

  // const hmac = crypto.createHmac("sha256", process.env.TBA_WEBHOOK_SECRET!);

  // Disallowed request -- this is not working at the moment (non-ascii characters get encoded differently in python.dumps and json.stringify)

  // if (
  //   hmac.update(stringifyWithSpaces(body), "utf-8").digest("hex") !=
  //     req.get("X-TBA-HMAC") &&
  //   body.message_type != WebhookTypes.VERIFICATION
  // ) {
  //   console.error("Unverified Request Received from", req.ip);
  //   console.log(body);
  //   res.json({ error: "Unverified request" }).status(400);

  //   return;
  // }
  let newBody;
  switch (body.message_type) {
    // TBA Verification
    case WebhookTypes.VERIFICATION:
      console.log(body);
      break;
    case WebhookTypes.UPCOMING_MATCH:
      newBody = body as TBAUpcomingMatchNotification;

      // will run asynchronously so request can be resolved quickly
      processUpcomingMatch(newBody);
      break;
    case WebhookTypes.MATCH_SCORE:
      newBody = body as TBAMatchScoreNotification;

      // will run asynchronously so request can be resolved quickly
      processMatchScore(newBody);
      break;
    default:
      console.warn("Unhandled or Unknown Webhook Type:", body.message_type);
      console.warn(body);
  }

  res.status(200).json({ message: "success" });
});

export const PORT = process.env.PORT || 8080;
