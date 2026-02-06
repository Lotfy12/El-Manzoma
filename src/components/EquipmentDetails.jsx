import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import Spinner from "../common/Spinner";
import "../common/itemDetails.css";

const EquipmentDetails = () => {
  const { id } = useParams();
  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEquipment = async () => {
      const { data, error } = await supabase
        .from("equipment")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        console.error("Error fetching equipment details:", error);
      } else {
        setEquipment(data);
      }
      setLoading(false);
    };

    fetchEquipment();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("هل أنت متأكد من حذف هذة المعدة ؟");
    if (confirmDelete) {
      const { error } = await supabase.from("equipment").delete().eq("id", id);
      if (error) {
        alert("خطأ أثناء حذف المعدة");
      } else {
        navigate("/equipments");
      }
    }
  };

  const handleEdit = () => {
    navigate(`/equipments/edit/${id}`);
  };

  if (loading) return <Spinner />;

  return (
    <div className="details-container button-85">
      <h1 className="details-title">تفاصيل المعدة</h1>
      {equipment ? (
        <div>
          <div className="detail">
            <span className="detail-label">ID:</span> {equipment.id}
          </div>
          <div className="detail">
            <span className="detail-label">الاسم :</span> {equipment.name}
          </div>
          <div className="detail">
            <span className="detail-label">الاستخدام :</span> {equipment.use}
          </div>
          <div className="detail">
            <span className="detail-label">رقم :</span> {equipment.number}
          </div>
          <div className="detail">
            <span className="detail-label">فصيلة :</span> {equipment.Platoon}
          </div>
          <div className="detail">
            <span className="detail-label">الشركة :</span> {equipment.company}
          </div>
          <div className="detail">
            <span className="detail-label">الحالة الفنية:</span>{" "}
            {equipment.Technical_condition}
          </div>

          <div className="actions">
            
            <button className="button-85" onClick={handleEdit}>
            🔧 
            </button>
            <button className="button-85" onClick={handleDelete}>
            ❌
            </button>
          </div>
        </div>
      ) : (
        <p className="not-found">لم يتم العثور على المعدة.</p>
      )}
    </div>
  );
};

export default EquipmentDetails;
