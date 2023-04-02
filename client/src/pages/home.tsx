import { useMyReservations } from "@/data";
import classNames from "classnames";
import useUser from "@/data/use-user";
import Link from "next/link";
import { useCallback } from "react";
import Router from "next/router";

export default function Home() {
  const { user } = useUser({ redirectTo: "/login" });
  const { reservations } = useMyReservations(user);

  const goUpdate = useCallback((id: string) => {
    return () => Router.push(id);
  }, []);

  return (
    <>
      {/* <div>{reservations?.length}</div> */}
      <div className="px-4 sm:px-6 lg:px-0">
        <div className="my-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        姓名
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                      >
                        <span className="pl-4">时间</span>
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                      >
                        <span className="pl-4">大小</span>
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                      >
                        状态
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {reservations?.map((item, idx) => (
                      <tr
                        key={item.id}
                        onClick={goUpdate(item.id)}
                        className="cursor-pointer"
                      >
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          <div className="font-medium text-gray-900 max-w-[10vw] overflow-hidden text-ellipsis">
                            {item.guestName}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500 max-w-[10vw] overflow-hidden text-ellipsis">
                          {item.arrivalTime}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500">
                          {item.tableSize}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm text-center font-medium sm:pr-6">
                          {item.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
