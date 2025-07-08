import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import bcrypt from "bcryptjs";

const ADMIN_PW = process.env.ADMIN_PASSWORD;

export async function GET() {
  const all = await prisma.guestbookEntry.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(all);
}

export async function POST(req) {
  const { content, password } = await req.json();
  if (!content || !password) {
    return NextResponse.json({ error: "参数不足" }, { status: 400 });
  }
  const hash = await bcrypt.hash(password, 10);
  const entry = await prisma.guestbookEntry.create({
    data: { content, passwordHash: hash },
  });
  return NextResponse.json(entry, { status: 201 });
}

export async function PATCH(req) {
  const { id, content, password } = await req.json();
  const entry = await prisma.guestbookEntry.findUnique({ where: { id } });
  if (!entry) {
    return NextResponse.json({ error: "未找到留言" }, { status: 401 });
  }
  if (!(await bcrypt.compare(password, entry.passwordHash))) {
    return NextResponse.json({ error: "密码错误" }, { status: 401 });
  }
  const updated = await prisma.guestbookEntry.update({
    where: { id },
    data: { content },
  });
  return NextResponse.json(updated);
}

export async function DELETE(req) {
  const { id, password, admin } = await req.json();
  if (admin) {
    if (password !== ADMIN_PW) {
      return NextResponse.json({ error: "管理员密码错误" }, { status: 401 });
    }
    await prisma.guestbookEntry.deleteMany();
    return NextResponse.json({ success: true });
  }

  const entry = await prisma.guestbookEntry.findUnique({ where: { id } });
  if (!entry) {
    return NextResponse.json({ error: "未找到留言" }, { status: 404 });
  }
  if (!(await bcrypt.compare(password, entry.passwordHash))) {
    return NextResponse.json({ error: "密码错误" }, { status: 401 });
  }
  await prisma.guestbookEntry.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
