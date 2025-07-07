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
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export default function EditModal({ open, data, onSubmit, onClose }) {
  // 初始值设为空，避免 data 为 null 时访问属性报错
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    other: "",
    attachments: [],
  });

  // 当 open 或 data 变化时，同步 data 到 form
  useEffect(() => {
    if (open && data) {
      setForm({
        name: data.name || "",
        phone: data.phone || "",
        email: data.email || "",
        other: data.other || "",
        attachments: data.attachments || [],
      });
    }
  }, [open, data]);

  // 如果没打开或没有 data，就不渲染
  if (!open || !data) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const removeAttachment = (idx) => {
    setForm((f) => {
      const arr = [...f.attachments];
      arr.splice(idx, 1);
      return { ...f, attachments: arr };
    });
  };

  const handleAttachChange = (e) => {
    const files = Array.from(e.target.files);
    setForm((f) => ({
      ...f,
      // 把新选的 File 对象追加到 attachments 数组里
      attachments: [...f.attachments, ...files],
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>编辑报名</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 my-4">
          <Input
            placeholder="姓名"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
          <Input
            placeholder="电话"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          />
          <Input
            placeholder="邮箱"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />
          <Textarea
            placeholder="其它事项"
            value={form.other}
            onChange={(e) => setForm((f) => ({ ...f, other: e.target.value }))}
          />

          {/* —— 在这里插入附件编辑区 —— */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">上传资料</label>
            {form.attachments.map((att, i) => (
              <div key={i} className="flex items-center space-x-2">
                <span>{typeof att === "string" ? att : att.name}</span>
                <button
                  type="button"
                  className="text-red-600 text-sm"
                  onClick={() => removeAttachment(i)}
                >
                  删除
                </button>
              </div>
            ))}
            <input type="file" multiple onChange={handleAttachChange} />
          </div>
        </form>
        <DialogFooter className="justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            取消
          </Button>
          <Button onClick={handleSubmit}>保存</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
