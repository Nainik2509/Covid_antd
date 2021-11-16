export const REQUIRED_ERROR = (name: string) => `${name} is required!`
export const REQUIRED_TYPE = (name: string, type: string) =>
  `${name} must be ${type}.`
export const MIN_LENGTH = (name: string, type: number) =>
  `${name} must be at least ${type} characters long.`
