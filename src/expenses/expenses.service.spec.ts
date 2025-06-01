import { Test, TestingModule } from '@nestjs/testing';
import { ExpensesService } from './expenses.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from './entities/expense.entity';
import { CreateExpenseDto } from './dto/expense.dto';

describe('ExpensesService', () => {
  let service: ExpensesService;
  let repository: Repository<Expense>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpensesService,
        {
          provide: getRepositoryToken(Expense),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ExpensesService>(ExpensesService);
    repository = module.get<Repository<Expense>>(getRepositoryToken(Expense));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an expense', async () => {
    const userId = 1;
    const createExpenseDto: CreateExpenseDto = {
      amount: 100,
      category: 'Groceries',
      date: new Date(),
      description: 'Test expense',
    };
    const expense = { id: 1, ...createExpenseDto, userId } as Expense;
    jest.spyOn(repository, 'create').mockReturnValue(expense);
    jest.spyOn(repository, 'save').mockResolvedValue(expense);

    const result = await service.create(userId, createExpenseDto);
    expect(result).toEqual(expense);
    expect(repository.save).toHaveBeenCalledWith(expense);
  });

  it('should find all expenses with filters', async () => {
    const userId = 1;
    const expenses = [
      {
        id: 1,
        amount: 100,
        category: 'Groceries',
        date: new Date(),
        userId,
        description: 'Test',
      },
    ];
    const queryBuilder = {
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue(expenses),
    };
    jest
      .spyOn(repository, 'createQueryBuilder')
      .mockReturnValue(queryBuilder as any);

    const result = await service.findAll(userId, { period: 'week' });
    expect(result).toEqual(expenses);
    expect(queryBuilder.where).toHaveBeenCalledWith(
      'expense.userId = :userId',
      { userId },
    );
    expect(queryBuilder.andWhere).toHaveBeenCalledWith(
      "expense.date >= NOW() - INTERVAL '1 week'",
    );
  });
});
