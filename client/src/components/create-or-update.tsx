import { Reservation } from "@/data";
import { Select } from "@chakra-ui/react";
import { FormEvent, useMemo } from "react";

export type ReservationComponentProps = {
  onSubmit: (e: FormEvent) => void;
  reservation: Partial<Reservation>;
  title?: string;
  submitText?: string;
  isAdmin?: boolean;
  onCancel?: () => void;
};

export function CreateOrUpdateReservation({
  onSubmit,
  reservation: { guestName, contactInfo, tableSize, status, arrivalTime },
  title,
  submitText = "Submit",
  isAdmin,
  onCancel,
}: ReservationComponentProps) {
  const dateStr = useMemo(() => {
    if (!arrivalTime) return undefined;
    const arrival = new Date(arrivalTime);

    return {
      date: `${arrival.getFullYear()}-${arrival.getMonth() < 11 ? 0 : ""}${
        arrival.getMonth() + 1
      }-${arrival.getDate() < 11 ? 0 : ""}${arrival.getDate() + 1}`,
      time: `${arrival.getHours()}:${arrival.getMinutes()}`,
    };
  }, [arrivalTime]);

  const isDisabled = useMemo(
    () => status === "Cancelled" || status === "Completed",
    [status]
  );

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {title}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={onSubmit}>
            <div>
              <label
                htmlFor="guestName"
                className="block text-sm font-medium text-gray-700"
              >
                Guest Name
              </label>
              <div className="mt-1">
                <input
                  id="guestName"
                  disabled={isDisabled}
                  name="guestName"
                  defaultValue={guestName}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  //   onChange={onEmail}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact"
                className="block text-sm font-medium text-gray-700"
              >
                Contact
              </label>
              <div className="mt-1">
                <input
                  disabled={isDisabled}
                  id="contactInfo"
                  name="contactInfo"
                  minLength={11}
                  maxLength={11}
                  defaultValue={contactInfo}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="arrivalTime"
                className="block text-sm font-medium text-gray-700"
              >
                Arrival Time
              </label>
              <div className="mt-1">
                <input
                  disabled={isDisabled}
                  type="date"
                  required
                  defaultValue={dateStr?.date}
                  name="arrivalTime"
                  className="inline mr-2 appearance-none px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <input
                  type="time"
                  disabled={isDisabled}
                  required
                  defaultValue={dateStr?.time}
                  name="arrivalHour"
                  className="inline appearance-none px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="tableSize"
                className="block text-sm font-medium text-gray-700"
              >
                Table Size
              </label>
              <div className="mt-1">
                <Select
                  name="tableSize"
                  disabled={isDisabled}
                  required
                  defaultValue={tableSize}
                  placeholder={tableSize || "Select table size"}
                  id="tableSize"
                >
                  <option defaultChecked={true} defaultValue="XS" value="XS">
                    XS
                  </option>
                  <option value="MD">MD</option>
                  <option value="LG">LG</option>
                </Select>
              </div>
            </div>

            {status && (
              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                {isAdmin ? (
                  <>
                    <Select
                      name="status"
                      disabled={isDisabled}
                      defaultValue={status}
                      placeholder={status}
                      id="status"
                    >
                      <option value="Reserved">Reserved</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </Select>
                  </>
                ) : (
                  <div className="mt-1 text-gray-500 italic">{status}</div>
                )}
              </div>
            )}

            {!isDisabled && (
              <div className="flex items-center justify-between">
                {!isAdmin && onCancel && (
                  <button
                    type="button"
                    onClick={onCancel}
                    className="mr-5 flex flex-1 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isDisabled}
                  className="flex flex-1 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {submitText}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
