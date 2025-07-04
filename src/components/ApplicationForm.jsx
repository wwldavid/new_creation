"use client";
import { useState } from "react";

export default function ApplicationForm({ activityId, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    other: "",
    attachments: [],
    userPw: "",
  });
  const [loading, setLoading] = useState(false);

  async function uploadFile(file) {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload-r2", { method: "POST", body: fd });
    const data = await res.json();
    return data.key;
  }

  async function handleAttach(e) {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    const key = await uploadFile(file);
    setForm((f) => ({ ...f, attachments: [...f.attachments, key] }));
    setLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { activityId, ...form };
      await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      onSuccess?.();
      setForm({
        name: "",
        phone: "",
        email: "",
        other: "",
        attachments: [],
        userPw: "",
      });
    } catch (err) {
      console.error(err);
      alert("报名失败，请重试");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <h3 className="text-lg font-semibold">我要报名</h3>
      {/* 姓名 */}
      <input
        required
        placeholder="姓名"
        className="w-full border px-3 py-2 rounded"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      {/* 电话 */}
      <input
        required
        placeholder="电话"
        className="w-full border px-3 py-2 rounded"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
      {/* 邮箱 */}
      <input
        required
        placeholder="邮箱"
        type="email"
        className="w-full border px-3 py-2 rounded"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      {/* 其它事项 */}
      <textarea
        placeholder="其它事项"
        className="w-full border px-3 py-2 rounded"
        value={form.other}
        onChange={(e) => setForm({ ...form, other: e.target.value })}
      />
      {/* 上传资料 */}
      <div>
        <label className="block mb-1">上传资料（可选）</label>
        <input type="file" onChange={handleAttach} />
        {form.attachments.length > 0 && (
          <ul className="list-disc list-inside mt-1">
            {form.attachments.map((key, i) => (
              <li key={i} className="text-sm text-gray-600">
                {key}
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* 报名密码 */}
      <input
        required
        placeholder="设置报名密码"
        type="password"
        className="w-full border px-3 py-2 rounded"
        value={form.userPw}
        onChange={(e) => setForm({ ...form, userPw: e.target.value })}
      />
      {/* 提交按钮 */}
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        {loading ? "提交中…" : "提交报名"}
      </button>
    </form>
  );
}
