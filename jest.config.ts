import { pathsToModuleNameMapper } from 'ts-jest';
// import { compilerOptions } from './tsconfig.json';

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: pathsToModuleNameMapper({"@/*": ["./src/*"]}, { prefix: '<rootDir>/' }),
}