import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { supabase } from "../supabaseClient";
import "../common/itemDetails.css";
import Spinner from "../common/Spinner";

const FaxDetails = () => {
  const { id } = useParams();
  const [fax, setFax] = useState(null);
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

  const handleDeleteFax = async () => {
    const confirmDelete = window.confirm("هل أنت متأكد من حذف هذا الفاكس؟");
    if (confirmDelete) {
      const { error } = await supabase.from("Fax").delete().eq("id", id);
      if (error) {
        alert("حدث خطأ أثناء حذف الفاكس.");
      } else {
        navigate("/faxes"); // إعادة التوجيه إلى صفحة قائمة الفاكسات
      }
    }
  };

  if (loading) {
    return (
        <Spinner />
    );
  }

  return (
    <div className="details-container button-85">
      <h1 className="details-title"> تفاصيل الفاكس </h1>
      {fax ? (
        <div className="details-content">
          <p className="detail">
            <strong className="detail-label">الموضوع :</strong> {fax.name}
          </p>
          <p className="detail">
            <strong className="detail-label">رقم :</strong> {fax.number}
          </p>
          <p className="detail">
            <strong className="detail-label">من :</strong> {fax.from}
          </p>
          <p className="detail">
            <strong className="detail-label">ال~ي :</strong> {fax.to}
          </p>
          <p className="detail">
            <strong className="detail-label">المحتوي :</strong> {fax.content}
          </p>
          <p className="detail">
            <strong className="detail-label">الفاكس المستلم :</strong>
            <img src={fax.photo_received} alt="Received" className="photo" />
          </p>
          <p className="detail">
            <strong className="detail-label">رد الفاكس :</strong>
            <img src={fax.photo_sent} alt="Sent" className="photo" />
          </p>
          <p className="detail">
            <strong className="detail-label">مهم :</strong>
            {fax.important ? "🔵" : "-"}
          </p>
          <p className="detail">
            <strong className="detail-label">التاريخ :</strong> {fax.created_at}
          </p>

          <div className="actions">
            <button
              onClick={() => navigate(`/edit-fax/${id}`)}
              className="button-85"
            >
              🔧
            </button>

            <button onClick={handleDeleteFax} className="button-85">
              ❌
            </button>
          </div>
        </div>
      ) : (
        <p className="not-found">Fax not found!</p>
      )}
    </div>
  );
};

export default FaxDetails;
