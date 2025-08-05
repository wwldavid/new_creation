"use client";
import { useEffect, useState, useCallback } from "react";
import ApplicationTable from "./ApplicationTable";

export default function ApplicationForm({ lang, activityId, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    other: "",
    attachments: [],
    userPw: "",
  });
  const [loading, setLoading] = useState(false);
  const [submittedList, setSubmittedList] = useState([]);

  const fetchApplications = useCallback(async () => {
    if (!activityId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/applications?activityId=${activityId}`);
      const data = await res.json();
      setSubmittedList(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [activityId]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

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
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const newApp = await res.json();
      setSubmittedList((list) => [newApp, ...list]);
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
    <div>
      {submittedList.length > 0 && (
        <div className=" rounded p-4 bg-white/50 shadow">
          <h4 className="text-md font-semibold mb-4">
            {lang === "zh"
              ? "已提交的报名记录"
              : "Submitted Registration Records"}
            :
          </h4>
          <ApplicationTable
            lang={lang}
            data={submittedList}
            activityId={activityId}
            refetch={fetchApplications}
          />
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-4 mt-6 bg-white/50 shadow p-4"
      >
        <h3 className="text-lg font-semibold">
          {lang === "zh" ? "我要报名" : "I'd like to sign up"}
        </h3>
        {/* 姓名 */}
        <input
          required
          placeholder={lang === "zh" ? "姓名" : "Name"}
          className="w-80 border px-3 py-2 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <br />
        {/* 电话 */}
        <input
          required
          placeholder={lang === "zh" ? "电话" : "Phone number"}
          className="w-80 border px-3 py-2 rounded"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <br />
        {/* 邮箱 */}
        <input
          required
          placeholder={lang === "zh" ? "邮箱" : "Email"}
          type="email"
          className="w-80 border px-3 py-2 rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        {/* 其它事项 */}
        <textarea
          placeholder={lang === "zh" ? "其它事项" : "Others"}
          className="w-full border px-3 py-2 rounded"
          value={form.other}
          onChange={(e) => setForm({ ...form, other: e.target.value })}
        />
        {/* 上传资料 */}
        <div>
          <label className="block mb-1">
            {lang === "zh" ? "上传资料（可选）" : "Submit Files (optional)"}
          </label>
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
          placeholder={
            lang === "zh"
              ? "设置个人报名密码"
              : "Set your personal registration password"
          }
          type="password"
          className="w-80 border px-3 py-2 rounded"
          value={form.userPw}
          onChange={(e) => setForm({ ...form, userPw: e.target.value })}
        />
        <br />
        {/* 提交按钮 */}
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-[#2ca9e1] hover:bg-[#165e83] text-white rounded"
        >
          {loading
            ? lang === "zh"
              ? "提交中…"
              : "Submitting…"
            : lang === "zh"
            ? "提交报名"
            : "Submit Registration"}
        </button>
      </form>
    </div>
  );
}
