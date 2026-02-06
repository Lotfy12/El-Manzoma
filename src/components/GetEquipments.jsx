import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";

const GetEquipments = () => {
  const [equipments, setEquipments] = useState([]);
  const [filteredEquipments, setFilteredEquipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchNumber, setSearchNumber] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEquipment, setNewEquipment] = useState({
    name: "",
    number: "",
    company: "",
    Platoon: "",
    Technical_condition: "",
    use: "",
  });

  useEffect(() => {
    const fetchEquipments = async () => {
      const { data, error } = await supabase.from("equipment").select("*");
      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setEquipments(data);
        setFilteredEquipments(data);
      }
      setLoading(false);
    };

    fetchEquipments();
  }, []);

  useEffect(() => {
    if (searchNumber === "") {
      setFilteredEquipments(equipments);
    } else {
      const filtered = equipments.filter((equipment) =>
        equipment.number.toString().includes(searchNumber.trim())
      );
      setFilteredEquipments(filtered);
    }
  }, [searchNumber, equipments]);

  const handleAddEquipment = async () => {
    const { name, number, company, Platoon, Technical_condition, use } =
      newEquipment;

    if (
      !name ||
      !number ||
      !company ||
      !Platoon ||
      !Technical_condition ||
      !use
    ) {
      alert("يرجى ملء جميع الحقول");
      return;
    }

    const { data, error } = await supabase
      .from("equipment")
      .insert([newEquipment]);
    if (error) {
      alert("خطأ أثناء إضافة المعدة");
    } else {
      setEquipments([...equipments, data[0]]);
      setNewEquipment({
        name: "",
        number: "",
        company: "",
        Platoon: "",
        Technical_condition: "",
        use: "",
      });
      setShowAddForm(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="search-input">
        <input
          type="text"
          placeholder="البحث عن المعدة"
          value={searchNumber}
          onChange={(e) => setSearchNumber(e.target.value)}
        />
      </div>

      <button
        className="button-85"
        style={{ color: "#2980b9", fontSize: "18px" }}
        onClick={() => setShowAddForm(!showAddForm)}
      >
        {showAddForm ? "إغلاق النموذج" : "إضافة معدة جديدة"}
      </button>

      {showAddForm && (
        <div style={{ marginTop: "10px" }} className="add-items">
          <h3>إضافة معدة جديدة</h3>
          <input
            type="text"
            placeholder="اسم المعدة"
            value={newEquipment.name}
            onChange={(e) =>
              setNewEquipment({ ...newEquipment, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="رقم المعدة"
            value={newEquipment.number}
            onChange={(e) =>
              setNewEquipment({ ...newEquipment, number: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="الشركة المصنعة"
            value={newEquipment.company}
            onChange={(e) =>
              setNewEquipment({ ...newEquipment, company: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="الفصيلة"
            value={newEquipment.Platoon}
            onChange={(e) =>
              setNewEquipment({ ...newEquipment, Platoon: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="الحالة الفنية"
            value={newEquipment.Technical_condition}
            onChange={(e) =>
              setNewEquipment({
                ...newEquipment,
                Technical_condition: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="الاستخدام"
            value={newEquipment.use}
            onChange={(e) =>
              setNewEquipment({ ...newEquipment, use: e.target.value })
            }
          />
          <button onClick={handleAddEquipment}>إضافة</button>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th className="col-remove">ID</th>
            <th>اسم</th>
            <th>رقم</th>
            <th>إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {filteredEquipments.map((equipment, index) => (
            <tr key={index}>
              <td className="col-remove">{equipment.id}</td>
              <td>{equipment.name}</td>
              <td>{equipment.number}</td>
              <td>
                <Link to={`/equipments/${equipment.id}`}>
                  <button className="details-button">عرض التفاصيل</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetEquipments;
