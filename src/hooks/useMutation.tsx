import { useCallback, useState } from "react";
import { HTTPMethod } from "./useFetch";

interface MutationState<TResponse> {
    data: TResponse | null;
    isLoading: boolean;
    error: string | null;
}

export interface MutationOptions {
    method: HTTPMethod.POST | HTTPMethod.PUT | HTTPMethod.DELETE;
    headers?: HeadersInit;
}


export default function useMutation<TResponse, TBody = Partial<TResponse>>(
    baseEndpoint: string = "",
    { method, headers }: MutationOptions,
) {
    const [state, setState] = useState<MutationState<TResponse>>({
        data: null,
        isLoading: false,
        error: null,
    });
    const mutate = useCallback(
        async (
            body?: TBody,
            dynamicEndpoint?: string
        ) => {
            setState({ data: null, isLoading: true, error: null });

            try {
                const url = baseEndpoint + (dynamicEndpoint ?? '');
                const isFormData = body instanceof FormData;
                const fetchOptions: RequestInit = {
                    method,
                    headers: isFormData
                        ? headers
                        : {
                            "Content-Type": "application/json",
                            ...headers,
                        },
                    body: (method === HTTPMethod.POST || method === HTTPMethod.PUT)
                        ? isFormData
                            ? body
                            : JSON.stringify(body)
                        : undefined,
                };
                const res = await fetch(url, fetchOptions);

                if (!res.ok) throw new Error(res.statusText);

                const json =
                    res.status !== 204 && res.headers.get("content-length") !== "0"
                        ? ((await res.json()) as TResponse)
                        : null;

                setState({ data: json, isLoading: false, error: null });

            } catch (err) {
                setState({
                    data: null,
                    isLoading: false,
                    error: (err as Error).message,
                });
            }
        },
        [baseEndpoint, method, headers]
    );

    return {
        ...state,
        mutate,
    };
}
