import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from './entities/expense.entity';
import {
  CreateExpenseDto,
  FilterExpenseDto,
  UpdateExpenseDto,
} from './dto/expense.dto';

/**
 * Service for managing expenses
 */
@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,
  ) {}

  /**
   * Creates a new expense for a user
   * @param userId User ID
   * @param createExpenseDto Expense data
   * @returns Created expense
   */
  async create(
    userId: number,
    createExpenseDto: CreateExpenseDto,
  ): Promise<Expense> {
    const expense = this.expenseRepository.create({
      ...createExpenseDto,
      category: createExpenseDto.category,
      userId,
    });
    return this.expenseRepository.save(expense);
  }

  /**
   * Retrieves all expenses for a user with filters
   * @param userId User ID
   * @param filters Filter parameters
   * @returns List of expenses
   */
  async findAll(userId: number, filters: FilterExpenseDto): Promise<Expense[]> {
    const query = this.expenseRepository
      .createQueryBuilder('expense')
      .where('expense.userId = :userId', { userId });

    if (filters.startDate && filters.endDate) {
      query.andWhere('expense.date BETWEEN :startDate AND :endDate', {
        startDate: filters.startDate,
        endDate: filters.endDate,
      });
    } else if (filters.period) {
      const periods = {
        week: '1 week',
        month: '1 month',
        '3months': '3 months',
      };
      const interval = periods[filters.period];
      if (interval) {
        query.andWhere(`expense.date >= NOW() - INTERVAL '${interval}'`);
      }
    }

    return query.getMany();
  }

  /**
   * Retrieves a single expense by ID and user
   * @param id Expense ID
   * @param userId User ID
   * @returns Expense entity
   * @throws NotFoundException if expense not found
   */
  async findOne(id: number, userId: number): Promise<Expense> {
    const expense = await this.expenseRepository.findOne({
      where: { id, userId },
    });
    if (!expense)
      throw new NotFoundException(`Expense with ID ${id} not found`);
    return expense;
  }

  /**
   * Updates an existing expense
   * @param id Expense ID
   * @param userId User ID
   * @param updateExpenseDto Updated expense data
   * @returns Updated expense
   */
  async update(
    id: number,
    userId: number,
    updateExpenseDto: UpdateExpenseDto,
  ): Promise<Expense> {
    await this.findOne(id, userId);
    await this.expenseRepository.update(id, {
      ...updateExpenseDto,
      category: updateExpenseDto.category as Expense['category'],
    });

    const updatedExpense = await this.expenseRepository.findOneBy({ id });

    if (!updatedExpense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }
    return updatedExpense;
  }

  /**
   * Deletes an expense
   * @param id Expense ID
   * @param userId User ID
   * @returns Deleted expense
   */
  async remove(id: number, userId: number): Promise<Expense> {
    const expense = await this.findOne(id, userId);
    await this.expenseRepository.remove(expense);
    return expense;
  }
}
