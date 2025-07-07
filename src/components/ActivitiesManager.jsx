"use client";

import { useState, useEffect, useCallback } from "react";
import ActivityCreator from "./ActivityCreater";
import ActivityList from "./ActivityList";
import ApplicationForm from "./ApplicationForm";

export default function ActivitiesManager({
  showApplicationForm = false,
  onApplicationSuccess,
}) {
  const [activities, setActivities] = useState([]);
  const [editing, setEditing] = useState(null); // 要编辑的活动
  const [refreshKey, setRefreshKey] = useState(0);

  const [authingId, setAuthingId] = useState(null); // 正在验证密码的 activity.id
  const [authAction, setAuthAction] = useState(null); // "edit" 或 "delete"
  const [passwordInput, setPasswordInput] = useState("");

  const fetchActivities = useCallback(async () => {
    const res = await fetch("/api/activities");
    const data = await res.json();
    setActivities(data);
  }, []);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities, refreshKey]);

  const handleSuccess = () => {
    setRefreshKey((k) => k + 1);
    setEditing(null);
    onApplicationSuccess?.();
  };

  // 点击“编辑”先进入验证流程
  const startAuth = (act, action) => {
    setAuthingId(act.id);
    setAuthAction(action); // "edit" 或 "delete"
    setPasswordInput("");
  };

  // 确认密码后
  const confirmAuth = async (act) => {
    if (passwordInput !== process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      alert("密码错误");
      return;
    }
    // 验证成功，清除验证框
    setAuthingId(null);
    setAuthAction(null);

    if (act && authAction === "edit") {
      // 进入编辑模式
      setEditing(act);
    } else if (act && authAction === "delete") {
      // 真正发起删除
      if (!confirm("确定删除该活动？此操作无法撤销。")) return;
      await fetch("/api/activities", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: act.id,
          adminPw: process.env.NEXT_PUBLIC_ADMIN_PASSWORD,
        }),
      });
      handleSuccess();
    }
  };

  // 取消验证
  const cancelAuth = () => {
    setAuthingId(null);
    setAuthAction(null);
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6 my-8">
      {/* 创建区 */}
      <section className="border rounded p-4 bg-gray-50">
        <h2 className="text-2xl font-semibold mb-4">创建新活动</h2>
        <ActivityCreator onSuccess={handleSuccess} />
      </section>

      {/* 列表区 */}
      <section>
        <h2 className="text-xl font-semibold mb-4">活动列表</h2>
        {activities.length === 0 ? (
          <p className="text-gray-600">暂无活动，快去创建吧！</p>
        ) : (
          <div className="space-y-4">
            {activities.map((act) => (
              <div
                key={act.id}
                className="relative border rounded p-4 bg-white shadow"
              >
                <ActivityList activities={[act]} />

                <div className="absolute bottom-4 right-4 flex space-x-2">
                  <button
                    onClick={() => startAuth(act, "edit")}
                    className="px-3 py-1 bg-green-600 text-white rounded"
                  >
                    编辑
                  </button>
                  <button
                    onClick={() => startAuth(act, "delete")}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    删除
                  </button>
                </div>

                {/* —— 行内密码验证框 —— */}
                {authingId === act.id && (
                  <div className="mt-2  flex gap-3 rounded space-y-2">
                    <input
                      type="password"
                      placeholder="请输入管理员密码"
                      className=" border px-3 py-1 rounded"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                    />

                    <button
                      onClick={() => confirmAuth(act)}
                      className=" px-3 py-1 bg-green-600 text-white rounded"
                    >
                      确认
                    </button>
                    <button
                      onClick={cancelAuth}
                      className=" px-3 py-1 bg-gray-400 text-white rounded"
                    >
                      取消
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 编辑区：只有通过密码校验后才会渲染 */}
      {editing && (
        <section className="border rounded p-4 bg-gray-50">
          <h2 className="text-2xl font-semibold mb-4">
            编辑活动：{editing.name}
          </h2>
          <ActivityCreator
            existing={editing}
            skipAuth // 新增 prop，跳过 ActivityCreator 内部的验证逻辑
            onSuccess={handleSuccess}
          />
          <button
            onClick={() => setEditing(null)}
            className="mt-4 px-4 py-2 bg-gray-300 rounded"
          >
            取消编辑
          </button>
        </section>
      )}

      {/* 报名区（可选） */}
      {showApplicationForm && activities[0] && (
        <section className="border rounded p-4 bg-gray-50">
          <ApplicationForm
            activityId={activities[0].id}
            onSuccess={() => {
              handleSuccess();
              alert("报名成功！");
            }}
          />
        </section>
      )}
    </div>
  );
}
