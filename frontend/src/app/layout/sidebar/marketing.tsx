"use client";

import Link from "next/link";

export default function Sidebar({ role }: { role: string }) {
  return (
    <aside className="sidebar">
      <div className="logo-wrapper">
        <div className="gym-logo">GYM</div>
      </div>

      <nav>
        <Link href="/marketing">Dashboard</Link>

        <Link href="/marketing/closing">My Closing</Link>

        <Link href="/marketing/appointment">Appointment</Link>

        <Link href="/marketing/members">Members</Link>
      </nav>
    </aside>
  );
}
