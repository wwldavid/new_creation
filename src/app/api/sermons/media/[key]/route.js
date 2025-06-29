import { NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

export async function GET(request, { params }) {
  const { key } = params;
  const range = request.headers.get("range")?.trim();
  const cmd = new GetObjectCommand({
    Bucket: process.env.R2_BUCKET,
    Key: key,
    ...(range ? { Range: range } : {}),
  });
  const s3res = await s3.send(cmd);
  const headers = {
    "Content-Type": s3res.ContentType,
    "Accept-Ranges": "bytes",
    "Access-Control-Allow-Origin": "*",
  };
  if (range && s3res.ContentRange) {
    headers["Content-Range"] = s3res.ContentRange;
    return new NextResponse(s3res.Body, { status: 206, headers });
  }
  return new NextResponse(s3res.Body, { status: 200, headers });
}
