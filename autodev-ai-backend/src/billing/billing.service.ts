import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import Stripe from 'stripe';

@Injectable()
export class BillingService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    this.stripe = new Stripe(
      this.configService.get<string>('STRIPE_SECRET_KEY') as string,
    );
  }

  async createCheckoutSession(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    let customerId = (user as any).stripeCustomerId;

    const createNewCustomer = async () => {
      const customer = await this.stripe.customers.create({
        email: user.email,
        metadata: { userId },
      });
      await (this.prisma.user as any).update({
        where: { id: userId },
        data: { stripeCustomerId: customer.id },
      });
      return customer.id;
    };

    if (!customerId) {
      customerId = await createNewCustomer();
    }

    try {
      const session = await this.stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ['card'],
        line_items: [
          {
            price: this.configService.get<string>(
              'STRIPE_PRO_PRICE_ID',
            ) as string,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${this.configService.get<string>('FRONTEND_URL')}/dashboard?success=true`,
        cancel_url: `${this.configService.get<string>('FRONTEND_URL')}/dashboard?canceled=true`,
      });
      return { url: session.url };
    } catch (error) {
      // If customer is missing in Stripe, clear it and try one more time
      if (
        error.raw?.code === 'resource_missing' &&
        error.raw?.param === 'customer'
      ) {
        customerId = await createNewCustomer();
        const session = await this.stripe.checkout.sessions.create({
          customer: customerId,
          payment_method_types: ['card'],
          line_items: [
            {
              price: this.configService.get<string>(
                'STRIPE_PRO_PRICE_ID',
              ) as string,
              quantity: 1,
            },
          ],
          mode: 'subscription',
          success_url: `${this.configService.get<string>('FRONTEND_URL')}/dashboard?success=true`,
          cancel_url: `${this.configService.get<string>('FRONTEND_URL')}/dashboard?canceled=true`,
        });
        return { url: session.url };
      }
      throw error;
    }
  }

  // async handleWebhook(signature: string, payload: Buffer) {
  //   const endpointSecret = this.configService.get<string>(
  //     'STRIPE_WEBHOOK_SECRET',
  //   );
  //   let event: Stripe.Event;

  //   try {
  //     event = this.stripe.webhooks.constructEvent(
  //       payload,
  //       signature,
  //       endpointSecret,
  //     );
  //   } catch (err) {
  //     throw new Error(`Webhook Error: ${err.message}`);
  //   }

  //   if (event.type === 'checkout.session.completed') {
  //     const session = event.data.object;
  //     const customerId = session.customer as string;
  //     await (this.prisma.user as any).updateMany({
  //       where: { stripeCustomerId: customerId },
  //       data: { isPro: true },
  //     });
  //   }

  //   if (event.type === 'customer.subscription.deleted') {
  //     const subscription = event.data.object;
  //     const customerId = subscription.customer as string;
  //     await (this.prisma.user as any).updateMany({
  //       where: { stripeCustomerId: customerId },
  //       data: { isPro: false },
  //     });
  //   }

  //   return { received: true };
  // }

  async upgradeUserLocally(userId: string) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { isPro: true },
    });
    return user;
  }

  async createPortalSession(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user || !(user as any).stripeCustomerId) {
      throw new Error('No Stripe customer found for this user');
    }

    const session = await this.stripe.billingPortal.sessions.create({
      customer: (user as any).stripeCustomerId,
      return_url: `${this.configService.get<string>('FRONTEND_URL')}/dashboard/settings`,
    });

    return { url: session.url };
  }
}
