import "../common/itemDetails.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import Spinner from "../common/Spinner";

const VehicleDetails = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        console.error("Error fetching vehicle details:", error);
      } else {
        setVehicle(data);
      }
      setLoading(false);
    };

    fetchVehicleDetails();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("هل أنت متأكد من حذف هذة المركبة ؟");
    if (confirmDelete) {
      const { error } = await supabase.from("vehicles").delete().eq("id", id);
      if (error) {
        alert("خطأ أثناء حذف المركبة");
      } else {
        navigate("/vehicles"); 
      }
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="details-container button-85">
      <h1 className="details-title">تفاصيل المركبة</h1>
      {vehicle ? (
        <div>
          <div className="detail">
            <span className="detail-label">الاسم :</span> {vehicle.name}
          </div>
          <div className="detail">
            <span className="detail-label">الاستخدام :</span>
            {vehicle.using}
          </div>
          <div className="detail">
            <span className="detail-label">نوع المحرك :</span>
            {vehicle.type_of_engine}
          </div>
          <div className="detail">
            <span className="detail-label">عدد الركاب :</span>
            {vehicle.size_of_vehicle}
          </div>
          <div className="detail">
            <span className="detail-label">البطاريات :</span>{" "}
            {vehicle.batteries}
          </div>
          <div className="detail">
            <span className="detail-label">سعة الوقود :</span>
            {vehicle.fuel_capacity}
          </div>
          <div className="detail">
            <span className="detail-label">الوصف :</span>
            {vehicle.description}
          </div>
          <div className="detail">
            <span className="detail-label">صورة :</span>
            <img src={vehicle.image} alt={vehicle.name} className="photo" />
          </div>
          <div className="detail">
            <span className="detail-label">تاريخ الدخول للمركز :</span>
            {vehicle.entering_to_center}
          </div>
          <div className="detail">
            <span className="detail-label">تاريخ التصنيع :</span>
            {vehicle.date_of_factory}
          </div>
          <div className="detail">
            <span className="detail-label">تعمل أو لا تعمل مع ذكر السبب :</span>
            {vehicle.work_or_not ? "🔵" : vehicle.reason_of_not_working}
          </div>

          <div className="actions">
            <button
              className=" button-85"
              onClick={() => navigate(`/vehicles/edit/${id}`)}
            >
             🔧 
            </button>
            <button className=" button-85" onClick={handleDelete}>
              ❌
            </button>
          </div>
        </div>
      ) : (
        <p className="not-found">Vehicle not found!</p>
      )}
    </div>
  );
};

export default VehicleDetails;
