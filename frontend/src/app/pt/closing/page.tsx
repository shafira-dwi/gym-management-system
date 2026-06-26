"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const payments = [
  {
    id: 1,
    name: "Budi",
    session: 20,
    total: 2000000,
    date: "26 June 2026",
    status: "Success",
  },

  {
    id: 2,
    name: "Andi",
    session: 10,
    total: 1000000,
    date: "27 June 2026",
    status: "Waiting",
  },

  {
    id: 3,
    name: "Sinta",
    session: 15,
    total: 1500000,
    date: "28 June 2026",
    status: "Success",
  },

  {
    id: 4,
    name: "Rina",
    session: 20,
    total: 2500000,
    date: "30 June 2026",
    status: "Waiting",
  },
];

export default function ClosingPage() {
  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");

  // TARGET

  const target = 10000000;

  const currentIncome = payments.filter((item) => item.status === "Success").reduce((total, item) => total + item.total, 0);

  const progress = target > 0 ? Math.min((currentIncome / target) * 100, 100) : 0;

  const filteredPayments = payments.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());

    const matchFilter = filter === "All" ? true : item.status === filter;

    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6">
      {/* TARGET */}

      <div className="card">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">Income Target</h2>

            <p className="text-sm text-gray-500">
              Rp {currentIncome.toLocaleString("id-ID")}/ Rp {target.toLocaleString("id-ID")}
            </p>
          </div>

          <span className="font-semibold">{progress.toFixed(0)}%</span>
        </div>

        <div
          className="
w-full
h-3
bg-gray-200
rounded-full
mt-4
overflow-hidden
"
        >
          <div
            className="
h-3
bg-primary
rounded-full
"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      {/* HEADER */}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Closing</h1>

          <p className="text-gray-500">PT payment history</p>
        </div>

        <div className="flex gap-3">
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
              placeholder="Search member"
              className="
h-10
w-80
rounded-xl
border
pl-4
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
              {["All", "Waiting", "Success"].map((item) => (
                <DropdownMenuItem key={item} onClick={() => setFilter(item)} className="cursor-pointer">
                  {item}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Link
          href="/dashboard/pt/closing/create"
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
          Add Payment
        </Link>
      </div>

      {/* TABLE */}

      <div className="card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3">Member</th>

              <th className="text-left p-3">Session</th>

              <th className="text-left p-3">Total</th>

              <th className="text-left p-3">Date</th>

              <th className="text-left p-3">Status</th>

              <th></th>
            </tr>
          </thead>

          <tbody>
            {filteredPayments.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-3">{item.name}</td>

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
                    {item.session} Session
                  </span>
                </td>

                <td>Rp {item.total.toLocaleString("id-ID")}</td>

                <td>{item.date}</td>

                <td>
                  <span
                    className={`

px-3
py-1
rounded-full
text-xs
font-semibold


${item.status === "Success" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}

`}
                  >
                    {item.status}
                  </span>
                </td>

                <td>
                  <Link
                    href={`/dashboard/pt/closing/${item.id}/edit`}
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
