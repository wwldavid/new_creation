"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";

export default function ManageModal({
  open,
  data,
  activityId,
  adminPw,
  onRefresh,
  onClose,
}) {
  const [statusMap, setStatusMap] = useState({});

  // 每次 data 改变（比如打开新的 Modal）就重置 statusMap
  useEffect(() => {
    setStatusMap(Object.fromEntries(data.map((a) => [a.id, a.status])));
  }, [data]);

  async function updateStatus(id, newStatus) {
    const res = await fetch(`/api/applications?admin=true`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-admin-pw": adminPw,
      },
      body: JSON.stringify({ id, status: newStatus }),
    });
    if (!res.ok) {
      alert("状态更新失败");
      return;
    }
    // 更新成功后，通知父组件刷新列表
    onRefresh();
  }

  async function clearAll() {
    await fetch(`/api/applications?activityId=${activityId}&admin=true`, {
      method: "DELETE",
      headers: { "x-admin-pw": adminPw },
    });
    onRefresh();
    onClose();
  }

  async function exportCsv() {
    const res = await fetch(
      `/api/applications/export?activityId=${activityId}&admin=true`,
      { headers: { "x-admin-pw": adminPw } }
    );
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `applications_${activityId}.csv`;
    a.click();
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>管理报名</DialogTitle>
          {/* —— 增加一个表头 —— */}
          <div className="grid grid-cols-6 gap-4 font-semibold border-b pb-2 mt-4">
            <div>姓名</div>
            <div>电话</div>
            <div>邮箱</div>
            <div>其它事项</div>
            <div>上传资料</div>
            <div>申请状态</div>
          </div>
        </DialogHeader>

        {/* —— 列表区 —— */}
        <div className="space-y-2 mt-2">
          {data.map((app) => (
            <div key={app.id} className="grid grid-cols-6 gap-4 items-center">
              <div>{app.name}</div>
              <div>{app.phone}</div>
              <div>{app.email}</div>
              <div>{app.other || "—"}</div>
              <div>
                {app.attachments && app.attachments.length > 0
                  ? app.attachments.join(", ")
                  : "—"}
              </div>
              <Select
                value={statusMap[app.id]}
                onValueChange={(val) => {
                  setStatusMap((m) => ({ ...m, [app.id]: val }));
                  updateStatus(app.id, val);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="请选择" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="审核中">审核中</SelectItem>
                  <SelectItem value="通过">通过</SelectItem>
                  <SelectItem value="拒绝">拒绝</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>

        {/* —— 底部操作按钮 —— */}
        <DialogFooter className="mt-6 flex justify-between">
          <Button variant="destructive" onClick={clearAll}>
            清空列表
          </Button>
          <div className="space-x-2">
            <Button onClick={exportCsv}>导出 CSV</Button>
            <Button onClick={onClose}>关闭</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
