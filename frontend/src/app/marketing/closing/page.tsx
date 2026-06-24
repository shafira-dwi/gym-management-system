"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const payments = [
  {
    id: 1,
    name: "Budi",
    package: "Premium",
    total: "500.000",
    date: "26 June 2026",
    status: "Success",
  },
  {
    id: 2,
    name: "Andi",
    package: "Basic",
    total: "300.000",
    date: "27 June 2026",
    status: "Waiting",
  },
  {
    id: 3,
    name: "Sinta",
    package: "Gold",
    total: "800.000",
    date: "28 June 2026",
    status: "Success",
  },
];

export default function ClosingPage() {
  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");

  const closing = 20;

  const target = 30;

  const progress = (closing / target) * 100;

  const filteredPayments = payments.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.package.toLowerCase().includes(search.toLowerCase());

    const matchFilter = filter === "All" ? true : item.status === filter;

    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6">
      {/* TARGET */}

      <div className="card">
        <div
          className="
flex
justify-between
items-center
"
        >
          <div>
            <h2>Closing Target</h2>

            <p
              className="
text-sm
text-gray-500
"
            >
              {closing} / {target} Closing
            </p>
          </div>

          <span
            className="
font-semibold
"
          >
            {progress.toFixed(0)}%
          </span>
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
          ></div>
        </div>
      </div>

      {/* HEADER */}

      <div
        className="
flex
justify-between
items-center
"
      >
        <h1
          className="
text-2xl
font-semibold
"
        >
          Closing
        </h1>

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
              placeholder="Search member / package"
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
              {["All", "Waiting", "Success"].map((item) => (
                <DropdownMenuItem key={item} onClick={() => setFilter(item)} className="cursor-pointer">
                  {item}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Link
          href="/marketing/closing/create"
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
            <tr>
              <th>Member</th>

              <th>Package</th>

              <th>Total</th>

              <th>Date</th>

              <th>Status</th>

              <th></th>
            </tr>
          </thead>

          <tbody>
            {filteredPayments.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="py-3">{item.name}</td>

                <td>{item.package}</td>

                <td>Rp {item.total}</td>

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
                    href={`/marketing/closing/${item.id}/edit`}
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
