export const REQUIRED_ERROR = (name: string) => `${name} is required!`
export const REQUIRED_TYPE = (name: string, type: string) =>
  `${name} must be ${type}.`
export const MIN_LENGTH = (name: string, type: number) =>
  `${name} must be at least ${type} characters long.`
export const MIN_CHECKED = (name: string, type: number) =>
  `At least ${type} option must be checked for ${name} .`
export const MIN_RATE = (name: string, type: number) =>
  `A min rate of ${type} should be there.`

export const BooleanType = [true, false]
export const ageGroup = [
  '0 - 17',
  '18 - 35',
  '36 - 58',
  '59 - 70',
  '71 and above',
]
export const symptomsGroup = [
  'Cold',
  'Cough',
  'Sore throat',
  'Stomach pain',
  'Shortness of breath',
  'Redness in eyes',
  'Fever',
  'Toothache',
  'Nausea',
  'Itching',
  'Diarrhea',
]
