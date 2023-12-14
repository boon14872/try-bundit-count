import { createClient } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  // get data from supabase
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

  if (error) {
    return NextResponse.json(error, {
      status: 500,
    });
  }

  if (!data) {
    return NextResponse.json([], {
      status: 200,
    });
  }

  const updateValue = {
    konrub: data[0].konrub + 1,
    timeuse: data[0].timeuse,
  }

  const { updateData, updateError }: any = await supabase
    .from("bunditcmru")
    .update({ konrub: data[0].konrub + 1 })
    .eq("id", data[0].id);

  if (updateError) {
    return NextResponse.json(updateError, {
      status: 500,
    });
  }
  if (!updateData) {
    return NextResponse.json([], {
      status: 200,
    });
  }

  return NextResponse.json(updateData, {
    status: 200,
  });
}
