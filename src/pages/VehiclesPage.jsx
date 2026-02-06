import GetVehicles from "../components/GetVehicles";
import usePageBackground from "../common/usePageBackground";

function VehiclesPage() {
  usePageBackground();

  return (
    <div>
      <h1 className="heading">صفحة المركبات</h1>
      <GetVehicles />
    </div>
  );
}
export default VehiclesPage;
