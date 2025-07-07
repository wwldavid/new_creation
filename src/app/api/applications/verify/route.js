// app/api/applications/verify/route.js
import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import bcrypt from "bcryptjs";

export const runtime = "nodejs";

export async function POST(req) {
  // 1. 解析前端传来的 JSON：{ id, userPw }
  const { id, userPw } = await req.json();

  // 2. 找到对应申请
  const app = await prisma.application.findUnique({
    where: { id },
  });
  if (!app) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  // 3. 校验密码
  const valid = await bcrypt.compare(userPw, app.userPw);
  if (!valid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 4. 密码正确，返回该条申请数据
  return NextResponse.json(app);
}
