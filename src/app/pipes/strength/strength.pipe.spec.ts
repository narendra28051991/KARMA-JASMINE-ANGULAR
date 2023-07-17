import { StrengthPipe } from './strength.pipe';

describe('StrengthPipe', () => {
  let pipe: StrengthPipe
  
  beforeEach (() => {
    pipe = new StrengthPipe()
  })

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('Alien expected', () => {
    expect(pipe.transform(-5)).toBe('Alien');
  })

  it('Mario expected', () => {
    expect(pipe.transform(15)).toBe('Mario group');
  })

  it('Yoshi expected', () => {
    expect(pipe.transform(35)).toBe('Yoshi group');
  })

  it('Luigi expected', () => {
    expect(pipe.transform(55)).toBe('Luigi group');
  })

  it('Peach expected', () => {
    expect(pipe.transform(75)).toBe('Peach group');
  })

  it('Toad expected', () => {
    expect(pipe.transform(90)).toBe('Toad group');
  })

  it('Ninja expected', () => {
    expect(pipe.transform(1000)).toBe('Ninja');
  })
});
