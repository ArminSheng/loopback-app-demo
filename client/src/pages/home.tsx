import { Roles, useMyReservations } from "@/data";
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
        <div className="flex justify-between items-center">
          <h2 className="text-black font-bold mb-10">Reservations</h2>
          {user?.role === Roles.GUEST && (
            <Link
              as={"button"}
              href="/book"
              className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Book New
            </Link>
          )}
        </div>
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
                        Guest Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                      >
                        <span className="pl-4">Arrival Time</span>
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                      >
                        <span className="pl-4">Table Size</span>
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {reservations?.length ? (
                      <>
                        {reservations?.map((item) => (
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
                              {new Date(item.arrivalTime).toLocaleString()}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500">
                              {item.tableSize}
                            </td>
                            <td
                              className={classNames(
                                {
                                  "text-red-500": item.status === "Cancelled",
                                },
                                {
                                  "text-green-500": item.status === "Completed",
                                },
                                "relative whitespace-nowrap py-4 pl-3 pr-4 text-sm text-center font-medium sm:pr-6"
                              )}
                            >
                              {item.status}
                            </td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <tr>
                        <td colSpan={4}>
                          <div className="py-10 font-medium w-full text-center text-gray-500 overflow-hidden text-ellipsis">
                            No Records
                          </div>
                        </td>
                      </tr>
                    )}
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
