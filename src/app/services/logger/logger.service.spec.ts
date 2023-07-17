import { TestBed } from "@angular/core/testing";
import { LoggerService } from "./logger.service";

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggerService]
    })
    service = TestBed.inject(LoggerService)
  });

  it('messages should be empty in the start', () => {
    service.clear()
    expect(service.messages.length).toBe(0);
  });

  it('should include a term after log is called', () => {
    service.log('first term')
    expect(service.messages.length).toBe(1);
  });

  it('finally clear all the messages', () => {
    service.log('second term')
    expect(service.messages.length).toBe(1);
    service.clear()
    expect(service.messages.length).toBe(0);
  });
});
