import { describe, expect, it } from 'vitest'

import {
  getMobileAuthScheme,
  getMobileTrustedOrigins,
  mergeTrustedOrigins,
} from '#/lib/auth-mobile-config.ts'

describe('auth mobile config', () => {
  it('includes the Expo app scheme in trusted origins', () => {
    expect(getMobileTrustedOrigins()).toEqual(
      expect.arrayContaining(['finnikk-business-os://', 'exp://']),
    )
  })

  it('uses the finnikk-business-os deep-link scheme', () => {
    expect(getMobileAuthScheme()).toBe('finnikk-business-os')
  })

  it('merges mobile and web trusted origins without duplicates', () => {
    expect(
      mergeTrustedOrigins(['https://app.example.com'], ['finnikk-business-os://']),
    ).toEqual(['https://app.example.com', 'finnikk-business-os://'])
  })
})
