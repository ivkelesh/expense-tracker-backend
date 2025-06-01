import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  CreateExpenseDto,
  UpdateExpenseDto,
  FilterExpenseDto,
} from './dto/expense.dto';

/**
 * Controller for managing expenses
 */
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  /**
   * Creates a new expense
   * @param req Request object with user data
   * @param createExpenseDto Expense data
   * @returns Created expense
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.create(req.user.id, createExpenseDto);
  }

  /**
   * Retrieves all expenses with optional filters
   * @param req Request object with user data
   * @param query Filter parameters
   * @returns List of expenses
   */
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req, @Query() query: FilterExpenseDto) {
    return this.expensesService.findAll(req.user.id, query);
  }

  /**
   * Updates an existing expense
   * @param id Expense ID
   * @param req Request object with user data
   * @param updateExpenseDto Updated expense data
   * @returns Updated expense
   */
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Request() req,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expensesService.update(+id, req.user.id, updateExpenseDto);
  }

  /**
   * Deletes an expense
   * @param id Expense ID
   * @param req Request object with user data
   * @returns Deleted expense
   */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    return this.expensesService.remove(+id, req.user.id);
  }
}
