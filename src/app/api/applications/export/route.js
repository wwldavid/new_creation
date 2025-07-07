// app/api/applications/export/route.js
import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export const runtime = "nodejs";

export async function GET(request) {
  const url = new URL(request.url);
  const isAdmin = url.searchParams.get("admin") === "true";
  const activityId = url.searchParams.get("activityId");
  const adminPw = request.headers.get("x-admin-pw");

  // 1. 权限校验
  if (!isAdmin || adminPw !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!activityId) {
    return NextResponse.json({ error: "Missing activityId" }, { status: 400 });
  }

  // 2. 拉数据
  const apps = await prisma.application.findMany({
    where: { activityId: Number(activityId) },
    orderBy: { createdAt: "desc" },
  });

  // 3. 生成 CSV 文本
  const header = [
    "id",
    "name",
    "phone",
    "email",
    "other",
    "attachments",
    "status",
    "createdAt",
  ];
  const rows = apps.map((app) => [
    app.id,
    `"${app.name.replace(/"/g, '""')}"`,
    `"${app.phone}"`,
    `"${app.email}"`,
    `"${(app.other || "").replace(/"/g, '""')}"`,
    `"${app.attachments.join(";").replace(/"/g, '""')}"`,
    app.status,
    app.createdAt.toISOString(),
  ]);
  const csvBody = [header.join(","), ...rows.map((r) => r.join(","))].join(
    "\r\n"
  );
  const csvWithBom = "\uFEFF" + csvBody;

  // 4. 返回带附件头的 CSV
  return new NextResponse(csvWithBom, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="applications_${activityId}.csv"`,
    },
  });
}
