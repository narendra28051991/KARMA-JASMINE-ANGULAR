import { TestBed } from "@angular/core/testing"
import { CalculatorService } from "./calculator.service"
import { LoggerService } from "../logger/logger.service"

describe('Calculator Service', () => {
  let calculator: CalculatorService
  let loggerService: jasmine.SpyObj<LoggerService>

  beforeEach(() => {
    const mockLoggerService = jasmine.createSpyObj('LoggerService', ['log'])

    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        {
          provide: LoggerService,
          useValue: mockLoggerService
        }
      ]
    })

    calculator = TestBed.inject(CalculatorService)  
    loggerService = TestBed.inject(LoggerService) as jasmine.SpyObj<LoggerService>
  })

  afterEach(() => {
    expect(loggerService.log).toHaveBeenCalledTimes(1)
  })

  it('addition', () => {
    expect(calculator.add(2, 2)).toBe(4)
  })

  it('subtraction', () => {
    expect(calculator.subtract(2, 2)).toBe(0)
  })
})