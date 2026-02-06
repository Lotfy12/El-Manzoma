import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import Spinner from "../common/Spinner";

const GetVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
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

  useEffect(() => {
    const fetchVehicles = async () => {
      const { data, error } = await supabase.from("vehicles").select("*");
      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setVehicles(data);
      }
      setLoading(false);
    };

    fetchVehicles();
  }, []);

  const handleFileUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewVehicle({ ...newVehicle, [field]: reader.result });
      };
      reader.readAsDataURL(file); // تحويل الصورة إلى Base64
    }
  };

  const handleAddVehicle = async () => {
    const { data, error } = await supabase
      .from("vehicles")
      .insert([newVehicle]);
    if (error) {
      alert("خطأ أثناء إضافة المركبة");
    } else {
      setVehicles([...vehicles, data[0]]);
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
      setShowAddForm(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <button
        className="button-85"
        style={{ color: "#2980b9", fontSize: "18px" }}
        onClick={() => setShowAddForm(!showAddForm)}
      >
        {showAddForm ? "إغلاق النموذج" : "إضافة مركبة جديدة"}
      </button>

      {showAddForm && (
        <div style={{ marginTop: "10px" }} className="add-items">
          <h3>إضافة مركبة جديدة</h3>
          <input
            type="text"
            placeholder="اسم المركبة"
            value={newVehicle.name}
            onChange={(e) =>
              setNewVehicle({ ...newVehicle, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="رقم المركبة"
            value={newVehicle.number}
            onChange={(e) =>
              setNewVehicle({ ...newVehicle, number: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="نوع المحرك"
            value={newVehicle.type_of_engine}
            onChange={(e) =>
              setNewVehicle({ ...newVehicle, type_of_engine: e.target.value })
            }
          />

          <label>
            تاريخ الصنع
            <input
              type="date"
              value={newVehicle.date_of_factory}
              onChange={(e) =>
                setNewVehicle({
                  ...newVehicle,
                  date_of_factory: e.target.value,
                })
              }
            />
          </label>

          <label>
            تاريخ الدخول للمركز
            <input
              type="date"
              value={newVehicle.entering_to_center}
              onChange={(e) =>
                setNewVehicle({
                  ...newVehicle,
                  entering_to_center: e.target.value,
                })
              }
            />
          </label>

          <input
            type="text"
            placeholder="الاستخدام"
            value={newVehicle.using}
            onChange={(e) =>
              setNewVehicle({
                ...newVehicle,
                using: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="البطاريات"
            value={newVehicle.batteries}
            onChange={(e) =>
              setNewVehicle({
                ...newVehicle,
                batteries: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="عدد الركاب"
            value={newVehicle.size_of_veichles}
            onChange={(e) =>
              setNewVehicle({
                ...newVehicle,
                size_of_veichles: e.target.value,
              })
            }
          />

          <label>
            تعمل أو لا تعمل
            <input
              type="checkbox"
              checked={newVehicle.work_or_not}
              onChange={(e) =>
                setNewVehicle({
                  ...newVehicle,
                  work_or_not: e.target.checked,
                })
              }
            />
          </label>

          <input
            type="text"
            placeholder="سبب العطل"
            value={newVehicle.reason_of_not_working}
            onChange={(e) =>
              setNewVehicle({
                ...newVehicle,
                reason_of_not_working: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="سعة الوقود"
            value={newVehicle.fuel_capacity}
            onChange={(e) =>
              setNewVehicle({
                ...newVehicle,
                fuel_capacity: e.target.value,
              })
            }
          />

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
      )}

      <table>
        <thead>
          <tr>
            <th className="col-remove">ID</th>
            <th>اسم المركبة</th>
            <th>رقم</th>
            <th className="col-remove">نوع المحرك</th>

            <th>إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id}>
              <td className="col-remove">{vehicle.id}</td>
              <td>{vehicle.name}</td>
              <td style={{ fontWeight: "bold" }}>{vehicle.number}</td>
              <td className="col-remove">{vehicle.type_of_engine}</td>

              <td>
                <Link to={`/vehicles/${vehicle.id}`}>
                  <button>عرض التفاصيل</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetVehicles;
