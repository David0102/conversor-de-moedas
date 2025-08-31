import api from '../lib/api'
import { fixedConversionRates } from '../constants/conversionRates'

class CurrencyService {
    private useFixedRate(from: string, to: string, amount: number): number {
        const rate = fixedConversionRates.find(
            r => r.from === from && r.to === to
        )

        if (rate) {
            return amount * rate.rate
        }

        throw new Error(`Conversão entre ${from} e ${to} não disponível offline`)
    }

    // Conversão de moedas usando a api do exchangerate.
    async convertCurrency(from: string, to: string, amount: number) {
        try {
            const response = await api.get('/convert', {
                params: {
                    from,
                    to,
                    amount
                }
            })
            return response.data.result
        } catch (error: any) {
            console.error('Erro na conversão de moeda:', error)

            if (error.code === 'NETWORK_ERROR' || error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
                console.log('Tentando usar taxas fixas devido ao erro de rede...')
                /*Tenta a conversão usando as taxas fixas*/
                return this.useFixedRate(from, to, amount)
            }

            throw error
        }
    }
}

export default new CurrencyService();