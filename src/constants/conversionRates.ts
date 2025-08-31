import type { ConversionRate } from "../types/conversionRate";

// Taxas de conversão fixas para conversão de moedas
export const fixedConversionRates: ConversionRate[] = [
    { from: 'BRL', to: 'USD', rate: 0.18 },
    { from: 'USD', to: 'BRL', rate: 5.43 },
    { from: 'BRL', to: 'EUR', rate: 0.16 },
    { from: 'EUR', to: 'BRL', rate: 6.35 },
    { from: 'USD', to: 'EUR', rate: 0.86 },
    { from: 'EUR', to: 'USD', rate: 1.17 }
];
