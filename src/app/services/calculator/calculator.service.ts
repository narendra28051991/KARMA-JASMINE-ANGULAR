import { Injectable } from '@angular/core';
import { LoggerService } from '../logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  constructor(private LoggerService: LoggerService) { }

  add = (n1: number, n2: number) => {
    this.LoggerService.log('addition logged')
    return n1 + n2
  }
  
  subtract = (n1: number, n2: number) => {
    this.LoggerService.log('subtraction logged')
    return n1 - n2
  }
}
