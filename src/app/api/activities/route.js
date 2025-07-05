import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!ADMIN_PASSWORD) {
  throw new Error("ADMIN_PASSWORD must be set");
}

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

  if (adminPw !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
    },
  });

  return NextResponse.json(activity, { status: 201 });
}

export async function PATCH(req) {
  // 把特殊字段单列，restFields 里剩下其它可直接映射的字段
  const {
    id,
    adminPw,
    attachments, // 如果前端需要更新附件数组，就会在这里拿到 string[]
    promoImageKey, // 如果前端需要更新宣传图，就会传这个字段
    startAt,
    endAt,
    ...restFields // 其余字段：name/contact/location/detail/other/feeType 等
  } = await req.json();

  if (adminPw !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const act = await prisma.activity.findUnique({ where: { id } });
  if (!act) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  // 构造更新数据
  const data = { ...restFields };
  if (startAt) data.startAt = new Date(startAt);
  if (endAt) data.endAt = new Date(endAt);
  if (promoImageKey !== undefined) data.promoImage = promoImageKey;
  if (attachments !== undefined) data.attachments = attachments;

  const updated = await prisma.activity.update({
    where: { id },
    data,
  });

  return NextResponse.json(updated);
}

export async function DELETE(req) {
  const { id, adminPw } = await req.json();

  if (adminPw !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const act = await prisma.activity.findUnique({ where: { id } });
  if (!act) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
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
