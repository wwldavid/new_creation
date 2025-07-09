"use client";
import { useState } from "react";

export default function ActivityCreator({
  existing,
  skipAuth = false,
  onSuccess,
}) {
  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
  const initialMode = existing && skipAuth ? "form" : "idle"; // 其它情况保持原逻辑
  const [mode, setMode] = useState(initialMode);

  const [passwordInput, setPasswordInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: existing?.name || "",
    startAt: existing?.startAt?.slice(0, 16) || "",
    endAt: existing?.endAt?.slice(0, 16) || "",
    organizer: existing?.organizer || "",
    contact: existing?.contact || "",
    location: existing?.location || "",
    feeType: existing?.feeType || "",
    detail: existing?.detail || "",
    other: existing?.other || "",
    attachments: existing?.attachments || [],
    promoImageFile: null,
  });

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

  const handleAuth = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      setMode("form");
    } else {
      alert("管理员密码错误");
      setPasswordInput("");
    }
  };

  const resetToIdle = () => {
    setMode("idle");
    setPasswordInput("");
  };

  const handleDelete = async () => {
    if (!confirm("确定删除该活动？此操作无法撤销。")) return;
    setLoading(true);
    try {
      await fetch("/api/activities", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: existing.id,
          adminPw: ADMIN_PASSWORD,
        }),
      });
      onSuccess?.();
      resetToIdle();
    } catch {
      alert("删除失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 上传宣传图
      let promoKey = existing?.promoImage || null;
      if (form.promoImageFile) {
        promoKey = await uploadFile(form.promoImageFile);
      }
      // 处理附件：保留旧 key + 上传新文件
      const oldKeys =
        existing?.attachments?.filter((k) => typeof k === "string") || [];
      const newFiles = form.attachments.filter((f) => f instanceof File);
      const newKeys = newFiles.length
        ? await Promise.all(newFiles.map(uploadFile))
        : [];
      const attachmentKeys = [...oldKeys, ...newKeys];

      const payload = {
        ...(existing && { id: existing.id }),
        name: form.name,
        startAt: new Date(form.startAt).toISOString(),
        endAt: new Date(form.endAt).toISOString(),
        organizer: form.organizer,
        contact: form.contact,
        location: form.location,
        feeType: form.feeType,
        detail: form.detail,
        other: form.other,
        attachments: attachmentKeys,
        promoImageKey: promoKey,
        adminPw: ADMIN_PASSWORD,
      };

      await fetch("/api/activities", {
        method: existing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      onSuccess?.();
      // 重置表单
      setForm({
        name: "",
        startAt: "",
        endAt: "",
        organizer: "",
        contact: "",
        location: "",
        feeType: "",
        detail: "",
        other: "",
        attachments: [],
        promoImageFile: null,
      });
      resetToIdle();
    } catch {
      alert("提交失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  // —— 空闲态：创建 or 编辑+删除 ——
  if (mode === "idle") {
    if (!existing) {
      return (
        <button
          onClick={() => setMode("auth")}
          className="px-2 py-1 bg-[#2ca9e1] hover:bg-[#165e83] text-white rounded"
        >
          开始创建
        </button>
      );
    }

    // 编辑态：传了 existing，但如果 skipAuth，就不渲染按钮
    if (skipAuth) {
      return null;
    }

    return (
      <div className="flex space-x-2">
        <button
          onClick={() => setMode("auth")}
          className="px-3 py-1 bg-green-600 text-white rounded"
        >
          编辑活动
        </button>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="px-3 py-1 bg-red-600 text-white rounded"
        >
          删除活动
        </button>
      </div>
    );
  }

  // —— 验证态 ——
  if (mode === "auth") {
    return (
      <div className="w-96 flex gap-4 items-center">
        <input
          type="password"
          placeholder="请输入管理员密码"
          className="w-full border px-3 py-1 rounded"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
        />
        <div className="w-48 flex gap-4">
          <button
            onClick={handleAuth}
            className=" px-2 py-1 bg-green-600 text-white rounded"
          >
            确认
          </button>
          <button
            onClick={resetToIdle}
            className=" px-2 py-1 bg-gray-400 text-white rounded"
          >
            取消
          </button>
        </div>
      </div>
    );
  }

  // —— 表单态 ——
  return (
    <div className="w-full bg-gray-50 p-4 rounded shadow mt-4">
      <h3 className="text-lg font-semibold mb-4">
        {existing ? "编辑活动详情" : "创建活动"}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 活动名称 */}
        <div>
          <label className="block text-sm font-medium mb-1">活动名称</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required={!existing}
          />
        </div>
        {/* 时间范围 */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">开始时间</label>
            <input
              type="datetime-local"
              className="w-full border px-3 py-2 rounded"
              value={form.startAt}
              onChange={(e) => setForm({ ...form, startAt: e.target.value })}
              required={!existing}
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">结束时间</label>
            <input
              type="datetime-local"
              className="w-full border px-3 py-2 rounded"
              value={form.endAt}
              onChange={(e) => setForm({ ...form, endAt: e.target.value })}
              required={!existing}
            />
          </div>
        </div>
        {/* 组织者 */}
        <div>
          <label className="block text-sm font-medium mb-1">组织者</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={form.organizer}
            onChange={(e) => setForm({ ...form, organizer: e.target.value })}
            required={!existing}
          />
        </div>
        {/* 联系方式 */}
        <div>
          <label className="block text-sm font-medium mb-1">联系方式</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
            required={!existing}
          />
        </div>
        {/* 地点 */}
        <div>
          <label className="block text-sm font-medium mb-1">地点</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            required={!existing}
          />
        </div>
        {/* 收费方式 */}
        <div>
          <label className="block text-sm font-medium mb-1">收费方式</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={form.feeType}
            onChange={(e) => setForm({ ...form, feeType: e.target.value })}
            required={!existing}
          />
        </div>
        {/* 细节 & 其他 */}
        <div>
          <label className="block text-sm font-medium mb-1">具体细节介绍</label>
          <textarea
            className="w-full border px-3 py-2 rounded"
            value={form.detail}
            onChange={(e) => setForm({ ...form, detail: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">其它事项</label>
          <textarea
            className="w-full border px-3 py-2 rounded"
            value={form.other}
            onChange={(e) => setForm({ ...form, other: e.target.value })}
          />
        </div>
        {/* 宣传图 & 附件 */}
        <div>
          <label className="block text-sm font-medium mb-1">
            宣传图片（可选）
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setForm({ ...form, promoImageFile: e.target.files[0] })
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            上传附件（可多选）
          </label>
          <input
            type="file"
            multiple
            onChange={(e) =>
              setForm({ ...form, attachments: Array.from(e.target.files) })
            }
          />
        </div>
        {/* 操作按钮 */}
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={resetToIdle}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {loading
              ? existing
                ? "更新中…"
                : "提交中…"
              : existing
              ? "更新活动"
              : "创建活动"}
          </button>
        </div>
      </form>
    </div>
  );
}
