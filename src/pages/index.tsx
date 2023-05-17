import { NextPage } from "next";
import Head from "next/head";
import { useBallotData } from "../api";
import styles from "../styles/Home.module.css";
import { useState } from "react";

const defaultSchoolNo = 55190;

interface IDetails {
  schoolNo: number;
}

export const Details: React.FC<IDetails> = ({ schoolNo }: IDetails) => {
  const { data: ballotBoxes, error } = useBallotData(schoolNo);

  if (error != null) return <div>Error loading ballot images...</div>;
  if (ballotBoxes == null) return <div>Loading...</div>;
  if (!ballotBoxes.length) return <div>No data for this school.</div>;
  const boxIds = ballotBoxes.map((box) => box.ballot_box_number);

  return (
    <div>
      <h3>{ballotBoxes[0].school_name}</h3>
      <BallotBoxSelector boxIds={boxIds}>
        {(ballotBoxIndex: number) => {
          const selectedBox = ballotBoxes[ballotBoxIndex];
          return (
            <div>
              <h4>OyVeÖtesi verisi:</h4>
              <ul>
                <li>Erdogan: {selectedBox.cm_result?.votes[1]}</li>
                <li>Ince: {selectedBox.cm_result?.votes[2]}</li>
                <li>Kilicdaroglu: {selectedBox.cm_result?.votes[3]}</li>
                <li>Ogan: {selectedBox.cm_result?.votes[4]}</li>
              </ul>
              <img
                src={selectedBox.cm_result?.image_url}
                alt="ballot image"
                width={300}
              />
              <BallotResults
                schoolName={selectedBox.school_name}
                ballotBoxNo={selectedBox.ballot_box_number}
              />
            </div>
          );
        }}
      </BallotBoxSelector>
    </div>
  );
};

const BallotBoxSelector = ({ children, boxIds }) => {
  const [ballotBox, setBallotBox] = useState<number>(0);
  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
        }}
        className={styles.addTodo}
      >
        <label htmlFor="schoolno">Sandık seç</label>
        <select
          name="ballotboxno"
          value={ballotBox}
          onChange={(e) => setBallotBox(Number(e.target.value))}
        >
          {boxIds.map((boxid: number, key: number) => (
            <option key={key} value={key}>
              {boxid} sandık
            </option>
          ))}
        </select>
      </form>
      {children(ballotBox)}
    </>
  );
};

interface IBallotResults {
  schoolName: string, ballotBoxNo: number
}

export const BallotResults: React.FC<IBallotResults> = ({ schoolName, ballotBoxNo }: IBallotResults) => {
  return <h4>YSK verisi:</h4>;
};

const SchoolSelector = ({ school, setSchool }) => {
  const handleChange = (event) => {
    const enteredValue = event.target.value;

    // Maximum number allowed
    const maxNumber = 55194;

    // Remove any non-digit characters
    const numericValue = enteredValue.replace(/\D/g, '');

    // Check if the entered number exceeds the maximum
    if (+numericValue > maxNumber || numericValue === '0') {
      setSchool(numericValue === '0' ? '1' : String(maxNumber));
    } else {
      setSchool(numericValue);
    }
  };
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
      }}
      className={styles.addTodo}
    >
      <label htmlFor="schoolno">Okul numarasi (0-55194)</label>
      <input
        type="text"
        id="schoolno"
        name="schoolno"
        className={styles.input}
        placeholder="Enter a school no"
        value={school}
        onChange={handleChange}
      />
    </form>
  );
};

const Home: NextPage = () => {
  const [school, setSchool] = useState<number>(defaultSchoolNo);
  return (
    <div className={styles.container}>
      <Head>
        <title>Seçim Tutanak Doğrulama - ALPHA</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h2 className={styles.desc}>
          Bu uygulama şu an prototip aşamasındadır.
        </h2>
      </header>

      <main className={styles.main}>
        <SchoolSelector school={school} setSchool={setSchool} />
        <Details schoolNo={school} />
      </main>
      <footer>
        <p>
          <a href="https://github.com/orgs/acikkaynak/discussions/1">
            <small>
              Bu projeyle alakalı bilgiler için GitHubtaki tartışmayı
              inceleyebilirsiniz.
            </small>
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Home;
