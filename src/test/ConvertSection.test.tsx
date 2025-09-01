import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ConvertSection from '../components/ConvertSection'
import currencyService from '../services/currencyService'
import { LanguageProvider } from '../contexts/LanguageContext'

// Mock do currencyService
vi.mock('../services/currencyService')

const renderWithLanguageProvider = (component: React.ReactElement) => {
    return render(
        <LanguageProvider>
            {component}
        </LanguageProvider>
    )
}

describe('Conversor de Moedas', () => {
    it('deve renderizar o conversor', () => {
        renderWithLanguageProvider(<ConvertSection />)
        expect(screen.getByText('Conversor de Moedas')).toBeInTheDocument()
    })

    it('deve converter moeda', async () => {
        vi.mocked(currencyService.convertCurrency).mockResolvedValue(5.43)

        renderWithLanguageProvider(<ConvertSection />)

        const amountInput = screen.getByPlaceholderText('Digite o valor')
        fireEvent.change(amountInput, { target: { value: '1' } })

        const convertButton = screen.getByText('Converter')
        fireEvent.click(convertButton)

        await waitFor(() => {
            expect(screen.getByText('5.43 BRL')).toBeInTheDocument()
        })
    })

    it('deve trocar moedas', () => {
        renderWithLanguageProvider(<ConvertSection />)

        // Verifica estado inicial: USD -> BRL
        expect(screen.getByText('USD')).toBeInTheDocument()
        expect(screen.getByText('BRL')).toBeInTheDocument()

        // Encontra e clica no botão de troca
        const swapButton = document.querySelector('.p-3.bg-blue-600')
        fireEvent.click(swapButton!)

        // Verifica se as moedas foram trocadas: BRL -> USD
        expect(screen.getByText('BRL')).toBeInTheDocument()
        expect(screen.getByText('USD')).toBeInTheDocument()
    })
})
