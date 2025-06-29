// app/api/sermons/[id]/route.js

import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function PATCH(request, { params }) {
  const payload = await request.json();
  const { adminPw, ...data } = payload;

  // 密码校验
  if (adminPw !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const id = Number(params.id);

  const updated = await prisma.sermon.update({
    where: { id },
    data: {
      title: data.title,
      speaker: data.speaker,
      date: new Date(data.date),
      scripture: data.scripture,
      description: data.description,
      note: data.note,
      type: data.type,
      speakerImage: data.speakerImage,
      sermonImage: data.sermonImage,
    },
  });
  return NextResponse.json(updated);
}

export async function DELETE(request, { params }) {
  const { adminPw } = await request.json();

  if (adminPw !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const id = Number(params.id);
  await prisma.sermon.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
