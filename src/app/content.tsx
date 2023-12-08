export default function Content(
    graduateCounted: string,
    graduateRemaining: string,
    timeUsed: string,
    timeRemaining: string,
    timeEstimate: string,
    nowTime: string
) {
  return (
    <>
      <div className="w-5/6 justify-center mx-auto py-4 shadow-sm rounded-lg flex flex-col gap-4 h-full my-auto mt-auto">
        <div className="flex flex-row w-full h-full gap-3">
          <div className="w-full h-full flex flex-col gap-6 items-center bg-green-400 p-4 pt-6 border border-gray-200 rounded-lg shadow-lg text-white">
            <div className="text-3xl font-bold text-gray-800 text-center">
              จำนวนบัณฑิตที่รับไปแล้ว
            </div>
            <div className="text-7xl font-bold text-gray-800 text-center border border-gray-200 rounded-lg bg-white px-4 py-2 shadow-md">
              {graduateCounted}
            </div>
            <div className="text-xl font-bold text-gray-800 text-right">คน</div>
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
    </>
  );
}
