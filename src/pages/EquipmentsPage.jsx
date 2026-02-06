import usePageBackground from "../common/usePageBackground";
import GetEquipments from "../components/GetEquipments";

function EquipmentsPage() {
  usePageBackground();

  return (
    <div>
      <h1 className="heading">صفحة المعدات </h1>
      <GetEquipments />
    </div>
  );
}

export default EquipmentsPage;
