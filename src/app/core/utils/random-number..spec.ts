import { randomNumber } from "./random-number";

describe('randomNumber', () => {
  const run = (min: number, max: number): void => {
    for (let i = 0; i < 300; i++) {
      const result = randomNumber(min, max);

      expect(result).toBeLessThanOrEqual(max);
      expect(result).toBeGreaterThanOrEqual(min);
    }
  };

  it('numbers should be between min and max', () => {
    run(0, 100);
  });

  it('number should be between min and max if negative', () => {
    run(-100, -50);
  });

  it('number should be between min and max if negative and positive', () => {
    run(-100, 100);
  });
});
