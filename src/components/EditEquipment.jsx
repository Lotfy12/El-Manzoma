import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";

const EditEquipment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [equipment, setEquipment] = useState({
    name: "",
    use: "",
    number: "",
    Platoon: "",
    company: "",
    Technical_condition: "",
  });

  useEffect(() => {
    const fetchEquipmentDetails = async () => {
      const { data, error } = await supabase
        .from("equipment")
        .select("*")
        .eq("id", id)
        .single();

      if (data) setEquipment(data);
      if (error) console.error("Error fetching equipment details", error);
    };

    fetchEquipmentDetails();
  }, [id]);

  const handleChange = (e) => {
    setEquipment({ ...equipment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from("equipment")
      .update(equipment)
      .eq("id", id);

    if (error) {
      alert("خطأ أثناء تحديث المعدة");
    } else {
      alert("تم تعديل المعدة بنجاح");
      navigate(`/equipments/${id}`);
    }
  };

  return (
    <div className="edit-container">
      <h1>تعديل بيانات المعدة</h1>
      <form onSubmit={handleSubmit}>
        <label>
          الاسم:
          <input
            type="text"
            name="name"
            value={equipment.name}
            onChange={handleChange}
          />
        </label>
        <label>
          الاستخدام:
          <input
            type="text"
            name="use"
            value={equipment.use}
            onChange={handleChange}
          />
        </label>
        <label>
          الرقم:
          <input
            type="text"
            name="number"
            value={equipment.number}
            onChange={handleChange}
          />
        </label>
        <label>
          الفصيلة:
          <input
            type="text"
            name="Platoon"
            value={equipment.Platoon}
            onChange={handleChange}
          />
        </label>
        <label>
          الشركة:
          <input
            type="text"
            name="company"
            value={equipment.company}
            onChange={handleChange}
          />
        </label>
        <label>
          الحالة الفنية:
          <input
            type="text"
            name="Technical_condition"
            value={equipment.Technical_condition}
            onChange={handleChange}
          />
        </label>
        <button type="submit">تحديث</button>
      </form>
    </div>
  );
};

export default EditEquipment;
