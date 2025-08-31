import api from '../lib/api'
import { fixedConversionRates } from '../constants/conversionRates'
import { fallbackRates } from '../constants/rates'

class CurrencyService {
    // Converte moedas usando taxas fixas quando a API não está disponível
    private useFixedRate(from: string, to: string, amount: number): number {
        const rate = fixedConversionRates.find(
            r => r.from === from && r.to === to
        )

        if (rate) {
            return amount * rate.rate
        }

        throw new Error(`Conversão entre ${from} e ${to} não disponível offline`)
    }

    // Converte moedas usando a API do ExchangeRate com fallback para taxas fixas
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
                // Tenta a conversão usando as taxas fixas
                return this.useFixedRate(from, to, amount)
            }

            throw error
        }
    }

    // Busca taxas de câmbio em tempo real com fallback para taxas fixas
    async getExchangeRates() {
        try {
            const response = await api.get('/live', {
                params: {
                    currencies: 'EUR,GBP,JPY,BRL,CAD,AUD'
                }
            })

            const data = response.data

            if (data.success) {
                return Object.entries(data.quotes).map(([key, value]) => ({
                    currency: key.replace('USD', ''),
                    rate: value as number,
                    flag: this.getFlagForCurrency(key.replace('USD', ''))
                }))
            }

            throw new Error('API response not successful')
        } catch (error: any) {
            console.error('Erro ao buscar taxas de câmbio:', error)

            if (error.code === 'NETWORK_ERROR' || error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
                console.log('Tentando usar taxas fixas devido ao erro de rede...')
                return this.getFallbackRates()
            }

            throw error
        }
    }

    // Retorna o código do país para exibir a bandeira da moeda
    private getFlagForCurrency(currency: string): string {
        const flags: { [key: string]: string } = {
            'EUR': 'eu',
            'GBP': 'gb',
            'JPY': 'jp',
            'BRL': 'br',
            'CAD': 'ca',
            'AUD': 'au'
        }
        return flags[currency] || 'us'
    }

    // Retorna taxas de câmbio fixas como fallback quando a API falha
    private getFallbackRates() {
        return fallbackRates
    }
}

export default new CurrencyService();