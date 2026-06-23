import { useEffect, useState } from 'react';

import { config } from '../config';
import type { PortfolioData } from '../types';

interface UsePortfolioResult {
  data: PortfolioData | null;
  loading: boolean;
  error: string | null;
}

const usePortfolio = (): UsePortfolioResult => {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch(
          `${config.baseUrl}/api/v1/users/${config.userId}`,
          { headers: { api: config.apiKey } },
        );

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const json: PortfolioData = await response.json();

        setData({
          ...json,
          jobs: [...json.jobs].sort(
            (a, b) => new Date(b.dateStarted).getTime() - new Date(a.dateStarted).getTime(),
          ),
          projects: [...json.projects].reverse(),
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  return { data, loading, error };
};

export default usePortfolio;
