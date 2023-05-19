import { useBallotResults } from "../api";
import uniqueSchoolList from "./school_list.json";

interface BallotData {
  city_name: string;
  district_name: string;
  neighborhood_name: string;
  school_name: string;
}

const schoolList: any = uniqueSchoolList;

const findSchool = (schoolName: string) => {
  const school = schoolList.find((s: BallotData) => s.school_name === schoolName);
  return school;
};

interface IBallotResults {
  schoolName: string;
  ballotBoxNo: number;
}

export const BallotResults: React.FC<IBallotResults> = ({
  schoolName,
  ballotBoxNo,
}: IBallotResults) => {
  const ballotData = findSchool(schoolName);
  const { data: results, error } = useBallotResults(ballotData);
  if (error != null) return <div>Error loading ballot results...</div>;
  if (results == null) return <div>Loading...</div>;

  const result = results.find((r) => r.sandik_no === ballotBoxNo);

  return (
    <div>
      <h4>YSK verisi:</h4>
      <ul>
        <li>Erdogan: {result.aday1}</li>
        <li>Ince: {result.aday2}</li>
        <li>Kilicdaroglu: {result.aday3}</li>
        <li>Ogan: {result.aday4}</li>
      </ul>
      <div>
        {result.il_adi + ', ' + result.ilce_adi + ', ' + result.muhtarlik_adi }
      </div>
    </div>
  );
};
