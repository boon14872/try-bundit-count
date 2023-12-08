import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const prisma = new PrismaClient();
  const data = await prisma.bunditcmru.findFirst();
  return NextResponse.json({
    id: data?.id.toString(),
    c: data?.c?.toString(),
    counting: data?.counting?.toString(),
    konrub: data?.konrub?.toString(),
    timeuse: data?.timeuse,
    un: data?.un,
  });
}
