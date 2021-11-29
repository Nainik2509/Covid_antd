import { TTagColor } from '../helpers/common-types'

// Yup Validations messages
export const REQUIRED_ERROR = (name: string) => `${name} is required!`
export const REQUIRED_TYPE = (name: string, type: string) =>
  `${name} must be ${type}.`
export const MIN_LENGTH = (name: string, type: number) =>
  `${name} must be at least ${type} characters long.`
export const MIN_CHECKED = (name: string, type: number) =>
  `At least ${type} option must be checked for ${name} .`
export const MIN_SELECTED = (name: string, type: number) =>
  `At least ${type} option must be selected for ${name} .`
export const MIN_RATE = (name: string, type: number) =>
  `A min rate of ${type} should be there.`

// Sweet Alert2 Messages
export const DELETE_TITLE = 'Are you sure?'
export const CANCELLED_DELETE_TITLE = 'Cancelled'
export const DELETE_TEXT = (name: string) => `You want to delete ${name}!`
export const DELETE_SUCCESS_TEXT = (name: string) =>
  `${name} deleted successfully!`
export const CANCELLED_DELETE_TEXT = (name: string) => `Your ${name} is safe :)`

// Constant Array Masters
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

export const tagColor: TTagColor = {
  '0 - 17': 'cyan',
  '18 - 35': 'green',
  '36 - 58': 'purple',
  '59 - 70': 'gold',
  '71 and above': 'magenta',
}
