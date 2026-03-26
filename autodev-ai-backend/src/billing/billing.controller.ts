import { Controller, Post, UseGuards, Req, Headers } from '@nestjs/common';
import type { RawBodyRequest } from '@nestjs/common';
import { BillingService } from './billing.service';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Post('checkout')
  @UseGuards(AuthGuard('jwt'))
  async checkout(@Req() req: any) {
    return this.billingService.createCheckoutSession(req.user.userId || req.user.sub);
  }

  @Post('webhook')
  async webhook(
    @Headers('stripe-signature') signature: string, 
    @Req() req: RawBodyRequest<Request>
  ) {
    return this.billingService.handleWebhook(signature, (req as any).rawBody);
  }
}
