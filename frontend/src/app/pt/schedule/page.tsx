"use client";

import { useState } from "react";

type EventType = "Training" | "Appointment" | "Note";

type CalendarEvent = {
  id: number;
  date: number;
  title: string;
  time: string;
  type: EventType;
  description?: string;
};

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState(24);

  const [showModal, setShowModal] = useState(false);

  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: 1,
      date: 24,
      title: "Andi Saputra - Muscle Build",
      time: "09:00",
      type: "Training",
    },

    {
      id: 2,
      date: 24,
      title: "Sinta Consultation",
      time: "14:00",
      type: "Appointment",
    },

    {
      id: 3,
      date: 27,
      title: "Body Check",
      time: "All Day",
      type: "Note",
      description: "Member progress evaluation",
    },
  ]);

  const [note, setNote] = useState({
    title: "",
    description: "",
    date: 24,
  });

  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  const selectedEvents = events.filter((item) => item.date === selectedDate);

  function addNote() {
    if (!note.title) return;

    setEvents((prev) => [
      ...prev,

      {
        id: Date.now(),
        date: note.date,
        title: note.title,
        time: "All Day",
        type: "Note",
        description: note.description,
      },
    ]);

    setShowModal(false);

    setNote({
      title: "",
      description: "",
      date: 24,
    });
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">PT Schedule</h1>

          <p className="text-gray-500">Manage training, appointment and notes</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="
bg-primary
text-white
px-4
py-2
rounded-xl
"
        >
          + Add Note
        </button>
      </div>

      {/* SUMMARY */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card title="Today Training" value="3" />

        <Card title="Appointment" value="5" />

        <Card title="Notes" value={events.filter((e) => e.type === "Note").length.toString()} />

        <Card title="This Week" value="12" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CALENDAR */}

        <div className="card lg:col-span-2">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-semibold">June 2026</h2>

            <div className="text-sm">
              <span className="mr-3">🔵 Training</span>

              <span className="mr-3">🟢 Appointment</span>

              <span>🟡 Note</span>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-3">
            {days.map((day) => {
              const dayEvents = events.filter((e) => e.date === day);

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(day)}
                  className={`

h-20
rounded-xl
border
p-2
text-left

${selectedDate === day ? "bg-primary text-white" : "bg-gray-50"}

`}
                >
                  <div className="font-semibold">{day}</div>

                  <div className="flex gap-1 mt-2">
                    {dayEvents.map((event) => (
                      <span
                        key={event.id}
                        className={`

w-3
h-3
rounded-full


${event.type === "Training" ? "bg-blue-500" : event.type === "Appointment" ? "bg-green-500" : "bg-yellow-400"}

`}
                      />
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* DETAIL */}

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Schedule Detail</h2>

          <p className="text-gray-500 mb-5">{selectedDate} June 2026</p>

          {selectedEvents.length === 0 ? (
            <p>No schedule</p>
          ) : (
            selectedEvents.map((event) => (
              <div key={event.id} className="border rounded-xl p-4 mb-4">
                <div className="flex justify-between">
                  <h3 className="font-semibold">{event.title}</h3>

                  <span
                    className={`

text-xs
px-2
py-1
rounded-full


${event.type === "Training" ? "bg-blue-100 text-blue-600" : event.type === "Appointment" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"}

`}
                  >
                    {event.type}
                  </span>
                </div>

                <p className="text-gray-500 mt-2">{event.time}</p>

                {event.description && <p className="text-sm mt-2">{event.description}</p>}
              </div>
            ))
          )}
        </div>
      </div>

      {/* MODAL */}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-[400px]">
            <h2 className="text-xl font-bold mb-4">Add Calendar Note</h2>

            <input
              placeholder="Title"
              className="
border
w-full
p-3
rounded
mb-3
"
              value={note.title}
              onChange={(e) =>
                setNote({
                  ...note,
                  title: e.target.value,
                })
              }
            />

            <textarea
              placeholder="Description"
              className="
border
w-full
p-3
rounded
mb-3
"
              value={note.description}
              onChange={(e) =>
                setNote({
                  ...note,
                  description: e.target.value,
                })
              }
            />

            <select
              className="
border
w-full
p-3
rounded
mb-4
"
              onChange={(e) =>
                setNote({
                  ...note,
                  date: Number(e.target.value),
                })
              }
            >
              {days.map((day) => (
                <option key={day} value={day}>
                  June {day}
                </option>
              ))}
            </select>

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="
border
px-4
py-2
rounded-xl
"
              >
                Cancel
              </button>

              <button
                onClick={addNote}
                className="
bg-primary
text-white
px-4
py-2
rounded-xl
"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
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
