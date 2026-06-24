"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const appointments = [
  {
    id: 1,
    name: "Budi",
    phone: "08123456789",
    date: "26 June 2026",
    time: "15:00",
    type: "Trial",
    status: "Pending",
  },
  {
    id: 2,
    name: "Sinta",
    phone: "082111111",
    date: "27 June 2026",
    time: "10:00",
    type: "Consult",
    status: "Pending",
  },
  {
    id: 3,
    name: "Andi",
    phone: "085777777",
    date: "28 June 2026",
    time: "13:00",
    type: "Trial",
    status: "Done",
  },
];

export default function AppointmentPage() {
  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");

  const filteredAppointments = appointments.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.phone.includes(search);

    const matchFilter = filter === "All" ? true : item.type === filter;

    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <div
        className="
flex
justify-between
items-center
"
      >
        <h2 className="text-2xl font-semibold">Appointment</h2>

        {/* SEARCH FILTER */}

        <div
          className="
flex
justify-center
gap-3
"
        >
          <div className="relative">
            <Icon
              icon="solar:magnifer-linear"
              width={18}
              className="
absolute
right-3
top-1/2
-translate-y-1/2
text-gray-400
"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name / phone"
              className="
h-10
w-80
rounded-xl
border
pl-10
"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="
h-10
px-4
rounded-xl
border
flex
items-center
gap-2
"
              >
                <Icon icon="tabler:filter" width={18} />

                {filter}
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              {["All", "Trial", "Consult"].map((item) => (
                <DropdownMenuItem key={item} onClick={() => setFilter(item)} className="cursor-pointer">
                  {item}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Link
          href="/marketing/appointment/create"
          className="
bg-primary
text-white
px-4
py-2
rounded-xl
flex
items-center
gap-2
"
        >
          <Icon icon="tabler:plus" width={18} />
          Add Appointment
        </Link>
      </div>

      {/* TABLE */}

      <div className="card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr>
              <th>Name</th>

              <th>Phone</th>

              <th>Date</th>

              <th>Time</th>

              <th>Type</th>

              <th>Status</th>

              <th></th>
            </tr>
          </thead>

          <tbody>
            {filteredAppointments.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="py-3">{item.name}</td>

                <td>{item.phone}</td>

                <td>{item.date}</td>

                <td>{item.time}</td>

                <td>
                  <span
                    className="
px-3
py-1
rounded-full
text-xs
bg-blue-100
text-blue-700
font-semibold
"
                  >
                    {item.type}
                  </span>
                </td>

                <td>
                  <span
                    className={`
px-3
py-1
rounded-full
text-xs
font-semibold


${item.status === "Done" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}

`}
                  >
                    {item.status}
                  </span>
                </td>

                <td>
                  <Link
                    href={`/marketing/appointment/${item.id}/edit`}
                    className="
text-gray-500
hover:text-primary
"
                  >
                    <Icon icon="tabler:pencil" width={19} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
