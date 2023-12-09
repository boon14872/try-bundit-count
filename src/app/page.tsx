"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Home() {
  const [insituteName, setInsituteName] = useState(
    "มหาวิทยาลัยราชภัฏเชียงใหม่"
  );
  const [graduateCount, setGraduateCount] = useState(0);
  const [graduateCounted, setGraduateCounted] = useState(0);
  const [graduateRemaining, setGraduateRemaining] = useState(0);
  const [timeUsed, setTimeUsed] = useState("00:00:00");
  const [usedTime, setUsedTime] = useState("00:00:00");

  const [estimatedTime, setEstimatedTime] = useState("00:00:00");

  const [nowTime, setNowTime] = useState(
    new Date().toLocaleTimeString("th-TH", {
      hour12: false,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    })
  );

  const supabase = createClientComponentClient();

  const fetchGraduateCount = async () => {
    const { data, error } = await supabase
      .from("bunditcmru")
      .select("*")
      .single();
    if (error) {
      console.log(error);
    } else {
      setInsituteName(`มหาวิทยาลัยราชภัฏ${data.un}`);
      setGraduateCount(+data.c);
      setGraduateCounted(+data.konrub);
      setGraduateRemaining(+data.counting);
      setUsedTime(data.timeuse);

      const timeUsedSplit = data.timeuse.split(":");
      const timeUsedHour = +timeUsedSplit[0];
      const timeUsedMinute = +timeUsedSplit[1];
      const timeUsedSecond = +timeUsedSplit[2];
      const timeUsedInSecond =
        timeUsedHour * 3600 + timeUsedMinute * 60 + timeUsedSecond;
      const timeUsedInSecondPerPerson = timeUsedInSecond / data.konrub;
      const timeUsedInSecondPerPersonEstimated =
        timeUsedInSecondPerPerson * data.counting;
      const timeUsedInSecondPerPersonEstimatedHour = Math.floor(
        timeUsedInSecondPerPersonEstimated / 3600
      );
      const timeUsedInSecondPerPersonEstimatedMinute = Math.floor(
        (timeUsedInSecondPerPersonEstimated % 3600) / 60
      );
      const timeUsedInSecondPerPersonEstimatedSecond = Math.floor(
        (timeUsedInSecondPerPersonEstimated % 3600) % 60
      );
      setTimeUsed(
        `${
          Number.isNaN(timeUsedInSecondPerPersonEstimatedHour)
            ? 0
            : timeUsedInSecondPerPersonEstimatedHour.toString().padStart(2, "0")
        }:${
          Number.isNaN(timeUsedInSecondPerPersonEstimatedMinute)
            ? 0
            : timeUsedInSecondPerPersonEstimatedMinute
                .toString()
                .padStart(2, "0")
        }:${
          Number.isNaN(timeUsedInSecondPerPersonEstimatedSecond)
            ? 0
            : timeUsedInSecondPerPersonEstimatedSecond
                .toString()
                .padStart(2, "0")
        }`
      );

      const nowTimeSplit = nowTime.split(":");
      const nowTimeHour = +nowTimeSplit[0];
      const nowTimeMinute = +nowTimeSplit[1];
      const nowTimeSecond = +nowTimeSplit[2];
      const nowTimeInSecond =
        nowTimeHour * 3600 + nowTimeMinute * 60 + nowTimeSecond;

      const endTime = nowTimeInSecond + timeUsedInSecondPerPersonEstimated;
      const endTimeHour = Math.floor(endTime / 3600);
      const endTimeMinute = Math.floor((endTime % 3600) / 60);
      const endTimeSecond = Math.floor((endTime % 3600) % 60);

      setEstimatedTime(
        `${
          Number.isNaN(endTimeHour)
            ? 0
            : endTimeHour.toString().padStart(2, "0")
        }:${
          Number.isNaN(endTimeMinute)
            ? 0
            : endTimeMinute.toString().padStart(2, "0")
        }:${
          Number.isNaN(endTimeSecond)
            ? 0
            : endTimeSecond.toString().padStart(2, "0")
        }`
      );
    }
  };

  const tick = () => {
    setNowTime(
      new Date().toLocaleTimeString("th-TH", {
        hour12: false,
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      })
    );
  };
  // set interval for update time every 1 second and fetch data every 1 second
  useEffect(() => {
    const timer = setInterval(() => {
      tick();
      fetchGraduateCount();
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main>
      {/* navbar for Rajabhat University name like มหาวิทยาลัยราชภัฏเชียงใหม่ */}
      <div className="flex flex-col justify-center items-center min-h-screen bg-white">
        <div className="flex md:flex-row flex-col w-full bg-yellow-300 h-fit gap-3 items-center p-2 justify-between border-b-2 border-gray-100 shadow-sm">
          <div className="flex flex-row items-center gap-2">
            <Image src="/cmru.png" width={100} height={100} alt={""} />
            <div className="text-2xl font-bold text-gray-800">
              {insituteName}
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-800 pr-4">
              จำนวนบัณฑิตทั้งหมด {graduateCount} คน
            </div>
          </div>
        </div>
        {/* content */}
        <div className="w-5/6 justify-center mx-auto py-4 shadow-sm rounded-lg flex flex-col gap-4 h-full my-auto mt-auto">
          <div className="flex md:flex-row flex-col w-full h-full gap-3">
            <div className="w-full h-full flex flex-col gap-6 items-center bg-green-400 p-4 pt-6 border border-gray-200 rounded-lg shadow-lg text-white">
              <div className="text-3xl font-bold text-gray-800 text-center">
                จำนวนบัณฑิตที่รับไปแล้ว
              </div>
              <div className="text-7xl font-bold text-gray-800 text-center border border-gray-200 rounded-lg bg-white px-4 py-2 shadow-md">
                {graduateCounted}
              </div>
              <div className="text-xl font-bold text-gray-800 text-right">
                คน
              </div>
            </div>
            <div className="w-full h-full flex flex-col gap-6 items-center bg-amber-400 p-4 pt-6 border border-gray-200 rounded-lg shadow-lg text-white">
              <div className="text-3xl font-bold text-gray-800 text-center">
                จำนวนบัณฑิตที่คงเหลือ
              </div>
              <div className="text-7xl font-bold text-gray-800 text-center border border-gray-200 rounded-lg bg-white px-4 py-2 shadow-md">
                {graduateRemaining}
              </div>
              <div className="text-2xl font-bold text-gray-800 text-right">
                คน
              </div>
            </div>
          </div>
          <div className="w-full h-1 bg-red-300 bg-gradient-to-r from-green-300 to-red-400 shadow-lg rounded-lg my-4"></div>
          <div className="flex md:flex-row flex-col gap-3">
            <div className="flex flex-row items-center justify-center gap-3  w-full h-full px-2 py-3">
              <div className="text-2xl font-bold text-gray-800 text-center">
                เวลาที่ใช้ไปแล้ว
              </div>
              <div className="text-2xl font-bold text-gray-800 text-center">
                {usedTime}
              </div>
            </div>
            <div className="flex flex-row items-center justify-center gap-3  w-full h-full px-2 py-3">
              <div className="text-2xl font-bold text-gray-800 text-center">
                เวลาปัจจุบัน
              </div>
              <div className="text-2xl font-bold text-gray-800 text-center">
                {nowTime}
              </div>
            </div>
          </div>
          <div className="flex gap-3 md:flex-row flex-col">
            <div className="flex flex-row items-center justify-center gap-3  w-full h-full px-2 py-3">
              <div className="text-2xl font-bold text-gray-800 text-center">
                ต้องใช้เวลาอีก
              </div>
              <div className="text-2xl font-bold text-gray-800 text-center">
                {timeUsed}
              </div>
            </div>
            <div className="flex flex-row items-center justify-center gap-3  w-full h-full px-2 py-3">
              <div className="text-2xl font-bold text-gray-800 text-center">
                คาดการณ์เวลาสิ้นสุด
              </div>
              <div className="text-2xl font-bold text-gray-800 text-center">
                {estimatedTime}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
