"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const members = [
  {
    id: 1,
    name: "Andi Saputra",
    phone: "08123456789",
    package: "Muscle Build",
    goal: "Gain Muscle",
    session: "8/20",
    progress: 40,
    status: "Active",
  },

  {
    id: 2,
    name: "Sinta Amelia",
    phone: "082111111",
    package: "Weight Loss",
    goal: "Fat Loss",
    session: "15/20",
    progress: 75,
    status: "Active",
  },

  {
    id: 3,
    name: "Budi Rahman",
    phone: "085777777",
    package: "Beginner",
    goal: "Fitness",
    session: "3/10",
    progress: 30,
    status: "Inactive",
  },

  {
    id: 4,
    name: "Rina Putri",
    phone: "081999999",
    package: "Premium PT",
    goal: "Body Shape",
    session: "18/20",
    progress: 90,
    status: "Active",
  },
];

export default function PTMembersPage() {
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

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">My Members</h2>

          <p className="text-gray-500">Members assigned to you</p>
        </div>

        <div className="flex gap-3">
          {/* SEARCH */}

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
w-72
rounded-xl
border
pl-4
"
            />
          </div>

          {/* FILTER */}

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
              {["All", "Active", "Inactive"].map((item) => (
                <DropdownMenuItem key={item} onClick={() => setFilter(item)} className="cursor-pointer">
                  {item}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* TABLE */}

      <div className="card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Member</th>

              <th className="text-left">Package</th>

              <th className="text-left">Goal</th>

              <th className="text-left">Session</th>

              <th className="text-left">Progress</th>

              <th className="text-left">Status</th>

              <th></th>
            </tr>
          </thead>

          <tbody>
            {filteredMembers.map((member) => (
              <tr key={member.id} className="border-t">
                <td className="py-3">
                  <div>
                    <p className="font-medium">{member.name}</p>

                    <p className="text-sm text-gray-500">{member.phone}</p>
                  </div>
                </td>

                <td>{member.package}</td>

                <td>{member.goal}</td>

                <td>{member.session}</td>

                <td className="w-40">
                  <div
                    className="
bg-gray-200
rounded-full
h-2
"
                  >
                    <div
                      className="
bg-primary
h-2
rounded-full
"
                      style={{
                        width: `${member.progress}%`,
                      }}
                    />
                  </div>

                  <p className="text-xs mt-1">{member.progress}%</p>
                </td>

                <td>
                  <span
                    className={`
px-3
py-1
rounded-full
text-xs
font-semibold

${member.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}

`}
                  >
                    {member.status}
                  </span>
                </td>

                <td>
                  <Link
                    href={`/dashboard/pt/members/${member.id}`}
                    className="
text-gray-500
hover:text-primary
"
                  >
                    <Icon icon="tabler:eye" width={19} />
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
