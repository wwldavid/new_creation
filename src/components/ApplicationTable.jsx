"use client";

import { useState } from "react";
import MaskedCell from "./MaskedCell";
import PasswordModal from "./PasswordModal";
import DetailsModal from "./DetailsModal";
import EditModal from "./EditModal";
import ManageModal from "./ManageModal";

function getPwdTitle(mode) {
  switch (mode) {
    case "view":
      return "请输入报名密码以查看";
    case "edit":
      return "请输入报名密码以编辑";
    case "delete":
      return "请输入报名密码以删除";
    case "viewAll":
    case "manage":
      return "请输入管理员密码";
    default:
      return "";
  }
}

export default function ApplicationTable({ data, activityId, refetch }) {
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState(null); // "view"|"edit"|"delete"|"viewAll"|"manage"

  const [showPwd, setShowPwd] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [adminPw, setAdminPw] = useState("");
  const [userPw, setUserPw] = useState("");

  const [showAll, setShowAll] = useState(false);

  const handleConfirm = async (pw) => {
    setShowPwd(false);

    if (mode === "view") {
      // 1. 调用后端校验用户报名时设的密码
      const res = await fetch("/api/applications/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selected.id, userPw: pw }),
      });

      // 2. 如果密码错，给个提示并中断
      if (!res.ok) {
        alert("密码错误，无法查看详情");
        return;
      }

      // 3. 密码对，取回该条申请数据，打开详情弹窗
      const appData = await res.json();
      setSelected(appData);
      return setShowDetailsModal(true);
    }

    if (mode === "edit") {
      const res = await fetch("/api/applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selected.id, userPw: pw }),
      });
      if (!res.ok) return alert("密码错误");
      setUserPw(pw);
      return setShowEditModal(true);
    }

    if (mode === "delete") {
      const res = await fetch("/api/applications", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selected.id, userPw: pw }),
      });
      if (!res.ok) return alert("密码错误");
      await refetch();
      return;
    }

    if (mode === "viewAll") {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminPw: pw }),
      });
      if (!res.ok) {
        alert("管理员密码错误");
        return;
      }
      setAdminPw(pw);
      setShowAll(true);
      return;
    }

    if (mode === "manage") {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminPw: pw }),
      });
      if (!res.ok) {
        alert("管理员密码错误");
        return;
      }
      setAdminPw(pw);
      setShowManageModal(true);
      return;
    }
  };

  // 点击表格中的按钮时，保存选中项、模式，并弹密码框
  const handleAction = (app, action) => {
    setSelected(app);
    setMode(action);
    setShowPwd(true);
  };

  const handleToggleShow = () => {
    if (!showAll) {
      handleAction(null, "viewAll");
    } else {
      setShowAll(false);
    }
  };
  return (
    <div>
      <table className="min-w-full text-center border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-2 py-1 ">序号</th>
            <th className="px-2 py-1 ">姓名</th>
            <th className="px-2 py-1 ">电话</th>
            <th className="px-2 py-1 ">邮箱</th>
            <th className="px-2 py-1 ">其它事项</th>
            <th className="px-2 py-1 ">上传资料</th>
            <th className="px-2 py-1 ">申请状态</th>
            <th className="px-2 py-1 ">用户操作</th>
          </tr>
        </thead>
        <tbody>
          {data.map((app, i) => (
            <tr key={app.id} className="even:bg-white odd:bg-gray-50">
              <td className="px-2 py-1 ">{i + 1}</td>
              {/* 根据 showAll 决定显示真实值还是 MaskedCell */}
              <td className="px-2 py-1">
                {showAll ? (
                  app.name
                ) : (
                  <MaskedCell type="name" value={app.name} />
                )}
              </td>
              <td className="px-2 py-1">
                {showAll ? app.phone : <MaskedCell value={app.phone} />}
              </td>
              <td className="px-2 py-1">
                {showAll ? app.email : <MaskedCell value={app.email} />}
              </td>
              <td className="px-2 py-1">
                {showAll ? app.other : <MaskedCell value={app.other} />}
              </td>
              <td className="px-2 py-1">
                {showAll ? (
                  app.attachments.join(",")
                ) : (
                  <MaskedCell value={app.attachments.join(",")} />
                )}
              </td>
              <td className="px-2 py-1">{app.status}</td>
              <td className="space-x-1 px-2 py-1">
                <button
                  className="text-blue-600"
                  onClick={() => handleAction(app, "view")}
                >
                  查看
                </button>
                <button
                  className="text-green-600"
                  onClick={() => handleAction(app, "edit")}
                >
                  编辑
                </button>
                <button
                  className="text-red-600"
                  onClick={() => handleAction(app, "delete")}
                >
                  删除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 右下角：查看所有 & 管理 */}
      <div className=" flex space-x-2 p-4">
        <button
          className={`px-4 py-2 rounded text-white ${
            showAll ? "bg-red-600" : "bg-blue-600"
          }`}
          onClick={handleToggleShow}
        >
          {showAll ? "隐藏信息" : "查看信息"}
        </button>
        <button
          className="px-4 py-2 bg-gray-800 text-white rounded"
          onClick={() => handleAction(null, "manage")}
        >
          管理
        </button>
      </div>

      {/* 一：密码弹窗 */}
      <PasswordModal
        open={showPwd}
        title={getPwdTitle(mode)}
        onCancel={() => setShowPwd(false)}
        onConfirm={handleConfirm}
      />

      {/* 二：详情弹窗 */}
      {showDetailsModal && (
        <DetailsModal
          open={showDetailsModal}
          data={selected}
          onClose={() => setShowDetailsModal(false)}
        />
      )}

      {/* 三：编辑弹窗 */}
      {showEditModal && (
        <EditModal
          open={showEditModal}
          data={selected}
          onClose={() => setShowEditModal(false)}
          onSubmit={async (updated) => {
            await fetch("/api/applications", {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: selected.id, userPw, ...updated }),
            });
            await refetch();
            setShowEditModal(false);
          }}
        />
      )}

      {/* 四：管理面板 */}
      {showManageModal && (
        <ManageModal
          open={showManageModal}
          data={data}
          activityId={activityId}
          adminPw={adminPw}
          onClose={() => setShowManageModal(false)}
          onRefresh={refetch}
        />
      )}
    </div>
  );
}
