import Stripe from 'stripe';
import { NextResponse, NextRequest } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
export async function POST(request: NextRequest) {
    let data = await request.json();
    let price = data.price;
    let userEmail = data.userEmail;
    let tournamentId = data.tournamentId;
    let teamId = data.teamId;

    const session = await stripe.checkout.sessions.create({
        customer_email: userEmail,
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: "Buy team registration",
            },
            unit_amount: price*100,
          },
          quantity: 1,
        },
        ],
        metadata: {
            tournamentId: tournamentId,
            teamId: teamId,
        },
        mode: 'payment',
        success_url: `${process.env.PROD_SITE_URL}/success/?id=${tournamentId}`,
        cancel_url: `${process.env.PROD_SITE_URL}/canceled`,
        // success_url: `${process.env.DEV_SITE_URL}/success/?id=${tournamentId}`,
        // cancel_url: `${process.env.DEV_SITE_URL}/canceled`,
    });

    return NextResponse.json(session.url);

}