import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const prices = await stripe.prices.list({
        limit: 3,
    });

    return NextResponse.json(prices.data.sort((a: any, b: any) => a.unit_amount - b.unit_amount));

}