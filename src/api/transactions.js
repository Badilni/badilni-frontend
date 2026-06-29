import api from './axios'

/**
 * Endpoints confirmed against Postman screenshots:
 *  - GET /transactions/balance  → { status, data: { walletBalance, creditsInEscrow } }
 *  - GET /transactions          → { status, walletSummary: { walletBalance, creditsInEscrow,
 *                                    totalEarned, totalSpent }, pagination: {...}, data: { transactions: [...] } }
 *
 * Confirmed query params for the list endpoint: type, createdAt[gte],
 * createdAt[lte], page, limit. No `sort` param was shown in any screenshot
 * — omit it rather than guessing a value the backend might reject.
 */

export const getWalletBalance = () => api.get('/transactions/balance').then((r) => r.data)

export const getTransactions = (params) => api.get('/transactions', { params }).then((r) => r.data)