import express from "express";
import { client } from "./bot";
import {
  GeneralWebhook,
  WebhookTypes,
} from "../models/WebhookModels/GeneralWebhookModel";
import { TBAUpcomingMatchNotification } from "../models/WebhookModels/TBAUpcomingMatchNotificationModel";

export const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "No endpoint" });
});

app.post("/webhooks/tba", (req, res) => {
  const body = req.body as GeneralWebhook;

  // Disallowed request
  if (process.env.TBA_WEBHOOK_SECRET !== req.get("X-TBA-HMAC")) {
    res.json({ error: "Unverified token" }).status(400);
    console.log("Unverified request from", req.ip);
    return;
  }

  switch (body.message_type) {
    // TBA Verification
    case WebhookTypes.VERIFICATION:
      console.log(body);
      break;
    case WebhookTypes.UPCOMING_MATCH:
      console.log("Upcoming Match Notification");
      const newBody = body as TBAUpcomingMatchNotification;
      console.log(`Event Key: ${newBody.message_data.event_key}`);
    default:
      console.error("Unhandled or Unknown Webhook Type:", body.message_type);
  }

  res.status(200).json({ message: "success" });
});

export const PORT = process.env.PORT || 8080;
