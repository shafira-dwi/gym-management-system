"use client";

import { useState } from "react";

export default function PTDashboard() {
  const [selectedDate, setSelectedDate] = useState(24);

  const schedule = [
    {
      time: "09:00",
      member: "Andi Saputra",
      phone: "0895273397",
      package: "Muscle Build",
      status: "Upcoming",
    },

    {
      time: "13:00",
      member: "Sinta Amelia",
      phone: "0892347892",
      package: "Weight Loss",
      status: "Ongoing",
    },

    {
      time: "16:00",
      member: "Budi Rahman",
      phone: "08122121212",
      package: "Personal Training",
      status: "Completed",
    },
  ];

  const members = [
    {
      name: "Andi Saputra",
      phone: "0828773933",
      package: "Muscle Build",
      session: "8/20",
      progress: 40,
    },

    {
      name: "Sinta Amelia",
      phone: "0899797797",
      package: "Weight Loss",
      session: "15/20",
      progress: 75,
    },

    {
      name: "Budi Rahman",
      phone: "083232325757",
      package: "Beginner",
      session: "5/10",
      progress: 50,
    },
  ];

  const calendarEvents = [
    {
      date: 24,
      type: "Training",
      title: "Andi - Muscle Build",
      time: "09:00",
    },

    {
      date: 24,
      type: "Appointment",
      title: "Consultation Sinta",
      time: "14:00",
    },

    {
      date: 27,
      type: "Training",
      title: "Budi - Weight Loss",
      time: "16:00",
    },
  ];

  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  const selectedEvents = calendarEvents.filter((item) => item.date === selectedDate);

  // CLOSING TARGET

  const target = 10000000;

  // sementara mengikuti data closing

  const closingData = [
    {
      total: 2000000,
      status: "Success",
    },
    {
      total: 1000000,
      status: "Waiting",
    },
    {
      total: 1500000,
      status: "Success",
    },
    {
      total: 2500000,
      status: "Waiting",
    },
  ];

  const income = closingData.filter((item) => item.status === "Success").reduce((total, item) => total + item.total, 0);

  const progress = target > 0 ? (income / target) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <div>
        <h1 className="text-2xl font-semibold">PT Dashboard</h1>

        <p className="text-gray-500">Welcome back, Coach 👋</p>
      </div>

      {/* SUMMARY */}

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card title="Members" value="12" />

        <Card title="Active Package" value="8" />

        <Card title="Today Schedule" value="3" />

        <Card title="Remaining Session" value="24" />

        <Card title="Appointment" value="5" />

        <Card title="Revenue" value="6.5M" />
      </div>

      {/* CLOSING TARGET */}

      <div className="card">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Closing Target</h2>

            <p className="text-sm text-gray-500">
              Rp {income.toLocaleString("id-ID")}/ Rp {target.toLocaleString("id-ID")}
            </p>
          </div>

          <span className="font-semibold">{progress.toFixed(0)}%</span>
        </div>

        <div
          className="
    mt-4
    h-3
    bg-gray-200
    rounded-full
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

      {/* CALENDAR */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="card lg:col-span-2">
          <h2 className="font-semibold text-xl mb-4">Training Calendar</h2>

          <div className="grid grid-cols-7 gap-2">
            {days.map((day) => {
              const event = calendarEvents.find((e) => e.date === day);

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(day)}
                  className={`

h-10
rounded-lg
border
text-sm


${selectedDate === day ? "bg-primary text-white" : "bg-gray-50"}

`}
                >
                  {day}

                  {event && (
                    <div className="flex justify-center mt-1">
                      <span
                        className={`
w-2
h-2
rounded-full

${event.type === "Training" ? "bg-blue-500" : "bg-green-500"}

`}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="text-sm mt-4">🔵 Training &nbsp; 🟢 Appointment</div>
        </div>

        {/* DETAIL */}

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Schedule</h2>

          <p className="text-gray-500 mb-3">{selectedDate} June 2026</p>

          {selectedEvents.map((item, index) => (
            <div
              key={index}
              className="
border
rounded-xl
p-3
mb-3
"
            >
              <p className="font-semibold">{item.title}</p>

              <p className="text-sm text-gray-500">{item.time}</p>

              <span
                className="
text-xs
px-2
py-1
rounded-full
bg-blue-100
text-blue-600
"
              >
                {item.type}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* TRAINING TABLE */}

      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Today's Training Schedule</h2>

        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="p-3">Time</th>

              <th className="p-3">Member</th>

              <th className="p-3">Package</th>

              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {schedule.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="p-3">{item.time}</td>

                <td className="p-3">{item.member}</td>

                <td className="p-3">{item.package}</td>

                <td className="p-3">
                  <span
                    className="
px-3
py-1
rounded-full
text-xs
bg-yellow-100
text-yellow-700
"
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MEMBERS */}

      <div className="card">
        <h2 className="text-xl font-semibold mb-4">My Members</h2>

        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="p-3">Member</th>

              <th className="p-3">Package</th>

              <th className="p-3">Session</th>

              <th className="p-3">Progress</th>
            </tr>
          </thead>

          <tbody>
            {members.map((member, index) => (
              <tr key={index} className="border-b">
                <td className="p-3">{member.name}</td>

                <td className="p-3">{member.package}</td>

                <td className="p-3">{member.session}</td>

                <td className="p-3">
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

                  <p className="text-xs">{member.progress}%</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="card">
      <p className="text-gray-500">{title}</p>

      <h2 className="text-3xl font-bold">{value}</h2>
    </div>
  );
}
