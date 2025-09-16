import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

/* ==== Minimal inline icons (không cần cài thêm lib) ==== */
const Icon = {
  Logo: () => (
    <svg viewBox="0 0 24 24" className="h-8 w-8 text-indigo-600">
      <path fill="currentColor" d="M12 2l4.2 7.5H7.8L12 2Zm0 20l-4.2-7.5h8.4L12 22Z" />
    </svg>
  ),
  Home: () => (
    <svg viewBox="0 0 24 24" className="h-5 w-5">
      <path fill="currentColor" d="M12 3 3 10h2v9h6v-6h2v6h6v-9h2L12 3z" />
    </svg>
  ),
  Users: () => (
    <svg viewBox="0 0 24 24" className="h-5 w-5">
      <path fill="currentColor" d="M16 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm-8 1a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm8 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4Zm-8-1c-2.97 0-8 1.49-8 4v3h6v-2c0-1.11.47-2.07 1.27-2.87A8.2 8.2 0 0 1 8 13Z" />
    </svg>
  ),
  Folder: () => (
    <svg viewBox="0 0 24 24" className="h-5 w-5">
      <path fill="currentColor" d="M10 4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6Z" />
    </svg>
  ),
  Calendar: () => (
    <svg viewBox="0 0 24 24" className="h-5 w-5">
      <path fill="currentColor" d="M7 2h2v2h6V2h2v2h3a2 2 0 0 1 2 2v3H2V6a2 2 0 0 1 2-2h3V2Zm15 8v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8h20Z" />
    </svg>
  ),
  Doc: () => (
    <svg viewBox="0 0 24 24" className="h-5 w-5">
      <path fill="currentColor" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm1 7h5l-5-5v5Z" />
    </svg>
  ),
  Chart: () => (
    <svg viewBox="0 0 24 24" className="h-5 w-5">
      <path fill="currentColor" d="M3 3h2v18H3V3Zm6 7h2v11H9V10Zm6-4h2v15h-2V6Zm6 8h2v7h-2v-7Z" />
    </svg>
  ),
  Bell: () => (
    <svg viewBox="0 0 24 24" className="h-5 w-5">
      <path fill="currentColor" d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2Zm6-6V11a6 6 0 0 0-5-5.91V4a1 1 0 0 0-2 0v1.09A6 6 0 0 0 6 11v5l-2 2v1h16v-1l-2-2Z" />
    </svg>
  ),
  Search: () => (
    <svg viewBox="0 0 24 24" className="h-5 w-5">
      <path fill="currentColor" d="M21 20l-4.35-4.35A7.5 7.5 0 1 0 9.5 17a7.46 7.46 0 0 0 4.65-1.62L18.5 20 21 20ZM4 9.5a5.5 5.5 0 1 1 11 0a5.5 5.5 0 0 1-11 0Z" />
    </svg>
  ),
};

const mainNav = [
  { name: "Dashboard", to: "/dashboard", icon: <Icon.Home /> },
  { name: "Team", to: "/team", icon: <Icon.Users /> },
  { name: "Projects", to: "/projects", icon: <Icon.Folder /> },
  { name: "Calendar", to: "/calendar", icon: <Icon.Calendar /> },
  { name: "Documents", to: "/documents", icon: <Icon.Doc /> },
  { name: "Reports", to: "/reports", icon: <Icon.Chart /> },
];

export default function AppLayout() {
  const [open, setOpen] = useState(false);

  return (
      <div className="min-h-dvh bg-white shadow-sm overflow-hidden">
        <div className="min-h-dvh flex">
          {/* Sidebar */}
          <div className={`fixed inset-0 z-[39] bg-gray-300/60 backdrop-blur-sm transition-all ${open ? 'opacity-100 visible' : 'opacity-0 invisible'} lg:hidden`} onClick={()=> setOpen(false)}></div>
          <aside className={`w-72 border-r bg-white transition-all lg:block ${open ? "left-0" : "-left-[18rem]"} lg:left-0 lg:relative fixed inset-y-0 z-40`}>
            <div className="h-full flex flex-col">
              <div className="flex items-center gap-2 px-6 h-16">
                <Icon.Logo />
                <span className="font-semibold text-gray-900">Your App</span>
              </div>

              <nav className="px-3 py-4 space-y-1">
                {mainNav.map(item => (
                  <NavLink
                    key={item.name}
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium
                       ${isActive ? "bg-indigo-50 text-indigo-600" : "text-gray-700 hover:bg-gray-50"}`
                    }
                  >
                    <span className="text-gray-400">{item.icon}</span>
                    {item.name}
                  </NavLink>
                ))}

                <div className="px-3 pt-6 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Your teams
                </div>
                <div className="space-y-1">
                  {["Heroicons", "Tailwind Labs", "Workcation"].map((t) => (
                    <button
                      key={t}
                      className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-gray-100 text-xs font-semibold text-gray-600">
                        {t[0]}
                      </span>
                      {t}
                    </button>
                  ))}
                </div>
              </nav>

              <div className="mt-auto p-3">
                <NavLink
                  to="/settings"
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium
                     ${isActive ? "bg-indigo-50 text-indigo-600" : "text-gray-700 hover:bg-gray-50"}`
                  }
                >
                  <span className="text-gray-400">
                    <svg viewBox="0 0 24 24" className="h-5 w-5">
                      <path fill="currentColor" d="M12 8a4 4 0 1 0 4 4a4 4 0 0 0-4-4Zm9 4a7.93 7.93 0 0 0-.2-1.8l2.1-1.64-2-3.46-2.47 1A8 8 0 0 0 15.8 3h-3.6a8 8 0 0 0-2.63 1.1l-2.47-1-2 3.46L3.8 10.2A7.93 7.93 0 0 0 3.6 12a7.93 7.93 0 0 0 .2 1.8l-2.1 1.64 2 3.46 2.47-1A8 8 0 0 0 8.2 21h3.6a8 8 0 0 0 2.63-1.1l2.47 1 2-3.46-2.1-1.64c.13-.58.2-1.19.2-1.8Z" />
                    </svg>
                  </span>
                  Settings
                </NavLink>
              </div>
            </div>
          </aside>

          {/* Main area */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <header className="flex items-center gap-3 px-6 h-16 border-b bg-white">
              <button
                className="lg:hidden -ml-1 inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-gray-100"
                onClick={() => setOpen((v) => !v)}
                aria-label="Toggle sidebar"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6">
                  <path fill="currentColor" d="M3 7h18v2H3V7Zm0 4h18v2H3v-2Zm0 4h18v2H3v-2Z" />
                </svg>
              </button>

              <div className="relative flex-1 max-w-xl">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <Icon.Search />
                </span>
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-3 py-2 text-sm outline-none focus:border-indigo-400 focus:bg-white"
                />
              </div>
                  <div className="flex-1 hidden lg:block"></div>
              <button className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100">
                <Icon.Bell />
              </button>

              <div className="flex items-center gap-2">
                <img
                  className="h-9 w-9 rounded-full ring-2 ring-white object-cover"
                  src="https://i.pravatar.cc/72?img=12"
                  alt="avatar"
                />
                <div className="hidden sm:block text-sm">
                  <div className="font-medium text-gray-900">Tom Cook</div>
                  <div className="text-gray-500">tom@example.com</div>
                </div>
              </div>
            </header>

            {/* Content */}
            <main className="p-6">
              <div className="rounded-2xl border border-dashed border-gray-300 bg-[repeating-linear-gradient(135deg,#f8fafc_0_12px,#ffffff_12px_24px)] p-6 min-h-[60vh]">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </div>
  );
}
