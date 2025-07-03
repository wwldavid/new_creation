// src/app/api/sermons/route.js

import { NextResponse } from "next/server";

import { ContentType } from "@prisma/client";
import prisma from "../../../../lib/prisma";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const runtime = "nodejs";

const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

// GET. /api/sermons/page=1&pageSize=10q=...

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);
    const q = (url.searchParams.get("q") || "").trim();

    const where = q
      ? {
          OR: [
            { title: { contains: q, mode: "insensitive" } },
            { speaker: { contains: q, mode: "insensitive" } },
            { scripture: { contains: q, mode: "insensitive" } },
          ],
        }
      : {};

    const [total, data] = await Promise.all([
      prisma.sermon.count({ where }),
      prisma.sermon.findMany({
        where,
        orderBy: [{ updatedAt: "desc" }, { date: "desc" }],
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);

    return NextResponse.json({ total, data });
  } catch (err) {
    // 1）把错误打印到 Vercel 函数日志
    console.error("🔥 GET /api/sermons 出错：", err);
    // 2）返回一个 JSON 错误给前端，避免返回空
    return NextResponse.json(
      { error: err.message || "服务器内部错误" },
      { status: 500 }
    );
  }
}

// POST /api/sermons
export async function POST(request) {
  try {
    const formData = await request.formData();
    const adminPw = formData.get("adminPw");
    if (adminPw !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // If neither a YouTube ID is provided nor a file is uploaded, return an error.
    const yt = formData.get("youtubeId")?.toString().trim();
    if (!yt && !(formData.get("file") instanceof File)) {
      return NextResponse.json(
        {
          error:
            "You must either enter a YouTube video ID or upload a media file - one is required.",
        },
        { status: 400 }
      );
    }

    async function uploadFile(fieldName, prefix) {
      const file = formData.get(fieldName);
      if (!(file instanceof File)) return null;
      const buf = Buffer.from(await file.arrayBuffer());
      const key = `${Date.now()}_${prefix}_${file.name}`;
      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.R2_BUCKET,
          Key: key,
          Body: buf,
          ContentType: file.type,
        })
      );
      return key;
    }

    // upload main sermon media
    // const key = await uploadFile("file", "media");
    const key = yt ? null : await uploadFile("file", "media");
    const speakerImageUrl = await uploadFile("speakerImageFile", "speaker");
    const sermonImageUrl = await uploadFile("sermonImageFile", "sermon");

    const sermon = await prisma.sermon.create({
      data: {
        title: formData.get("title"),
        speaker: formData.get("speaker") || null,
        date: new Date(formData.get("date")),
        scripture: formData.get("scripture") || null,
        description: formData.get("description") || null,
        note: formData.get("note") || null,
        type:
          formData.get("type") === "video"
            ? ContentType.VIDEO
            : ContentType.AUDIO,
        key: key || null,
        youtubeId: yt || null,
        speakerImage: speakerImageUrl,
        sermonImage: sermonImageUrl,
      },
    });

    return NextResponse.json(sermon, { status: 201 });
  } catch (err) {
    console.error("🔥 POST /api/sermons 出错：", err);
    return NextResponse.json(
      { error: err.message || "服务器内部错误" },
      { status: 500 }
    );
  }
}
