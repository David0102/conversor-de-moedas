import { describe, it, expect, vi, beforeEach } from 'vitest'
import currencyService from '../services/currencyService'

// Mock da API
vi.mock('../lib/api', () => ({
    default: {
        get: vi.fn()
    }
}))

describe('Conversão de Moedas', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('deve converter USD para BRL usando taxa fixa', async () => {
        // Força erro na API para usar taxa fixa
        const { default: api } = await import('../lib/api')
        vi.mocked(api.get).mockRejectedValue(new Error('API Error'))

        const result = await currencyService.convertCurrency('USD', 'BRL', 1)
        expect(result).toBe(5.43)
    })

    it('deve converter BRL para USD usando taxa fixa', async () => {
        // Força erro na API para usar taxa fixa
        const { default: api } = await import('../lib/api')
        vi.mocked(api.get).mockRejectedValue(new Error('API Error'))

        const result = await currencyService.convertCurrency('BRL', 'USD', 10)
        expect(result).toBeCloseTo(1.8, 2)
    })

    it('deve converter usando API quando disponível', async () => {
        const mockResponse = {
            data: {
                result: 5.50
            }
        }

        // Mock que resolve com sucesso
        const { default: api } = await import('../lib/api')
        vi.mocked(api.get).mockResolvedValue(mockResponse)

        const result = await currencyService.convertCurrency('USD', 'BRL', 1)

        expect(result).toBe(5.50)
        expect(api.get).toHaveBeenCalledWith('/convert', {
            params: {
                from: 'USD',
                to: 'BRL',
                amount: 1
            }
        })
    })

    it('deve usar taxa fixa quando API falha', async () => {
        const { default: api } = await import('../lib/api')
        vi.mocked(api.get).mockRejectedValue(new Error('API Error'))

        const result = await currencyService.convertCurrency('USD', 'BRL', 1)

        expect(result).toBe(5.43) // Taxa fixa
    })

    it('deve retornar taxas de câmbio', async () => {
        const result = await currencyService.getExchangeRates()
        expect(result).toHaveLength(6)
        expect(result[0]).toHaveProperty('currency')
        expect(result[0]).toHaveProperty('rate')
    })
})
