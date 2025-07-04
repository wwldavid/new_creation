import { NextResponse } from "next/server";
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

export async function POST(req) {
  const form = await req.formData();
  const file = form.get("file");
  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const filename = file.name;
  const key = `${Date.now()}-${filename}`;
  const arrayBuffer = await file.arrayBuffer();

  // 通过 AWS SDK 的 S3 兼容接口上传到 R2
  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET,
      Key: key,
      Body: arrayBuffer,
      ContentType: file.type,
    })
  );

  return NextResponse.json({ key });
}
