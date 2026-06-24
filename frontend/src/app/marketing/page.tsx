"use client";

import Link from "next/link";

const members = [
  {
    id: 1,
    name: "Budi",
    phone: "08123456789",
    package: "3+3 Month",
    status: "Active",
  },
  {
    id: 2,
    name: "Andi",
    phone: "085777777",
    package: "1 Month",
    status: "Reminder",
  },
  {
    id: 3,
    name: "Sinta",
    phone: "082111111",
    package: "3+3 Month",
    status: "Expired",
  },
  {
    id: 4,
    name: "Rina",
    phone: "081999999",
    package: "1 Year",
    status: "Active",
  },
  {
    id: 5,
    name: "Doni",
    phone: "08988888",
    package: "3+3 Month",
    status: "Active",
  },
];

const appointments = [
  {
    name: "Budi",
    date: "26 Jun",
    time: "15:00",
    type: "Trial",
  },
  {
    name: "Sinta",
    date: "27 Jun",
    time: "10:00",
    type: "Consult",
  },
  {
    name: "Rudi",
    date: "28 Jun",
    time: "13:00",
    type: "Trial",
  },
];

export default function MarketingDashboard() {
  const closing = 20;
  const target = 30;

  const progress = (closing / target) * 100;

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Marketing Dashboard</h2>
      {/* STATS */}

      <div className="stats">
        <div className="card">
          <h3>Total Closing</h3>
          <h1>{closing}</h1>
          <span>Since last month</span>
        </div>

        <div className="card">
          <h3>Active Member</h3>
          <h1>15</h1>
          <span>Since last year</span>
        </div>

        <div className="card">
          <h3>Expired</h3>
          <h1>5</h1>
        </div>

        <div className="card">
          <h3>Renewal Reminder</h3>
          <h1>3</h1>
        </div>
      </div>

      {/* TARGET */}

      <div className="card">
        <div className="flex justify-between">
          <div>
            <h3>Closing Target</h3>

            <h1>
              {closing}

              <span className="text-sm text-gray-400">/ {target}</span>
            </h1>
          </div>

          <p>{progress.toFixed(0)}%</p>
        </div>

        <div
          className="
w-full
bg-gray-200
h-3
rounded-full
mt-4
"
        >
          <div
            className="
bg-primary
h-3
rounded-full
"
            style={{
              width: `${progress}%`,
            }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* MEMBER TABLE */}

        <div
          className="
card
col-span-2
"
        >
          <div className="flex justify-between mb-4">
            <h3>Members</h3>

            <Link href="/marketing/members" className="text-primary text-sm">
              See all
            </Link>
          </div>

          <table className="w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Package</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {members.map((member) => (
                <tr key={member.id}>
                  <td>{member.name}</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* APPOINTMENT */}

        <div className="card">
          <div className="flex justify-between mb-4">
            <h3>Appointment</h3>

            <Link href="/marketing/appointment" className="text-primary text-sm">
              See all
            </Link>
          </div>

          <div className="space-y-3">
            {appointments.map((item, index) => (
              <div key={index} className="border-b pb-2">
                <p className="font-semibold">{item.name}</p>

                <p className="text-sm text-gray-500">
                  {item.date} -{item.time}
                </p>

                <span className="text-xs">{item.type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
