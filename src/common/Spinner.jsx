import { BarLoader } from "react-spinners";

function Spinner() {
  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "15px auto" }}>
      <BarLoader color="#2c3e50" height={6} width={250} />
    </div>
  );
}

export default Spinner;
