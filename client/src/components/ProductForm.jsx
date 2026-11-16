// The form for Add and Edit Clock and the page decides what happens on submit
import { useState } from "react";
import form from "../styles/Form.module.css";

const CATEGORIES = ["wall", "mantel", "alarm", "floor", "desk", "watch", "hourglass"];

const EMPTY = { name: "", description: "", category: "wall", price: "", stock: "" };

export default function ProductForm({ initial = EMPTY, submitLabel, onSubmit, requireImage }) {
  const [values, setValues] = useState(initial);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(initial.image || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // One handler for each text box and the select
  const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });

  // Image Selected -> keep the file and display it right away
  const handleFile = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // JSON is unable to carry files so send multipart form data
    const formData = new FormData();
    ["name", "description", "category", "price", "stock"].forEach((key) => formData.append(key, values[key]));
    // Required to be an image and the server reads req.files.image
    if (file) formData.append("image", file);

    setSaving(true);
    try {
      await onSubmit(formData);
    } catch (err) {
      // Server ApiError message such as Bad Request -> Price must be a number
      setError(err.response?.data || "Could Not Save, Please Try Again");
      setSaving(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className={form.form}>
      {/* Name Field */}
      <label className={form.field}>
        Name
        <input className={form.input} name="name" value={values.name} onChange={handleChange} required minLength={3} />
      </label>
      {/* Description Field */}
      <label className={form.field}>
        Description
        <textarea
          className={form.input}
          name="description"
          rows={4}
          value={values.description}
          onChange={handleChange}
          required
        />
      </label>
      {/* Category Field */}
      <label className={form.field}>
        Category
        <select className={form.input} name="category" value={values.category} onChange={handleChange}>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </label>

      {/* Price Field */}
      <label className={form.field}>
        Price ($)
        <input
          className={form.input}
          name="price"
          type="number"
          step="0.01"
          min="0"
          value={values.price}
          onChange={handleChange}
          required
        />
      </label>
      {/* Stock Field */}
      <label className={form.field}>
        Stock
        <input
          className={form.input}
          name="stock"
          type="number"
          step="1"
          min="0"
          value={values.stock}
          onChange={handleChange}
          required
        />
      </label>
      {/*  Image Upload*/}
      <label className={form.field}>
        Image (PNG, JPG ir Webp Up To 5MB)
        <input type="file" accept=".png,.jpg,.jpeg,.webp" onChange={handleFile} required={requireImage && !file} />
      </label>
      {preview && <img src={preview} alt="" width={160} />}

      {error && (
        <p className={form.error} role="alert">
          {error}
        </p>
      )}

      <button className={form.button} disabled={saving}>
        {saving ? "Saving" : submitLabel}
      </button>
    </form>
  );
}
