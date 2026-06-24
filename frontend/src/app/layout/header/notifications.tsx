"use client";

import { Icon } from "@iconify/react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

const notifications = [
  {
    title: "New member closing",
    subtitle: "You closed a new membership today",
  },
  {
    title: "Renewal reminder",
    subtitle: "3 members expire soon",
  },
  {
    title: "Payment success",
    subtitle: "Member payment confirmed",
  },
];

export default function Notifications() {
  return (
    <div className="relative px-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="relative cursor-pointer">
            <span
              className="
h-10 w-10 
rounded-full 
flex 
justify-center 
items-center
hover:bg-lightprimary
hover:text-primary
"
            >
              <Icon icon="tabler:bell-ringing" width={22} />
            </span>

            <span
              className="
absolute
top-1
right-1
w-2
h-2
bg-primary
rounded-full
"
            />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-[300px] rounded-xl p-3">
          <h3 className="font-semibold px-3 mb-2">Notification</h3>

          {notifications.map((item, index) => (
            <DropdownMenuItem key={index} className="cursor-pointer">
              <div>
                <p className="font-medium">{item.title}</p>

                <span className="text-xs text-gray-500">{item.subtitle}</span>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
