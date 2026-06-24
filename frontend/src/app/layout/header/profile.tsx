"use client";

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Profile() {
  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            className="
h-10
w-10
rounded-full
cursor-pointer
flex
items-center
justify-center
bg-primary
text-white
"
          >
            <Icon icon="solar:user-bold" width={22} />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48 rounded-xl p-2">
          <div className="px-3 py-2">
            <p className="font-semibold">Marketing User</p>

            <p className="text-xs text-gray-500">marketing</p>
          </div>

          <DropdownMenuItem asChild>
            <Link href="#" className="flex gap-3 items-center">
              <Icon icon="solar:user-circle-outline" width={20} />
              Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="#" className="flex gap-3 items-center">
              <Icon icon="solar:settings-linear" width={20} />
              Settings
            </Link>
          </DropdownMenuItem>

          <div className="p-2">
            <Button className="w-full" variant="outline">
              Logout
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
