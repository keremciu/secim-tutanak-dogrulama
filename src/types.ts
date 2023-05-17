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
