import { BodyLoggerMiddleware } from './body-logger.middleware';

describe('BodyLoggerMiddleware', () => {
  it('should be defined', () => {
    expect(new BodyLoggerMiddleware()).toBeDefined();
  });
});
