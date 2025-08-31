import type { Rate } from '../types/rate'

// Taxas de câmbio fixas para USD
export const fallbackRates: Rate[] = [
    { currency: 'EUR', rate: 0.86, flag: 'eu' },
    { currency: 'GBP', rate: 0.74, flag: 'gb' },
    { currency: 'JPY', rate: 147.16, flag: 'jp' },
    { currency: 'BRL', rate: 5.43, flag: 'br' },
    { currency: 'CAD', rate: 1.37, flag: 'ca' },
    { currency: 'AUD', rate: 1.53, flag: 'au' },
]
