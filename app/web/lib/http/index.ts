import { TIMEOUT_IN_MILLISECONDS } from "@/constants/times";
import { env } from "@/env";
import axios, { AxiosError } from "axios";

export type ApiErrorData = {
  status: number;
  message?: string;
  error?: string;
};

export class ApiError extends Error implements ApiErrorData {
  status: number;
  error?: string;

  constructor(data: ApiErrorData) {
    super(data.message ?? "Erro inesperado");
    this.name = "ApiError";
    this.status = data.status;
    this.error = data.error;
  }
}

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  timeout: TIMEOUT_IN_MILLISECONDS,
});

api.interceptors.response.use(
  (response) => response,
  (err: AxiosError) => {
    const status = err.response?.status ?? 500;
    const data = err.response?.data as ApiErrorData | undefined;

    if (err.code === "ECONNABORTED" || err.message?.includes("timeout")) {
      return Promise.reject(
        new ApiError({
          status: 408,
          error: "TIMEOUT",
          message: "Tempo limite da requisição atingido.",
        }),
      );
    }

    return Promise.reject(
      new ApiError({
        status,
        error: data?.error ?? "UNKNOWN_ERROR",
        message: data?.message ?? "Ocorreu um erro inesperado.",
      }),
    );
  },
);
