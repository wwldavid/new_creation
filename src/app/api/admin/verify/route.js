import { NextResponse } from "next/server";

export async function POST(request) {
  const { adminPw } = await request.json();

  if (adminPw === process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: "密码不正确" }, { status: 401 });
}
