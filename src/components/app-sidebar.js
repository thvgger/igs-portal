"use client"
import {
  CreditCard,
  Receipt,
  History,
  Wallet,
  User,
  HelpCircle,
  ChevronUp,
  Search,
  GraduationCap,
  FileText,
  Settings,
  LogOut,
  DollarSign,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// School payment portal navigation items
const paymentItems = [
  {
    title: "Make Payment",
    url: "/student/new",
    icon: CreditCard,
  },
  {
    title: "Payment History",
    url: "/student/history",
    icon: History,
  },
  {
    title: "Print Receipts",
    url: "/student/print",
    icon: Receipt,
  },
]

const accountItems = [
  {
    title: "My Profile",
    url: "/portal/profile",
    icon: User,
  },
  {
    title: "Statements",
    url: "/portal/statements",
    icon: FileText,
  },
  {
    title: "Help & Support",
    url: "/portal/support",
    icon: HelpCircle,
  },
]

// Use student data from mockdata.js
import { Students } from "@/data/mockdata"

const studentData = {
  name: `${Students[0].firstName} ${Students[0].lastName}`,
  studentId: Students[0].id,
  email: Students[0].email,
  avatar: "/placeholder.svg?height=32&width=32",
  program: Students[0].class,
}


export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" className="border-r border-blue-100" {...props}>
      <SidebarHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="hover:bg-blue-500/20">
              <a href="/portal">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-white/20 text-white">
                  <GraduationCap className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold text-white">Ifeoluwa Group Of Schools</span>
                  <span className="truncate text-xs text-blue-100">Student Payment Portal</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <form>
          <SidebarGroup className="py-0">
            <SidebarGroupContent className="relative">
              <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none text-blue-200" />
              <SidebarInput
                placeholder="Search transactions..."
                className="pl-8 bg-white/10 border-white/20 text-white placeholder:text-blue-200"
              />
            </SidebarGroupContent>
          </SidebarGroup>
        </form>
      </SidebarHeader>

      <SidebarContent className="bg-slate-50">
        <SidebarGroup>
          <SidebarGroupLabel className="text-blue-700 font-semibold">Payment Services</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {paymentItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className="hover:bg-blue-50 hover:text-blue-700 data-[active=true]:bg-blue-100 data-[active=true]:text-blue-800"
                  >
                    <a href={item.url}>
                      <item.icon className="text-blue-600" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-700 font-semibold">Account Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className="hover:bg-slate-100 hover:text-slate-700 data-[active=true]:bg-slate-200 data-[active=true]:text-slate-800"
                  >
                    <a href={item.url}>
                      <item.icon className="text-slate-600" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Balance Display */}
        {/* <SidebarGroup>
          <SidebarGroupContent>
            <div className="mx-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 text-green-800">
                <DollarSign className="size-4" />
                <div className="text-sm">
                  <p className="font-medium">Account Balance</p>
                  <p className="text-lg font-bold">$2,450.00</p>
                </div>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup> */}
      </SidebarContent>

      <SidebarFooter className="bg-white border-t border-slate-200">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-blue-50 data-[state=open]:text-blue-700 hover:bg-slate-50"
                >
                  <Avatar className="h-8 w-8 rounded-lg border-2 border-blue-200">
                    <AvatarImage src={studentData.avatar || "/placeholder.svg"} alt={studentData.name} />
                    <AvatarFallback className="rounded-lg bg-blue-100 text-blue-700">
                      {studentData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold text-slate-900">{studentData.name}</span>
                    <span className="truncate text-xs text-slate-500">ID: {studentData.studentId}</span>
                  </div>
                  <ChevronUp className="ml-auto size-4 text-slate-400" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg border-2 border-blue-200">
                      <AvatarImage src={studentData.avatar || "/placeholder.svg"} alt={studentData.name} />
                      <AvatarFallback className="rounded-lg bg-blue-100 text-blue-700">
                        {studentData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{studentData.name}</span>
                      <span className="truncate text-xs text-slate-500">{studentData.program}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Account Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
