import type {Config} from '@jest/types';
// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  transform: {
  '^.+\\.tsx?$': ['ts-jest', {
    tsconfig: 'tsconfig.test.json'
  }],

  },
  testMatch: ['<rootDir>/src/Tests/**/*.tsx'],
  "moduleNameMapper": {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/app/**", "!<rootDir>/src/app/page.tsx","!<rootDir>/src/app/layout.tsx"],
  
};
export default config;
