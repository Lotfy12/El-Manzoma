import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import EquipmentDetails from "./components/EquipmentDetails";
import EditVehicle from "./components/EditVehicle";
import EditFax from "./components/EditFax";
import EditEquipment from "./components/EditEquipment";
import EquipmentsPage from "./pages/equipmentsPage";
import NavBar from "./common/navBar";
import VehiclesPage from "./pages/vehiclesPage";
import FaxesPage from "./pages/faxesPage";
import VehicleDetails from "./components/VehicleDetails";
import Footer from "./components/Footer";
import About from "./pages/AboutPage";
import FaxDetails from "./components/FaxDetails";

const App = () => {
  return (
    <BrowserRouter>
      <>
        <NavBar />
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/equipments" element={<EquipmentsPage />} />
          <Route path="/equipments/:id" element={<EquipmentDetails />} />
          <Route path="/equipments/edit/:id" element={<EditEquipment />} />

          <Route path="/vehicles" element={<VehiclesPage />} />
          <Route path="/vehicles/:id" element={<VehicleDetails />} />
          <Route path="/vehicles/edit/:id" element={<EditVehicle />} />

          <Route path="/faxes" element={<FaxesPage />} />
          <Route path="/faxes/:id" element={<FaxDetails />} />
          <Route path="/edit-fax/:id" element={<EditFax />} />
        </Routes>
        <Footer />
      </>
    </BrowserRouter>
  );
};

export default App;
