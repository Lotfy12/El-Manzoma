import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import Spinner from "../common/Spinner";

const EditFax = () => {
  const { id } = useParams();
  const [fax, setFax] = useState({
    name: "",
    number: "",
    from: "",
    to: "",
    content: "",
    important: false,
    created_at: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFaxDetails = async () => {
      const { data, error } = await supabase
        .from("Fax")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching fax details:", error);
      } else {
        setFax(data);
      }
      setLoading(false);
    };

    fetchFaxDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, content, checked } = e.target;
    setFax({
      ...fax,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleUpdateFax = async () => {
    const { error } = await supabase.from("Fax").update(fax).eq("id", id);
    if (error) {
      alert("حدث خطأ أثناء تحديث بيانات الفاكس.");
    } else {
      navigate(`/faxes/${id}`);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="edit-container">
      <h1>تعديل بيانات الفاكس</h1>

      <label>
        الموضوع:
        <input
          type="text"
          name="name"
          value={fax.name}
          onChange={handleInputChange}
        />
      </label>

      <label>
        الرقم:
        <input
          type="text"
          name="number"
          value={fax.number}
          onChange={handleInputChange}
        />
      </label>

      <label>
        من:
        <input
          type="text"
          name="from"
          value={fax.from}
          onChange={handleInputChange}
        />
      </label>

      <label>
        إلى:
        <input
          type="text"
          name="to"
          value={fax.to}
          onChange={handleInputChange}
        />
      </label>
      <label>
        المحتوي:
      <textarea
        name="content"
        rows={5}
        cols={50}
        value={fax.content}
        onChange={handleInputChange}
      />
      </label>

      <label>
        مهم:
        <input
          type="checkbox"
          name="important"
          checked={fax.important}
          onChange={handleInputChange}
        />
      </label>

      <button onClick={handleUpdateFax}>تحديث الفاكس</button>
    </div>
  );
};

export default EditFax;
