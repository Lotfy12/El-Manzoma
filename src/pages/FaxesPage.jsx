import usePageBackground from "../common/usePageBackground";
import GetFaxes from "../components/GetFaxes";
// import FakeFaxes from "../components/fakeFaxes"
function FaxesPage() {
  usePageBackground();
  return (
    <div>
      <h1 className="heading ">صفحة الفاكسات</h1>
      <GetFaxes />

      {/* <FakeFaxes/> */}
    </div>
  );
}

export default FaxesPage;
