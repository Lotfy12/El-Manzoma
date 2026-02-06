import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import Spinner from "../common/Spinner";

const EditVehicle = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState({
    name: "",
    using: "",
    type_of_engine: "",
    size_of_vehicles: "",
    batteries: "",
    fuel_capacity: "",
    entering_to_center: "",
    date_of_factory: "",
    work_or_not: false,
    reason_of_not_working: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicle = async () => {
      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .eq("id", id)
        .single();

      if (data) setVehicle(data);
      if (error) console.error("Error fetching vehicle:", error);

      setLoading(false);
    };

    fetchVehicle();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setVehicle({
      ...vehicle,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleUpdate = async () => {
    const { error } = await supabase
      .from("vehicles")
      .update(vehicle)
      .eq("id", id);
    if (error) {
      alert("خطأ أثناء تحديث البيانات");
    } else {
      navigate(`/vehicles/${id}`);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="edit-container">
      <h1>تعديل تفاصيل المركبة</h1>

      <label>
        الاسم:
        <input
          type="text"
          name="name"
          value={vehicle.name}
          onChange={handleInputChange}
        />
      </label>

      <label>
        الاستخدام:
        <input
          type="text"
          name="using"
          value={vehicle.using}
          onChange={handleInputChange}
        />
      </label>

      <label>
        نوع المحرك:
        <input
          type="text"
          name="type_of_engine"
          value={vehicle.type_of_engine}
          onChange={handleInputChange}
        />
      </label>

      <label>
        البطاريات:
        <input
          type="text"
          name="batteries"
          value={vehicle.batteries}
          onChange={handleInputChange}
        />
      </label>

      <label>
        سعة الوقود:
        <input
          type="text"
          name="fuel_capacity"
          value={vehicle.fuel_capacity}
          onChange={handleInputChange}
        />
      </label>

      <label>
        تعمل أو لا تعمل:
        <input
          type="checkbox"
          name="work_or_not"
          checked={vehicle.work_or_not}
          onChange={handleInputChange}
        />
      </label>

      {!vehicle.work_or_not && (
        <label>
          سبب عدم العمل:
          <input
            type="text"
            name="reason_of_not_working"
            value={vehicle.reason_of_not_working}
            onChange={handleInputChange}
          />
        </label>
      )}

      <button onClick={handleUpdate}>تحديث</button>
    </div>
  );
};

export default EditVehicle;
