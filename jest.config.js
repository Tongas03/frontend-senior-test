/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  moduleNameMapper: {
    '^@/components$': '<rootDir>/components/index.ts',
    '^@/hooks$': '<rootDir>/hooks/index.ts',
    '^@/stores$': '<rootDir>/stores/index.ts',
    '^@/types$': '<rootDir>/types/index.ts',
    '^@/utils$': '<rootDir>/utils/index.ts',
    '^@/lib$': '<rootDir>/lib/index.ts',
    '^@/mocks$': '<rootDir>/mocks/index.ts',
  },
}