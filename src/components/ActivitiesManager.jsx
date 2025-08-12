"use client";

import { useState, useEffect, useCallback } from "react";
import ActivityCreator from "./ActivityCreator";
import ActivityList from "./ActivityList";
import ApplicationForm from "./ApplicationForm";

export default function ActivitiesManager({
  isAdmin,
  lang,
  showApplicationForm = false,
  onApplicationSuccess,
}) {
  const [activities, setActivities] = useState([]);
  const [editing, setEditing] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const [authingId, setAuthingId] = useState(null);
  const [authAction, setAuthAction] = useState(null);
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
    setAuthAction(action);
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
      {/* 列表区 */}
      <section>
        <h2 className="ml-4 sm:ml-0 text-xl font-semibold mb-4">
          {lang === "zh" ? "近期活动列表" : "List of Recent Activities"}
        </h2>
        {activities.length === 0 ? (
          <p className="text-gray-600">暂无活动，快去创建吧！</p>
        ) : (
          <div className="space-y-4">
            {activities.map((act) => (
              <div
                key={act.id}
                className="relative rounded p-4 bg-white/50 shadow"
              >
                <ActivityList lang={lang} activities={[act]} />

                {isAdmin && (
                  <div className="absolute bottom-4 right-4 flex space-x-2">
                    <button
                      onClick={() => startAuth(act, "edit")}
                      className="px-3 py-1 bg-[#2ca9e1] hover:bg-[#165e83] text-white rounded"
                    >
                      {lang === "zh" ? "编辑" : "Edit"}
                    </button>
                    <button
                      onClick={() => startAuth(act, "delete")}
                      className="px-3 py-1 bg-[#fbd26d] hover:bg-[#ec6800] text-white rounded"
                    >
                      {lang === "zh" ? "删除" : "Delete"}
                    </button>
                  </div>
                )}

                {/* —— 行内密码验证框 —— */}
                {authingId === act.id && (
                  <div className="mt-20 sm:mt-2 flex flex-col sm:flex-row gap-3 rounded">
                    <input
                      type="password"
                      placeholder="请输入管理员密码"
                      className="border w-60 px-3 py-1 rounded"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                    />

                    <div className="flex gap-2">
                      <button
                        onClick={() => confirmAuth(act)}
                        className="px-3 py-1 bg-[#2ca9e1] hover:bg-[#165e83] text-white rounded"
                      >
                        {lang === "zh" ? "确认" : "Confirm"}
                      </button>
                      <button
                        onClick={cancelAuth}
                        className="px-3 py-1 bg-gray-400 hover:bg-[#165e83] text-white rounded"
                      >
                        {lang === "zh" ? "取消 " : "Cancel"}
                      </button>
                    </div>
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

      {/* 创建区 */}
      {isAdmin && (
        <section className="rounded p-4 bg-white/50 shadow">
          <h2 className="text-xl font-semibold mb-4">
            {" "}
            {lang === "zh" ? "创建新活动" : "Create New Activities"}
          </h2>
          <ActivityCreator lang={lang} onSuccess={handleSuccess} />
        </section>
      )}

      {/* 报名区（可选） */}
      {showApplicationForm && activities[0] && (
        <section>
          <ApplicationForm
            isAdmin={isAdmin}
            lang={lang}
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
