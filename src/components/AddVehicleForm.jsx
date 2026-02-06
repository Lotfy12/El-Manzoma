import { useState } from "react";
import { supabase } from "../supabaseClient";

const AddVehicleForm = ({ onVehicleAdded }) => {
  const [newVehicle, setNewVehicle] = useState({
    name: "",
    number: "",
    type_of_engine: "",
    date_of_factory: "",
    entering_to_center: "",
    using: "",
    batteries: "",
    size_of_veichles: "",
    work_or_not: false,
    reason_of_not_working: "",
    fuel_capacity: "",
    image: null,
  });

  const handleFileUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewVehicle({ ...newVehicle, [field]: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddVehicle = async () => {
    const { data, error } = await supabase.from("vehicles").insert([newVehicle]);
    if (error) {
      alert("خطأ أثناء إضافة المركبة");
    } else {
      onVehicleAdded(data[0]);
      resetForm();
    }
  };

  const resetForm = () => {
    setNewVehicle({
      name: "",
      number: "",
      type_of_engine: "",
      date_of_factory: "",
      entering_to_center: "",
      using: "",
      batteries: "",
      size_of_veichles: "",
      work_or_not: false,
      reason_of_not_working: "",
      fuel_capacity: "",
      image: null,
    });
  };

  return (
    <div style={{ marginTop: "10px" }} className="add-items">
      <h3>إضافة مركبة جديدة</h3>
      <input
        type="text"
        placeholder="اسم المركبة"
        value={newVehicle.name}
        onChange={(e) => setNewVehicle({ ...newVehicle, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="رقم المركبة"
        value={newVehicle.number}
        onChange={(e) => setNewVehicle({ ...newVehicle, number: e.target.value })}
      />
      <input
        type="text"
        placeholder="نوع المحرك"
        value={newVehicle.type_of_engine}
        onChange={(e) => setNewVehicle({ ...newVehicle, type_of_engine: e.target.value })}
      />
      <label>
        تاريخ الصنع
        <input
          type="date"
          value={newVehicle.date_of_factory}
          onChange={(e) =>
            setNewVehicle({ ...newVehicle, date_of_factory: e.target.value })
          }
        />
      </label>

      <label>
        صورة المركبة:
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileUpload(e, "image")}
        />
      </label>

      <button onClick={handleAddVehicle}>إضافة</button>
    </div>
  );
};

export default AddVehicleForm;
