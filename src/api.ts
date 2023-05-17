import useSWR, { mutate } from "swr";
import { BallotBox } from "./types";

const fetcher = (input: RequestInfo, init?: RequestInit) =>
  fetch(input, init).then((res) => res.json());

const baseUrl = 'https://api-sonuc.oyveotesi.org/api/v1/';

export const useBallotData = (schoolId: number) => useSWR<BallotBox[]>(`${baseUrl}submission/school/${schoolId}`, fetcher);
