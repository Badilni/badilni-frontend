import { useQuery } from '@tanstack/react-query'
import { fetchTransactions } from '../../../services/Profile/fetchTransactions'
import { walletKeys } from './useWalletBalance'

export function useTransactions(filters = {}) {
  return useQuery({
    queryKey: walletKeys.transactions(filters),
    queryFn: () => fetchTransactions(filters),
    placeholderData: (prev) => prev,
    staleTime: 30_000,
  })
}
