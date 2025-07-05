export interface ValidationRule {
  validate: (value: any) => boolean
  message: string
}

export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

/**
 * Validates an email address format
 * 
 * @param email - The email string to validate
 * @returns true if valid email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validates if a string is not empty after trimming
 * 
 * @param value - The string to validate
 * @returns true if not empty
 */
export function isNotEmpty(value: string): boolean {
  return value.trim().length > 0
}

/**
 * Validates if a value is within a min/max range
 * 
 * @param value - The number to validate
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (inclusive)
 * @returns true if within range
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max
}

/**
 * Validates if a string matches a pattern
 * 
 * @param value - The string to validate
 * @param pattern - RegExp pattern to match
 * @returns true if matches pattern
 */
export function matchesPattern(value: string, pattern: RegExp): boolean {
  return pattern.test(value)
}

/**
 * Creates a validation rule
 * 
 * @param validate - Validation function
 * @param message - Error message if validation fails
 * @returns ValidationRule object
 */
export function createRule(
  validate: (value: any) => boolean,
  message: string
): ValidationRule {
  return { validate, message }
}

/**
 * Validates a value against multiple rules
 * 
 * @param value - The value to validate
 * @param rules - Array of validation rules
 * @returns Validation result with errors
 */
export function validate(value: any, rules: ValidationRule[]): ValidationResult {
  const errors: string[] = []
  
  for (const rule of rules) {
    if (!rule.validate(value)) {
      errors.push(rule.message)
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  }
}

// Common validation rules
export const commonRules = {
  required: createRule(
    (value: any) => value !== null && value !== undefined && value !== '',
    'This field is required'
  ),
  
  email: createRule(
    (value: string) => isValidEmail(value),
    'Please enter a valid email address'
  ),
  
  minLength: (min: number) => createRule(
    (value: string) => value.length >= min,
    `Must be at least ${min} characters long`
  ),
  
  maxLength: (max: number) => createRule(
    (value: string) => value.length <= max,
    `Must be no more than ${max} characters long`
  ),
  
  min: (min: number) => createRule(
    (value: number) => value >= min,
    `Must be at least ${min}`
  ),
  
  max: (max: number) => createRule(
    (value: number) => value <= max,
    `Must be no more than ${max}`
  ),
  
  pattern: (pattern: RegExp, message: string) => createRule(
    (value: string) => matchesPattern(value, pattern),
    message
  ),
}