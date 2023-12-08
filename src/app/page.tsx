"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const insituteName = "มหาวิทยาลัยราชภัฏเชียงใหม่";
  const graduateCount = 1000;
  const graduateCounted = 100;
  const graduateRemaining = graduateCount - graduateCounted;

  const timeUsed = 100;
  const timeRemaining = 100;
  const timeEstimate = 100;

  const [nowTime, setNowTime] = useState(
    new Date().toLocaleTimeString("th-TH", { timeZone: "Asia/Bangkok" })
  );

  const tick = () => {
    setNowTime(
      new Date().toLocaleTimeString("th-TH", { timeZone: "Asia/Bangkok" })
    );
  };

  setInterval(tick, 1000);

  return (
    <main>
      {/* navbar for Rajabhat University name like มหาวิทยาลัยราชภัฏเชียงใหม่ */}
      <div className="flex flex-col justify-center items-center min-h-screen bg-white">
        <div className="flex flex-row w-full bg-yellow-300 h-fit gap-3 items-center p-2 justify-between border-b-2 border-gray-100 shadow-sm">
          <div className="flex flex-row items-center gap-2">
            <Image src="/cmru.png" width={100} height={100} alt={""} />
            <div className="text-2xl font-bold text-gray-800">
              {insituteName}
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-800">
              จำนวนบัณฑิตทั้งหมด {graduateCount} คน
            </div>
          </div>
        </div>
        {/* content */}
        <div className="w-5/6 justify-center mx-auto py-4 shadow-sm rounded-lg flex flex-col gap-4 h-full my-auto mt-auto">
          <div className="flex flex-row w-full h-full gap-3">
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
                {timeUsed}
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
                {timeRemaining}
              </div>
            </div>
            <div className="flex flex-row items-center justify-center gap-3  w-full h-full px-2 py-3">
              <div className="text-2xl font-bold text-gray-800 text-center">
                คาดการณ์เวลาสิ้นสุด
              </div>
              <div className="text-2xl font-bold text-gray-800 text-center">
                {timeEstimate}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
