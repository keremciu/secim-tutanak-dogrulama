import useSWR, { mutate } from "swr";
import { BallotBox, BallotResult } from "./types";

const fetcher = (input: RequestInfo, init?: RequestInit) =>
  fetch(input, init).then((res) => res.json());

const baseUrl = "https://api-sonuc.oyveotesi.org/api/v1/";

export const useBallotData = (schoolId: number) =>
  useSWR<BallotBox[]>(`${baseUrl}submission/school/${schoolId}`, fetcher);

const ballotPath = "/api/ballots";

export const useBallotResults = (ballotResults) => {
  const fetchWithData = async (args) => {
    return await fetch(args.url, {
      method: "POST",
      body: JSON.stringify(args.body),
    }).then((res) => res.json());
  };

  const { data, error } = useSWR<BallotResult[]>(
    { url: ballotPath, body: ballotResults },
    fetchWithData
  );
  return { data, error };
};
