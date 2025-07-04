import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req) {
  const {
    name,
    startAt,
    endAt,
    organizer,
    contact,
    location,
    feeType,
    detail,
    other,
    attachments = [],
    promoImageKey,
    adminPw,
  } = await req.json();

  const hash = await bcrypt.hash(adminPw, 10);
  const activity = await prisma.activity.create({
    data: {
      name,
      startAt: new Date(startAt),
      endAt: new Date(endAt),
      organizer,
      contact,
      location,
      feeType,
      detail,
      other,
      attachments,
      promoImage: promoImageKey,
      adminPw: hash,
    },
  });

  return NextResponse.json(activity, { status: 201 });
}

export async function PATCH(req) {
  const { id, adminPw, ...rest } = await req.json();
  const act = await prisma.activity.findUnique({ where: { id } });
  if (!act) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }
  const valid = await bcrypt.compare(adminPw, act.adminPw);
  if (!valid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = { ...rest };
  if (rest.startAt) data.startAt = new Date(rest.startAt);
  if (rest.endAt) data.endAt = new Date(rest.endAt);
  if (rest.promoImageKey !== undefined) data.promoImage = rest.promoImageKey;

  const updated = await prisma.activity.update({
    where: { id },
    data,
  });

  return NextResponse.json(updated);
}

export async function DELETE(req) {
  const { id, adminPw } = await req.json();
  const act = await prisma.activity.findUnique({ where: { id } });
  if (!act) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }
  const valid = await bcrypt.compare(adminPw, act.adminPw);
  if (!valid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await prisma.activity.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

export async function GET() {
  const activities = await prisma.activity.findMany({
    orderBy: { startAt: "desc" },
  });
  return NextResponse.json(activities);
}
