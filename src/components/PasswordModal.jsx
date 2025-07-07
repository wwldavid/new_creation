"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
console.log({
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Button,
});
export default function PasswordModal({ open, title, onConfirm, onCancel }) {
  const [pw, setPw] = useState("");
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Input
          type="password"
          placeholder="请输入密码"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />
        <div className="mt-4 flex justify-end space-x-2">
          <Button variant="ghost" onClick={onCancel}>
            取消
          </Button>
          <Button onClick={() => onConfirm(pw)}>确定</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
