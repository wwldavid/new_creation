"use client";
import { useState, useEffect } from "react";

export default function ActivityCreator({ existing, onSuccess }) {
  const [form, setForm] = useState({
    name: existing?.name || "",
    startAt: existing?.startAt?.slice(0, 16) || "", // "YYYY-MM-DDTHH:mm"
    endAt: existing?.endAt?.slice(0, 16) || "",
    organizer: existing?.organizer || "",
    contact: existing?.contact || "",
    location: existing?.location || "",
    feeType: existing?.feeType || "",
    detail: existing?.detail || "",
    other: existing?.other || "",
    attachments: existing?.attachments || [],
    promoImageFile: null,
    adminPw: "",
  });
  const [loading, setLoading] = useState(false);

  async function uploadFile(file) {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload-r2", {
      method: "POST",
      body: fd,
    });
    const data = await res.json();
    return data.key;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      let promoKey = existing?.promoImage || null;
      if (form.promoImageFile) {
        promoKey = await uploadFile(form.promoImageFile);
      }
      const payload = {
        name: form.name,
        startAt: new Date(form.startAt).toISOString(),
        endAt: new Date(form.endAt).toISOString(),
        organizer: form.organizer,
        contact: form.contact,
        location: form.location,
        feeType: form.feeType,
        detail: form.detail,
        other: form.other,
        attachments: form.attachments,
        promoImageKey: promoKey,
        adminPw: form.adminPw,
        ...(existing && { id: existing.id }),
      };
      const url = "/api/activities";
      const method = existing ? "PATCH" : "POST";
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      onSuccess?.();
    } catch (err) {
      console.error(err);
      alert("提交失败，请重试");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">
        {existing ? "编辑活动" : "创建活动"}
      </h2>
      <input
        required
        placeholder="活动名称"
        className="w-full border px-3 py-2 rounded"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <div className="flex space-x-2">
        <div>
          <label>开始时间</label>
          <input
            type="datetime-local"
            required
            className="border px-3 py-2 rounded"
            value={form.startAt}
            onChange={(e) => setForm({ ...form, startAt: e.target.value })}
          />
        </div>
        <div>
          <label>结束时间</label>
          <input
            type="datetime-local"
            required
            className="border px-3 py-2 rounded"
            value={form.endAt}
            onChange={(e) => setForm({ ...form, endAt: e.target.value })}
          />
        </div>
      </div>
      <input
        required
        placeholder="组织者"
        className="w-full border px-3 py-2 rounded"
        value={form.organizer}
        onChange={(e) => setForm({ ...form, organizer: e.target.value })}
      />
      <input
        required
        placeholder="联系方式"
        className="w-full border px-3 py-2 rounded"
        value={form.contact}
        onChange={(e) => setForm({ ...form, contact: e.target.value })}
      />
      <input
        required
        placeholder="地点"
        className="w-full border px-3 py-2 rounded"
        value={form.location}
        onChange={(e) => setForm({ ...form, location: e.target.value })}
      />
      <input
        required
        placeholder="收费方式"
        className="w-full border px-3 py-2 rounded"
        value={form.feeType}
        onChange={(e) => setForm({ ...form, feeType: e.target.value })}
      />
      <textarea
        placeholder="具体细节介绍"
        className="w-full border px-3 py-2 rounded"
        value={form.detail}
        onChange={(e) => setForm({ ...form, detail: e.target.value })}
      />
      <textarea
        placeholder="其它事项"
        className="w-full border px-3 py-2 rounded"
        value={form.other}
        onChange={(e) => setForm({ ...form, other: e.target.value })}
      />
      <div>
        <label>宣传图片（可选）</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setForm({ ...form, promoImageFile: e.target.files[0] })
          }
        />
      </div>
      <div>
        <label>发起人密码</label>
        <input
          type="password"
          required
          className="w-full border px-3 py-2 rounded"
          value={form.adminPw}
          onChange={(e) => setForm({ ...form, adminPw: e.target.value })}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {loading ? "提交中…" : existing ? "更新活动" : "创建活动"}
      </button>
    </form>
  );
}
