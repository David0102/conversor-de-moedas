import { vi } from 'vitest'
import '@testing-library/jest-dom'

vi.mock('import.meta.env', () => ({
    VITE_ACCESS_KEY_EXCHANGE_RATE: 'test-api-key'
}))

vi.mock('axios', () => ({
    default: {
        create: vi.fn(() => ({
            get: vi.fn(),
            post: vi.fn(),
            put: vi.fn(),
            delete: vi.fn(),
        })),
    },
}))
