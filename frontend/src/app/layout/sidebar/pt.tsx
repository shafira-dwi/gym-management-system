"use client";

import Link from "next/link";

export default function Sidebar({ role }: { role: string }) {
  return (
    <aside className="sidebar">
      <div className="logo-wrapper">
        <div className="gym-logo">GYM</div>
      </div>

      <nav>
        <Link href="/pt">Dashboard</Link>

        <Link href="/pt/closing">My Closing</Link>
        <Link href="/pt/schedule">My Schedule</Link>
        <Link href="/pt/appointment">Appointment</Link>

        <Link href="/pt/members">Members</Link>
      </nav>
    </aside>
  );
}
