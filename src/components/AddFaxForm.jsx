import { useState } from "react";

const AddFaxForm = ({ onAddFax }) => {
  const [newFax, setNewFax] = useState({
    name: "",
    number: "",
    from: "",
    to: "",
    content:"",
    photo_received: null,
    photo_sent: null,
    important: false,
  });

  const handleFileUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result;
        setNewFax({ ...newFax, [field]: base64Image });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    onAddFax(newFax);
    setNewFax({
      name: "",
      number: "",
      from: "",
      to: "",
      content: "",
      photo_received: null,
      photo_sent: null,
      important: false,
    });
  };

  return (
    <div className="add-items">
      <h2>إضافة فاكس جديد</h2>
      <input
        type="text"
        placeholder="موضوع الفاكس"
        value={newFax.name}
        onChange={(e) => setNewFax({ ...newFax, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="رقم الفاكس"
        value={newFax.number}
        onChange={(e) => setNewFax({ ...newFax, number: e.target.value })}
      />
      <input
        type="text"
        placeholder="المرسل"
        value={newFax.from}
        onChange={(e) => setNewFax({ ...newFax, from: e.target.value })}
      />
      <input
        type="text"
        placeholder="المستلم"
        value={newFax.to}
        onChange={(e) => setNewFax({ ...newFax, to: e.target.value })}
      />
     <textarea
    placeholder="المحتوى"
    value={newFax.content}
    onChange={(e) => setNewFax({ ...newFax, content: e.target.value })}
    rows={5}
    cols={50}
    style={{
      borderRadius: "8px",
      border: "1px solid #ccc",
    }}
  ></textarea>

      <label>
        صورة الاستلام:
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileUpload(e, "photo_received")}
        />
      </label>
      {newFax.photo_received && (
        <img
          src={newFax.photo_received}
          alt="استلام"
          style={{ maxWidth: "100px" }}
        />
      )}

      <label>
        صورة الإرسال:
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileUpload(e, "photo_sent")}
        />
      </label>
      {newFax.photo_sent && (
        <img
          src={newFax.photo_sent}
          alt="إرسال"
          style={{ maxWidth: "100px" }}
        />
      )}

      <label>
        هام؟
        <input
          type="checkbox"
          checked={newFax.important}
          onChange={(e) =>
            setNewFax({ ...newFax, important: e.target.checked })
          }
        />
      </label>
      <button onClick={handleSubmit}>إضافة</button>
    </div>
  );
};

export default AddFaxForm;
