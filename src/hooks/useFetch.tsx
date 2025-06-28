import { useCallback, useEffect, useState } from "react";

interface FetchState<T> {
    data: T | null;
    isLoading: boolean;
    error: string | null;
}

export const enum HTTPMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH",
}

export interface FetchOptions {
    method: HTTPMethod;
    headers?: HeadersInit;
    body?: BodyInit | null;
}



function useFetch<T>(
    endpoint: string,
    opts: FetchOptions = { method: HTTPMethod.GET }
) {
    const [state, setState] = useState<FetchState<T>>({
        data: null,
        isLoading: true,
        error: null,
    });

    const fetchData = useCallback(async (): Promise<T | null> => {
        setState(s => ({ ...s, isLoading: true, error: null }));
        try {
            const res = await fetch(endpoint, opts);
            if (!res.ok) throw new Error(res.statusText);
            const json = await res.json();
            setState({ data: json, isLoading: false, error: null });
            return json;
        } catch (err) {
            setState(s => ({ ...s, isLoading: false, error: (err as Error).message }));
            return null;
        }
    }, [endpoint, opts]);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            const result = await fetchData();
            if (cancelled || result === null) return;
        })();
        return () => {
            cancelled = true;
        };
    }, [fetchData]);

    return {
        ...state,
        refetch: fetchData,
    };
}

export default useFetch;
