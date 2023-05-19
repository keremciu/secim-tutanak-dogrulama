export interface BallotBox {
  ballot_box_number: number;
  cm_result: {
    image_url: string;
    submission_id: number;
    total_vote: number;
    votes: {
      1: number;
      2: number;
      3: number;
      4: number;
    }
  },
  school_name: string;
}

export interface BallotResult {
  il_adi: string;
  ilce_adi: string;
  muhtarlik_adi: string;
  sandik_no: number;
  secmen_sayisi: number;
  aday1: number;
  aday2: number;
  aday3: number;
  aday4: number;
}

