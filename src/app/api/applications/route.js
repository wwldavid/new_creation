import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import bcrypt from "bcrypt";

export const runtime = "nodejs";

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
  const { id, userPw, ...rest } = await req.json();

  const app = await prisma.application.findUnique({ where: { id } });
  if (!app) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  const valid = await bcrypt.compare(userPw, app.userPw);
  if (!valid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = { ...rest };
  if (rest.attachments !== undefined) data.attachments = rest.attachments;

  const updated = await prisma.application.update({
    where: { id },
    data,
  });

  return NextResponse.json(updated);
}

export async function DELETE(req) {
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
