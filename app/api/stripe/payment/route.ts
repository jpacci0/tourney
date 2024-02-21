import Stripe from 'stripe';
import { NextResponse, NextRequest } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
export async function POST(request: NextRequest) {
    let data = await request.json();
    let priceId = data.priceId;
    let userEmail = data.userEmail;
    let tournamentId = data.tournamentId;
    let teamId = data.teamId;

    const domain = window.location.origin;

    const session = await stripe.checkout.sessions.create({
        customer_email: userEmail,
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        metadata: {
            tournamentId: tournamentId,
            teamId: teamId,
        },
        mode: 'payment',
        success_url: `${domain}/success/?id=${tournamentId}`,
        cancel_url: `${domain}/canceled`,
        // success_url: `${process.env.DEV_SITE_URL}/success/?id=${tournamentId}`,
        // cancel_url: `${process.env.DEV_SITE_URL}/canceled`,
    });

    return NextResponse.json(session.url);

}