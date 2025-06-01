import { Injectable } from '@nestjs/common';

/**
 * Root service for the Expense Tracker application
 */
@Injectable()
export class AppService {
  /**
   * Returns a welcome message for the API
   * @returns Welcome message
   */
  getWelcome(): string {
    return 'Welcome to the Expense Tracker API!';
  }

  /**
   * Returns the health status of the API
   * @returns Health status object
   */
  getHealth(): { status: string } {
    return { status: 'API is running' };
  }
}
