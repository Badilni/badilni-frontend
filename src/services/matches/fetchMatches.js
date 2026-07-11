import { getMatches } from '../../api/matches'

export const fetchMatches = ({ page = 1, limit = 9 } = {}) =>
  getMatches({ page, limit })