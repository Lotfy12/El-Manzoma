
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";
import AddFaxForm from "./AddFaxForm";

const GetFaxes = () => {
  const [faxes, setFaxes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [monthYearFilter, setMonthYearFilter] = useState("");
  const [fullDateFilter, setFullDateFilter] = useState("");
  const [currentMonthOnly, setCurrentMonthOnly] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const fetchFaxes = async () => {
      const { data, error } = await supabase.from("Fax").select("*");
      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setFaxes(data);
      }
      setLoading(false);
    };
    fetchFaxes();
  }, []);

  const handleAddFax = async (fax) => {
    const { data, error } = await supabase.from("Fax").insert([fax]);
    if (error) {
      alert("خطأ أثناء إضافة الفاكس");
    } else {
      setFaxes([...faxes, data[0]]);
    }
  };

  const filterFaxes = () => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    return faxes.filter((fax) => {
      const matchesNumber = searchTerm
        ? fax.number && fax.number.toString().includes(searchTerm)
        : true;
      const matchesMonthYear = monthYearFilter
        ? fax.created_at && fax.created_at.slice(0, 7) === monthYearFilter
        : true;
      const matchesFullDate = fullDateFilter
        ? fax.created_at && fax.created_at.slice(0, 10) === fullDateFilter
        : true;
      const matchesCurrentMonth = currentMonthOnly
        ? fax.created_at && fax.created_at.slice(0, 7) === currentMonth
        : true;

      return (
        matchesNumber &&
        matchesMonthYear &&
        matchesFullDate &&
        matchesCurrentMonth
      );
    });
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <button
        className="button-85"
        style={{ color: "#2980b9", fontSize: "18px", marginBottom: "10px" }}
        onClick={() => setShowAddForm(!showAddForm)}
      >
        {showAddForm ? "إغلاق النموذج" : "إضافة فاكس جديد"}
      </button>

      {showAddForm && (
        <AddFaxForm
          onAddFax={handleAddFax}
          onClose={() => setShowAddForm(false)}
        />
      )}

      <div>
        <input
          type="text"
          placeholder="بحث برقم الفاكس"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <input
          type="month"
          placeholder="بحث بالشهر والسنة"
          value={monthYearFilter}
          onChange={(e) => setMonthYearFilter(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <input
          type="date"
          placeholder="بحث بالتاريخ الكامل"
          value={fullDateFilter}
          onChange={(e) => setFullDateFilter(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <label>
          <input
            type="checkbox"
            checked={currentMonthOnly}
            onChange={() => setCurrentMonthOnly(!currentMonthOnly)}
          />
          عرض الفاكسات لهذا الشهر فقط
        </label>
      </div>

      <table>
        <thead>
          <tr>
            <th className="col-remove">ID</th>
            <th>الموضوع</th>
            <th>رقم</th>
            <th className="col-remove">من</th>
            <th className="col-remove">إلى</th>
            <th className="col-remove">هام</th>
            <th>إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {filterFaxes().map((fax) => (
            <tr key={fax.id}>
              <td className="col-remove">{fax.id}</td>
              <td>{fax.name}</td>
              <td>{fax.number}</td>
              <td className="col-remove">{fax.from}</td>
              <td className="col-remove">{fax.to}</td>
              <td className="col-remove">{fax.important ? "🔵" : " - "}</td>
              <td>
                <Link to={`/faxes/${fax.id}`}>
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

export default GetFaxes;
