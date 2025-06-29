"use client";
import { useEffect, useRef, useState } from "react";
import { Play, ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";

export default function SermonPlayer() {
  const [sermons, setSermons] = useState([]);
  const [total, setTotal] = useState(0);
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [form, setForm] = useState({
    adminPw: "",
    title: "",
    speaker: "",
    date: "",
    scripture: "",
    description: "",
    note: "",
    type: "audio",
    file: null,
    speakerImageFile: null,
    sermonImageFile: null,
  });

  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const [playError, setPlayError] = useState(null);

  const [pwModal, setPwModal] = useState({
    open: false,
    mode: null, // "edit" 或 "delete"
    sermon: null, // 要操作的记录对象
  });
  const [pwInput, setPwInput] = useState("");

  const [editForm, setEditForm] = useState(null);

  const handleMediaError = (e) => {
    const err = e.target.error?.message || "未知错误";
    console.error("媒体播放失败:", e);
    setPlayError(`播放失败: ${err}`);
  };

  // Fetch data from the API
  const fetchData = async () => {
    try {
      const res = await fetch(
        `/api/sermons?page=${page}&pageSize=10&q=${encodeURIComponent(q)}`
      );
      const { total, data } = await res.json();
      setTotal(total);
      setSermons(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Initial load & reload on page/q change
  useEffect(() => {
    fetchData();
  }, [page, q]);

  // Handle form upload
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!form.file) {
      return alert("请先选择一个媒体文件！");
    }

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      if (v != null) fd.append(k, v);
    });
    if (form.speakerImageFile)
      fd.append("speakerImageFile", form.speakerImageFile);
    if (form.sermonImageFile)
      fd.append("sermonImageFile", form.sermonImageFile);

    try {
      const res = await fetch("/api/sermons", {
        method: "POST",
        body: fd,
      });

      if (!res.ok) {
        return alert(`上传失败 (${res.status})`);
      }
      // 成功后再拉列表、关闭弹窗
      await fetchData();
      setShowUpload(false);
      // 重置表单
      setForm({
        adminPw: "",
        title: "",
        speaker: "",
        date: "",
        scripture: "",
        description: "",
        note: "",
        type: "audio",
        file: null,
        speakerImageFile: null,
        sermonImageFile: null,
      });
    } catch (err) {
      alert("上传过程中出错：" + err.message);
    }
  };

  const submitEdit = async () => {
    // editForm 结构：所有 sermon 字段 + adminPw
    const { id, adminPw, ...data } = editForm;
    try {
      const res = await fetch(`/api/sermons/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, adminPw }),
      });
      if (res.ok) {
        setEditForm(null);
        fetchData();
      } else if (res.status === 403) {
        alert("密码错误，更新失败");
      } else {
        alert("更新失败");
      }
    } catch (err) {
      alert("更新出错：" + err.message);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-lg mt-5 mb-5">
      {/* 播放区 */}
      {playError && (
        <div className="text-red-500 text-center mb-4">{playError}</div>
      )}

      <div className="mb-6">
        {selected ? (
          <div className="flex items-stretch space-x-4">
            {/* 播放器区域 */}

            {/* 根据类型显示不同的播放器 */}
            {selected && (
              <div className="basis-3/4 mb-4">
                {(() => {
                  const isVideo = selected.type.toLowerCase() === "video";

                  return (
                    <>
                      {isVideo ? (
                        <div className="w-full rounded-lg overflow-hidden bg-black">
                          <video
                            ref={videoRef}
                            src={selected.playUrl}
                            poster={selected.sermonImage}
                            controls
                            autoPlay
                            className="w-full"
                            style={{ maxHeight: "500px" }}
                            onError={handleMediaError}
                          >
                            您的浏览器不支持 HTML5 视频播放
                          </video>
                        </div>
                      ) : (
                        <audio
                          ref={audioRef}
                          key={selected.id}
                          src={selected.playUrl}
                          controls
                          autoPlay
                          className="w-full"
                          onError={handleMediaError}
                        />
                      )}
                    </>
                  );
                })()}
              </div>
            )}

            <div className="relative mb-4 bg-[#c8d5bb] flex-1 self-stretch rounded-lg p-4">
              <div className="space-y-2 text-sm overflow-y-auto">
                <h6 className="font-semibold">Description</h6>
                <p className="break-words">{selected.description || "无"}</p>
                <h6 className="font-semibold">Note</h6>
                <p className="break-words">{selected.note || "无"}</p>
              </div>
              {/* 关闭按钮 */}
              <button
                onClick={() => {
                  setSelected(null);
                  setPlayError(null);
                }}
                className="absolute bottom-1 right-1 px-4 py-2 bg-[#80989b] text-white rounded-lg flex-shrink-0 hover:bg-[#6d7f82] transition-colors "
                aria-label="关闭播放区"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            请选择一条媒体播放
          </div>
        )}
      </div>

      {/* 搜索 + 上传 */}
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="搜索 title/speaker/scripture…"
          value={q}
          onChange={(e) => {
            setPage(1);
            setQ(e.target.value);
          }}
          onKeyDown={(e) => e.key === "Enter" && fetchData()}
          className="border px-3 py-2 rounded-lg flex-1 mr-4"
        />
        <button
          onClick={() => setShowUpload(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          上传资料
        </button>
      </div>

      {/* 列表 */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              {[
                "Title",
                "play",
                "Type",
                "Speaker",
                "Date",
                "Scripture",
                "Desc",
                "Note",
                "edit",
                "delete",
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-2 text-left text-sm font-medium text-gray-700"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sermons.map((s) => (
              <tr key={s.id} className="border-b hover:bg-blue-50">
                <td className="px-4 py-2">{s.title}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => {
                      setPlayError(null);
                      console.log("点击播放，媒体信息:", s);
                      console.log(
                        "媒体类型:",
                        s.type,
                        "转小写:",
                        s.type.toLowerCase()
                      );

                      setSelected({
                        ...s,
                        playUrl: `/api/sermons/media/${s.key}`,
                      });
                    }}
                    className="p-2 hover:bg-blue-100 rounded-full transition-colors"
                  >
                    <Play className="w-5 h-5" />
                  </button>
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      s.type.toLowerCase() === "video"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {s.type}
                  </span>
                </td>
                <td className="px-4 py-2">{s.speaker || "-"}</td>

                <td className="px-4 py-2">
                  {new Date(s.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">{s.scripture || "-"}</td>
                <td className="px-4 py-2 line-clamp-2">
                  {s.description || "-"}
                </td>
                <td className="px-4 py-2">{s.note || "-"}</td>
                <td className="px-4 py-2">
                  <button
                    className="px-2 bg-[#2ca9e1] text-white rounded hover:bg-[#165e83]"
                    onClick={() => {
                      setPwModal({ open: true, mode: "edit", sermon: s });
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td className="px-4 py-2">
                  <button
                    className="px-2 bg-[#fbd26b] text-white rounded hover:bg-[#ec6800]"
                    onClick={() => {
                      setPwModal({ open: true, mode: "delete", sermon: s });
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 分页 */}
      <div className="flex items-center justify-center space-x-4 mt-4">
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => p - 1)}
          className="p-2 disabled:opacity-50 hover:bg-gray-100 rounded transition-colors"
        >
          <ChevronLeft />
        </button>
        <span className="text-sm text-gray-600">
          {page} / {Math.ceil(total / 10)}
        </span>
        <button
          disabled={page >= Math.ceil(total / 10)}
          onClick={() => setPage((p) => p + 1)}
          className="p-2 disabled:opacity-50 hover:bg-gray-100 rounded transition-colors"
        >
          <ChevronRight />
        </button>
      </div>

      {pwModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-sm w-full space-y-4">
            <h3 className="text-lg font-semibold">
              {pwModal.mode === "delete" ? "确认删除" : "编辑验证码"}
            </h3>

            <input
              type="password"
              placeholder="请输入管理员密码"
              value={pwInput}
              onChange={(e) => setPwInput(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg"
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setPwModal({ open: false, mode: null, sermon: null });
                  setPwInput("");
                }}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                取消
              </button>

              <button
                onClick={async () => {
                  if (!pwInput) {
                    alert("请输入密码");
                    return;
                  }
                  const { mode, sermon } = pwModal;
                  if (mode === "delete") {
                    // DELETE 请求
                    const res = await fetch(`/api/sermons/${sermon.id}`, {
                      method: "DELETE",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ adminPw: pwInput }),
                    });
                    if (res.ok) {
                      fetchData();
                    } else if (res.status === 403) {
                      alert("密码错误，删除失败");
                    } else {
                      alert("删除失败");
                    }
                  } else {
                    // 编辑，打开真正的编辑 Modal
                    setEditForm({ ...sermon, adminPw: pwInput });
                  }
                  // 关闭密码 Modal
                  setPwModal({ open: false, mode: null, sermon: null });
                  setPwInput("");
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                确认
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 编辑 Modal */}
      {editForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl space-y-4 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold">编辑 Sermon</h3>

            {[
              { key: "title", label: "Title", type: "text" },
              { key: "speaker", label: "Speaker", type: "text" },
              { key: "date", label: "Date", type: "date" },
              { key: "scripture", label: "Scripture", type: "text" },
              { key: "description", label: "Description", type: "text" },
              { key: "note", label: "Note", type: "text" },
              // 新增三项：
              {
                key: "type",
                label: "Content Type",
                type: "select",
                options: [
                  { value: "AUDIO", label: "Audio" },
                  { value: "VIDEO", label: "Video" },
                ],
              },
              { key: "speakerImage", label: "Speaker Image URL", type: "text" },
              { key: "sermonImage", label: "Sermon Image URL", type: "text" },
            ].map(({ key, label, type, options }) => (
              <div key={key}>
                <label className="block text-sm font-medium mb-1">
                  {label}
                </label>

                {type === "select" ? (
                  <select
                    value={editForm[key] || ""}
                    onChange={(e) =>
                      setEditForm((f) => ({ ...f, [key]: e.target.value }))
                    }
                    className="w-full border px-3 py-2 rounded-lg"
                  >
                    {options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={type}
                    value={editForm[key] || ""}
                    onChange={(e) =>
                      setEditForm((f) => ({ ...f, [key]: e.target.value }))
                    }
                    className="w-full border px-3 py-2 rounded-lg"
                  />
                )}
              </div>
            ))}

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setEditForm(null)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                取消
              </button>
              <button
                onClick={submitEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                确认更新
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 上传 Modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
          <form
            onSubmit={handleUpload}
            className="bg-white p-6 rounded-xl space-y-4 max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-xl font-semibold">上传 Sermon</h3>

            <input
              type="password"
              placeholder="管理员密码"
              required
              onChange={(e) =>
                setForm((f) => ({ ...f, adminPw: e.target.value }))
              }
              className="w-full border px-3 py-2 rounded-lg"
            />

            {[
              "title",
              "speaker",
              "date",
              "scripture",
              "description",
              "note",
            ].map((field) => (
              <input
                key={field}
                type={field === "date" ? "date" : "text"}
                placeholder={field}
                required={field === "title" || field === "date"}
                onChange={(e) =>
                  setForm((f) => ({ ...f, [field]: e.target.value }))
                }
                className="w-full border px-3 py-2 rounded-lg"
              />
            ))}

            <select
              value={form.type}
              onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
              className="w-full border px-3 py-2 rounded-lg"
            >
              <option value="audio">Audio</option>
              <option value="video">Video</option>
            </select>

            <label className="block">
              <span className="text-gray-700">媒体文件 (音频或视频)</span>
              <input
                type="file"
                accept="audio/*,video/*"
                required
                onChange={(e) =>
                  setForm((f) => ({ ...f, file: e.target.files[0] }))
                }
                className="mt-1 block w-full"
              />
            </label>

            <label className="block">
              <span className="text-gray-700">主讲者头像 (可选)</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    speakerImageFile: e.target.files[0],
                  }))
                }
                className="mt-1 block w-full"
              />
            </label>

            <label className="block">
              <span className="text-gray-700">讲道配图 (可选)</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setForm((f) => ({ ...f, sermonImageFile: e.target.files[0] }))
                }
                className="mt-1 block w-full"
              />
            </label>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowUpload(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors"
              >
                取消
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                提交
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
