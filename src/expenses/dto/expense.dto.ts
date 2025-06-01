import {
  IsNumber,
  IsString,
  IsDateString,
  IsOptional,
  IsIn,
  IsInt,
  Min,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Enum defining valid expense categories
 */
export enum ExpenseCategory {
  Groceries = 'Groceries',
  Leisure = 'Leisure',
  Electronics = 'Electronics',
  Utilities = 'Utilities',
  Clothing = 'Clothing',
  Health = 'Health',
  Others = 'Others',
}

/**
 * DTO for creating a new expense
 */
export class CreateExpenseDto {
  @IsNumber()
  amount: number;

  @IsString()
  @IsIn(Object.values(ExpenseCategory))
  category: ExpenseCategory;

  @IsDateString()
  @Type(() => Date)
  date: Date;

  @IsString()
  @IsOptional()
  description?: string;
}

/**
 * DTO for updating an expense
 */
export class UpdateExpenseDto {
  @IsNumber()
  @IsOptional()
  amount?: number;

  @IsString()
  @IsIn(Object.values(ExpenseCategory))
  @IsOptional()
  category?: ExpenseCategory;

  @IsDateString()
  @IsOptional()
  @Type(() => Date)
  date?: Date;

  @IsString()
  @IsOptional()
  description?: string;
}

/**
 * DTO for filtering expenses with pagination and sorting
 */
export class FilterExpenseDto {
  @IsIn(['week', 'month', '3months'])
  @IsOptional()
  period?: 'week' | 'month' | '3months';

  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  page?: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  limit?: number;

  @IsEnum(['date', 'amount'])
  @IsOptional()
  sortBy?: 'date' | 'amount';

  @IsEnum(['asc', 'desc'])
  @IsOptional()
  sortOrder?: 'asc' | 'desc';
}
