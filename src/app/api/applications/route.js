import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import bcrypt from "bcryptjs";

export const runtime = "nodejs";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const activityId = searchParams.get("activityId");
  if (!activityId) {
    return NextResponse.json({ error: "Missing activityId" }, { status: 400 });
  }
  const apps = await prisma.application.findMany({
    where: { activityId: Number(activityId) },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(apps);
}

export async function POST(req) {
  const {
    activityId,
    name,
    phone,
    email,
    other,
    attachments = [],
    userPw,
  } = await req.json();

  const hash = await bcrypt.hash(userPw, 10);

  const application = await prisma.application.create({
    data: {
      activityId,
      name,
      phone,
      email,
      other,
      attachments,
      userPw: hash,
    },
  });

  return NextResponse.json(application, { status: 201 });
}

export async function PATCH(req) {
  const url = new URL(req.url);
  const isAdmin = url.searchParams.get("admin") === "true";
  const headers = req.headers;
  const body = await req.json();
  const { id, userPw, status, ...rest } = body;

  // 1) 管理员流：检查 x-admin-pw
  if (isAdmin) {
    const adminPw = headers.get("x-admin-pw");
    if (adminPw !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  } else {
    // 2) 普通用户流：用 userPw 验证应用者身份
    if (!userPw) {
      return NextResponse.json({ error: "Missing userPw" }, { status: 400 });
    }
    const app = await prisma.application.findUnique({ where: { id } });
    if (!app) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }
    const valid = await bcrypt.compare(userPw, app.userPw);
    if (!valid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  // 3) 都通过后，真正去更新
  const updated = await prisma.application.update({
    where: { id },
    data: {
      status,
      // 如果你还想让管理员/用户改 other、attachments 等字段，也可以解构 rest
      ...rest,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(req) {
  const url = new URL(req.url);
  const isAdmin = url.searchParams.get("admin") === "true";
  const activityId = Number(url.searchParams.get("activityId"));
  const headers = req.headers;

  if (isAdmin) {
    // 1) 管理员批量清空
    //   验证 x-admin-pw
    const adminPw = headers.get("x-admin-pw");
    if (adminPw !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!activityId) {
      return NextResponse.json(
        { error: "Missing activityId" },
        { status: 400 }
      );
    }
    // 批量删除该活动下所有报名
    const { count } = await prisma.application.deleteMany({
      where: { activityId },
    });
    return NextResponse.json({ success: true, deleted: count });
  } else {
    // 2) 普通用户删除单条（保留原逻辑）
    const { id, userPw } = await req.json();
    const app = await prisma.application.findUnique({ where: { id } });
    if (!app) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }
    const valid = await bcrypt.compare(userPw, app.userPw);
    if (!valid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await prisma.application.delete({ where: { id } });
    return NextResponse.json({ success: true });
  }
}
