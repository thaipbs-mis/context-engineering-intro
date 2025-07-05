import { describe, it, expect } from 'vitest'
import {
  isValidEmail,
  isNotEmpty,
  isInRange,
  matchesPattern,
  createRule,
  validate,
  commonRules,
} from './validation'

describe('Validation Utilities', () => {
  describe('isValidEmail', () => {
    it('validates correct email formats', () => {
      expect(isValidEmail('test@example.com')).toBe(true)
      expect(isValidEmail('user.name@example.co.uk')).toBe(true)
      expect(isValidEmail('user+tag@example.com')).toBe(true)
    })

    it('rejects invalid email formats', () => {
      expect(isValidEmail('notanemail')).toBe(false)
      expect(isValidEmail('@example.com')).toBe(false)
      expect(isValidEmail('user@')).toBe(false)
      expect(isValidEmail('user @example.com')).toBe(false)
    })
  })

  describe('isNotEmpty', () => {
    it('returns true for non-empty strings', () => {
      expect(isNotEmpty('hello')).toBe(true)
      expect(isNotEmpty(' hello ')).toBe(true)
    })

    it('returns false for empty or whitespace strings', () => {
      expect(isNotEmpty('')).toBe(false)
      expect(isNotEmpty('   ')).toBe(false)
      expect(isNotEmpty('\t\n')).toBe(false)
    })
  })

  describe('isInRange', () => {
    it('validates numbers within range', () => {
      expect(isInRange(5, 1, 10)).toBe(true)
      expect(isInRange(1, 1, 10)).toBe(true)
      expect(isInRange(10, 1, 10)).toBe(true)
    })

    it('rejects numbers outside range', () => {
      expect(isInRange(0, 1, 10)).toBe(false)
      expect(isInRange(11, 1, 10)).toBe(false)
    })
  })

  describe('matchesPattern', () => {
    it('matches valid patterns', () => {
      expect(matchesPattern('123', /^\d+$/)).toBe(true)
      expect(matchesPattern('ABC', /^[A-Z]+$/)).toBe(true)
    })

    it('rejects non-matching patterns', () => {
      expect(matchesPattern('abc', /^\d+$/)).toBe(false)
      expect(matchesPattern('123', /^[A-Z]+$/)).toBe(false)
    })
  })

  describe('validate', () => {
    it('returns valid result when all rules pass', () => {
      const rules = [
        createRule((v) => v.length > 0, 'Required'),
        createRule((v) => v.length < 10, 'Too long'),
      ]

      const result = validate('hello', rules)
      expect(result.isValid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('returns errors when rules fail', () => {
      const rules = [
        createRule((v) => v.length > 0, 'Required'),
        createRule((v) => v.includes('@'), 'Must contain @'),
      ]

      const result = validate('hello', rules)
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Must contain @')
    })

    it('collects all error messages', () => {
      const rules = [
        createRule(() => false, 'Error 1'),
        createRule(() => false, 'Error 2'),
      ]

      const result = validate('test', rules)
      expect(result.errors).toHaveLength(2)
      expect(result.errors).toContain('Error 1')
      expect(result.errors).toContain('Error 2')
    })
  })

  describe('commonRules', () => {
    it('required rule works correctly', () => {
      expect(commonRules.required.validate('value')).toBe(true)
      expect(commonRules.required.validate('')).toBe(false)
      expect(commonRules.required.validate(null)).toBe(false)
      expect(commonRules.required.validate(undefined)).toBe(false)
    })

    it('email rule works correctly', () => {
      expect(commonRules.email.validate('test@example.com')).toBe(true)
      expect(commonRules.email.validate('invalid')).toBe(false)
    })

    it('minLength rule works correctly', () => {
      const rule = commonRules.minLength(5)
      expect(rule.validate('hello')).toBe(true)
      expect(rule.validate('hi')).toBe(false)
    })

    it('maxLength rule works correctly', () => {
      const rule = commonRules.maxLength(5)
      expect(rule.validate('hello')).toBe(true)
      expect(rule.validate('too long')).toBe(false)
    })
  })
})