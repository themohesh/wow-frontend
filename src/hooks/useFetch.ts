import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./useAuth";

interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseFetchOptions {
  immediate?: boolean;
}

type FetchFunction<T, P = unknown> = (params?: P) => Promise<T>;

export const useFetch = <T, P = unknown>(
  fetchFn: FetchFunction<T, P>,
  options: UseFetchOptions = { immediate: true }
) => {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const { state: authState } = useAuth();

  const execute = useCallback(
    async (params?: P) => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const data = await fetchFn(params);
        setState({ data, loading: false, error: null });
        return data;
      } catch (error: unknown) {
        if (error instanceof Error) {
          setState({ data: null, loading: false, error: error.message });
        } else {
          setState({
            data: null,
            loading: false,
            error: "An unknown error occurred",
          });
        }
        throw error;
      }
    },
    [fetchFn]
  );

  useEffect(() => {
    if (options.immediate && authState.isAuthenticated) {
      execute();
    }
  }, [execute, options.immediate, authState.isAuthenticated]);

  return {
    ...state,
    execute,
    setData: (data: T) => setState((prev) => ({ ...prev, data })),
  };
};
