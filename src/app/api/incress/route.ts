import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log("GET");

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
  );

  const {
    data,
    error,
  }: {
    data: ApiData[] | null;
    error: any;
  } = await supabase.from("bunditcmru").select("*");
  if (!data || error) {
    return NextResponse.json(
      {
        error: error,
      },
      {
        status: 400,
      }
    );
  }

  const updateValue = {
    konrub: data[0].konrub + 1,
    timeuse: data[0].timeuse,
  };

  const { updateData, updateError }: any = await supabase
    .from("bunditcmru")
    .update({ konrub: data[0].konrub + 1 })
    .eq("id", data[0].id);

  if (updateError || !updateData) {
    return NextResponse.json(
      {
        error: updateError,
      },
      {
        status: 400,
      }
    );
  }
  const res = NextResponse.json(
    {
      result: updateData,
      status: "success",
    },
    {
      status: 200,
    }
  );
  res.headers.set("Access-Control-Allow-Origin", "*");
  // no cache
  res.headers.set("Cache-Control", "no-store, max-age=0");
  return res;
}
