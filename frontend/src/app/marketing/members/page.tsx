"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const members = [
  {
    id: 1,
    name: "Budi",
    phone: "08123456789",
    package: "Premium",
    status: "Active",
  },
  {
    id: 2,
    name: "Andi",
    phone: "085777777",
    package: "Basic",
    status: "Reminder",
  },
  {
    id: 3,
    name: "Sinta",
    phone: "082111111",
    package: "Premium",
    status: "Expired",
  },
  {
    id: 4,
    name: "Rina",
    phone: "081999999",
    package: "Gold",
    status: "Active",
  },
  {
    id: 5,
    name: "Doni",
    phone: "08988888",
    package: "Basic",
    status: "Expired",
  },
];

export default function MembersPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredMembers = members.filter((member) => {
    const matchSearch = member.name.toLowerCase().includes(search.toLowerCase()) || member.phone.includes(search);

    const matchStatus = filter === "All" ? true : member.status === filter;

    return matchSearch && matchStatus;
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
        <h2
          className="
        text-2xl
        font-semibold
        "
        >
          Members
        </h2>

        {/* SEARCH + FILTER */}

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
            border
            rounded-xl
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
              {["All", "Active", "Reminder", "Expired"].map((item) => (
                <DropdownMenuItem key={item} onClick={() => setFilter(item)} className="cursor-pointer">
                  {item}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Link
          href="/marketing/members/create"
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
          Add Member
        </Link>
      </div>

      {/* TABLE */}

      <div className="card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Name</th>

              <th className="text-left">Phone</th>

              <th className="text-left">Package</th>

              <th className="text-left">Status</th>

              <th></th>
            </tr>
          </thead>

          <tbody>
            {filteredMembers.map((member) => (
              <tr key={member.id} className="border-t">
                <td className="py-3">{member.name}</td>

                <td>{member.phone}</td>

                <td>{member.package}</td>

                <td>
                  <span
                    className={`
                  px-3
                  py-1
                  rounded-full
                  text-xs
                  font-semibold

                  ${member.status === "Active" ? "bg-green-100 text-green-700" : member.status === "Reminder" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}

                  `}
                  >
                    {member.status}
                  </span>
                </td>

                <td>
                  <Link
                    href={`/marketing/members/${member.id}/edit`}
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
