import { useQuery } from '@tanstack/react-query'
import { getWalletBalance } from '../../../api/transactions'

export const walletKeys = {
  balance: ['wallet', 'balance'],
  transactions: (filters) => ['wallet', 'transactions', filters],
}

export function useWalletBalance() {
  return useQuery({
    queryKey: walletKeys.balance,
    queryFn: getWalletBalance,
    staleTime: 30_000,
  })
}