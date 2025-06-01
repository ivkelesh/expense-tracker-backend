import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * Root controller for the Expense Tracker application
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Returns a welcome message for the API
   * @returns Welcome message
   */
  @Get()
  getWelcome(): string {
    return this.appService.getWelcome();
  }

  /**
   * Health check endpoint for the API
   * @returns Health status
   */
  @Get('health')
  getHealth(): { status: string } {
    return this.appService.getHealth();
  }
}
