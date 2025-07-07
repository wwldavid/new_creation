"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";

export default function DetailsModal({ open, data, onClose }) {
  // 如果没打开或 data 为 null，就什么都不渲染
  if (!open || !data) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>报名详情</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 my-4">
          <p>
            <strong>姓名：</strong>
            {data.name}
          </p>
          <p>
            <strong>电话：</strong>
            {data.phone}
          </p>
          <p>
            <strong>邮箱：</strong>
            {data.email}
          </p>
          {data.other && (
            <p>
              <strong>其它事项：</strong>
              {data.other}
            </p>
          )}
          {data.attachments?.length > 0 && (
            <p>
              <strong>附件：</strong>
              {data.attachments.join(", ")}
            </p>
          )}
          <p>
            <strong>状态：</strong>
            {data.status}
          </p>
          <p>
            <strong>创建时间：</strong>
            {new Date(data.createdAt).toLocaleString()}
          </p>
        </div>
        <DialogFooter className="justify-end">
          <Button variant="outline" onClick={onClose}>
            关闭
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
