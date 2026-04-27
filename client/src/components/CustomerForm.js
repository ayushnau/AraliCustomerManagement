import { useState, useRef } from "react";
import { API } from "../utils/helpers";

export default function CustomerForm({ onAdded }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const nameRef = useRef(null);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (!form.phone.trim()) e.phone = "Phone is required";
    else if (!/^\d{10}$/.test(form.phone.replace(/\s/g, "")))
      e.phone = "Enter a valid 10-digit number";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const payload = {
      ...form,
      phone: "+91 " + form.phone.replace(/\s/g, ""),
    };
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setForm({ name: "", email: "", phone: "" });
      setErrors({});
      nameRef.current?.focus();
      onAdded();
    } else {
      const data = await res.json();
      setErrors({ form: data.error || "Failed to add customer" });
    }
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  const inputCls = (field) =>
    `w-full h-[38px] px-3 border rounded-md bg-input-bg text-[13.5px] text-text font-sans outline-none transition-all duration-150 placeholder:text-text-3 focus:border-accent focus:shadow-[0_0_0_3px_var(--accent-light)] ${
      errors[field] ? "border-danger" : "border-input-border"
    }`;

  return (
    <form className="bg-surface border border-border rounded-[10px] p-6" noValidate onSubmit={handleSubmit}>
      <div className="mb-5">
        <h2 className="text-base font-semibold text-text">Add customer</h2>
      </div>

      <div className="mb-1">
        <label htmlFor="f-name" className="block text-[13px] font-medium text-text mb-1.5">Name</label>
        <input
          ref={nameRef}
          id="f-name"
          type="text"
          name="name"
          autoComplete="off"
          placeholder="Enter the Name..."
          value={form.name}
          onChange={handleChange}
          aria-invalid={!!errors.name}
          className={inputCls("name")}
        />
        <div className="text-xs text-danger min-h-[18px] leading-[18px]">{errors.name || "\u00A0"}</div>
      </div>

      <div className="mb-1">
        <label htmlFor="f-email" className="block text-[13px] font-medium text-text mb-1.5">Email</label>
        <input
          id="f-email"
          type="email"
          name="email"
          autoComplete="off"
          placeholder="Enter the Email..."
          value={form.email}
          onChange={handleChange}
          aria-invalid={!!errors.email}
          className={inputCls("email")}
        />
        <div className="text-xs text-danger min-h-[18px] leading-[18px]">{errors.email || "\u00A0"}</div>
      </div>

      <div className="mb-1">
        <label htmlFor="f-phone" className="block text-[13px] font-medium text-text mb-1.5">Phone</label>
        <input
          id="f-phone"
          type="tel"
          name="phone"
          autoComplete="off"
          placeholder="98765 43210"
          value={form.phone}
          onChange={handleChange}
          aria-invalid={!!errors.phone}
          className={inputCls("phone")}
        />
        <div className="text-xs text-danger min-h-[18px] leading-[18px]">{errors.phone || "\u00A0"}</div>
      </div>

      {errors.form && <div className="text-xs text-danger mb-2">{errors.form}</div>}

      <button
        type="submit"
        className="w-full h-10 bg-accent text-accent-text rounded-md text-sm font-medium border-none cursor-pointer font-sans transition-colors duration-150 hover:bg-accent-hover active:scale-[0.98]"
      >
        Add customer
      </button>

      <div className="mt-4 text-center">
        <div className="flex items-center justify-center gap-1.5">
          <span className="inline-block px-[7px] py-px text-[11px] font-mono bg-kbd-bg border border-kbd-border rounded text-text-2">Tab</span>
          <span className="text-xs text-text-3">to move</span>
          <span className="inline-block px-[7px] py-px text-[11px] font-mono bg-kbd-bg border border-kbd-border rounded text-text-2">Enter</span>
          <span className="text-xs text-text-3">to submit</span>
        </div>
      </div>
    </form>
  );
}
