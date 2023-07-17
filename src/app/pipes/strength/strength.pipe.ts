import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'strength'
})
export class StrengthPipe implements PipeTransform {

  transform(value: number): string {
    if (value < 0) return 'Alien';
    else if (value >= 0 && value <= 28) return 'Mario group';
    else if (value > 28 && value <= 46) return 'Yoshi group';
    else if (value > 46 && value <= 64) return 'Luigi group';
    else if (value > 64 && value <= 82) return 'Peach group';
    else if (value > 82 && value <= 100) return 'Toad group';
    else return 'Ninja';
  }
}
