import { setPaid } from "@/lib/actions"
import { headers } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import Cors from "micro-cors";
const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = headers().get("stripe-signature");

  const event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
   // Handle the event
  switch (event.type) {
    // case 'payment_intent.succeeded':
    //   const paymentIntentSucceeded = event.data.object;
    //   // Then define and call a function to handle the event payment_intent.succeeded
    //   break;
      case 'checkout.session.completed':
        const checkoutSessionCompleted = event.data.object;
        await setPaid(checkoutSessionCompleted.metadata.teamId, checkoutSessionCompleted.metadata.tournamentId);
        break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ result: event, ok: true });

}
