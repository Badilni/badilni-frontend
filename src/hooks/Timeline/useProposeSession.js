import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../api/axios'
import { serviceRequestKeys } from './useServiceRequests'

/**
 * NO endpoint for proposing a session against a service request appears
 * anywhere in the 10 Postman screenshots — this is a placeholder, not a
 * confirmed integration. Confirm the real route, method, and payload shape
 * with the backend before relying on this; until then, calling it will 404.
 */
const proposeSession = (serviceRequestId, payload) =>
  api
    .post(`/service-requests/${serviceRequestId}/proposals`, payload)
    .then((r) => r.data)

export function useProposeSession() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ serviceRequestId, payload }) =>
      proposeSession(serviceRequestId, payload),
    onSuccess: (_data, { serviceRequestId }) => {
      qc.invalidateQueries({
        queryKey: serviceRequestKeys.detail(serviceRequestId),
      })
      qc.invalidateQueries({ queryKey: serviceRequestKeys.all })
    },
  })
}
