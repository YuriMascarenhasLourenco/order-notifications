import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentServiceService {
  private readonly stripe: Stripe;

  constructor(private readonly config: ConfigService) {
    this.stripe = new Stripe(
      this.config.getOrThrow<string>('STRIPE_SECRET_KEY'),
      {
        apiVersion: this.config.getOrThrow<string>(
          'STRIPE_API_VERSION',
        ) as Stripe.LatestApiVersion,
      },
    );
  }

  async createPaymentIntent(
    amountInCents: number,
    currency: string,
    quantity: number,
  ) {
    try {
      const session = await this.stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: [
          {
            price_data: {
              currency,
              unit_amount: amountInCents,
              product_data: { name: 'Payment' },
            },
            quantity,
          },
        ],
        success_url: 'http://localhost:3000/success?session_id={session.id}',
        cancel_url: 'http://localhost:3000/cancel',
      });

      console.log(`Checkout session created: ${session.url}`);
      return {
        checkoutSessionId: session.id,
        checkoutUrl: session.url,
      };
    } catch (err) {
      console.error(`Stripe error creating Checkout Session: ${err}`);
      throw err;
    }
  }
}
