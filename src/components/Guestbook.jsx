"use client";
import { useState, useEffect } from "react";
export default function Guestbook() {
  const [entries, setEntries] = useState([]);
  const [content, setContent] = useState("");
  const [pw, setPw] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [adminPw, setAdminPw] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState({ id: null, content: "" });
  const [deletePwd, setDeletePwd] = useState("");
  const [deleteError, setDeleteError] = useState("");

  const fetchEntries = async () => {
    const res = await fetch("/api/guestbook");
    setEntries(await res.json());
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleSubmit = async () => {
    const isEdit = Boolean(editingId);
    const method = isEdit ? "PATCH" : "POST";
    const payload = isEdit
      ? { id: editingId, content, password: pw }
      : { content, password: pw };

    const res = await fetch("/api/guestbook", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    console.log(">>> 后端返回：", res.status, await res.json());

    if (isEdit) setEditingId(null);

    setContent("");
    setPw("");
    fetchEntries();
  };

  const handleDelete = async (id) => {
    if (!confirm("确定删除这条留言？")) return;

    const passwd = prompt("请输入这条留言的密码以确认删除：");

    if (!passwd) {
      alert("取消: 必须输入密码才能删除");
      return;
    }

    const res = await fetch("/api/guestbook", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, password: passwd }),
    });
    const data = await res.json();
    if (!res.ok) {
      alert(data.error || "删除失败，请检查密码后重试");
      return;
    }
    alert("删除成功！");
    fetchEntries();
  };

  const clearAll = async () => {
    if (!confirm("管理员: 确定清空所有留言？")) return;
    await fetch("/api/guestbook", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ admin: true, password: adminPw }),
    });
    setAdminPw("");
    fetchEntries();
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      {/*list of notes*/}
      <div className="rounded max-h-80 overflow-y-auto mb-4 space-y-4">
        {entries.length === 0 ? (
          <p className="text-gray-500 text-center">暂无留言</p>
        ) : (
          entries.map((e) => (
            <div key={e.id} className="mb-3 bg-white p-3 w-full">
              <div className="flex justify-between items-center mb-3">
                <small className="text-gray-400 text-sm">
                  {new Date(e.createdAt).toLocaleString()}
                </small>
                <div className="space-x-1">
                  <button
                    className="px-1 bg-[#2ca9e1] hover:bg-[#165e83] text-white text-xs rounded"
                    onClick={() => {
                      setEditingId(e.id);
                      setContent(e.content);
                    }}
                  >
                    编辑
                  </button>
                  <button
                    className="px-1 bg-[#fbd26d] text-white rounded hover:bg-[#ec6800] text-xs"
                    onClick={() => {
                      setDeleteTarget({ id: e.id, content: e.content });
                      setDeletePwd("");
                      setDeleteError("");
                      setShowDeleteModal(true);
                    }}
                  >
                    删除
                  </button>
                </div>
              </div>
              <p className="whitespace-pre-wrap">{e.content}</p>
            </div>
          ))
        )}
      </div>

      {/*input area*/}
      <textarea
        rows={4}
        className="w-full border p-2 rounded mb-2 mt-8"
        placeholder="写下你的留言或故事..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <input
        type="password"
        className="w-full border p-2 rounded mb-2"
        placeholder="设置/输入你的留言密码（编辑/删除时需要）"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
      />
      <button
        className="bg-[#2ca9e1] hover:bg-[#165e83] text-white py-1 px-2 rounded mb-4 w-28"
        onClick={handleSubmit}
        disabled={!content || !pw}
      >
        {editingId ? "更新留言" : "提交留言"}
      </button>

      {/*admin clear all */}
      <div className="border-t mt-8 pt-2">
        <input
          type="password"
          className="w-full border p-2 rounded mb-2"
          placeholder="管理员密码(清空所有留言)"
          value={adminPw}
          onChange={(e) => setAdminPw(e.target.value)}
        />
        <button
          className="bg-[#fbd26d] hover:bg-[#ec6800] text-white py-1 px-2 rounded w-28"
          onClick={clearAll}
          disabled={!adminPw}
        >
          清空所有留言
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-2">确认删除留言</h3>
            <p className="text-gray-700 mb-4 whitespace-pre-wrap">
              “{deleteTarget.content}”
            </p>

            <input
              type="password"
              className="w-full border p-2 rounded mb-2"
              placeholder="请输入留言密码以确认删除"
              value={deletePwd}
              onChange={(e) => setDeletePwd(e.target.value)}
            />
            {deleteError && (
              <p className="text-red-500 text-sm mb-2">{deleteError}</p>
            )}

            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                onClick={() => setShowDeleteModal(false)}
              >
                取消
              </button>
              <button
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                onClick={async () => {
                  // 真正发请求删除
                  const res = await fetch("/api/guestbook", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      id: deleteTarget.id,
                      password: deletePwd,
                    }),
                  });
                  const data = await res.json();
                  if (!res.ok) {
                    setDeleteError(data.error || "删除失败，请检查密码后重试");
                  } else {
                    setShowDeleteModal(false);
                    fetchEntries();
                  }
                }}
                disabled={!deletePwd}
              >
                确认删除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
