import { AnimatePresence, motion } from "framer-motion";
import { DiamondPlus, House, List } from "lucide-react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

export function Layout() {
  const location = useLocation();
  const liens = [
    {
      id: 1,
      paht: "home",
      label: "Accueil",
      icon: <House size={18} strokeWidth={1.5} />,
    },
    {
      id: 2,
      paht: "useradd",
      label: "Ajouter",
      icon: <DiamondPlus size={18} strokeWidth={1.5} />,
    },
    {
      id: 3,
      paht: "userlist",
      label: "Liste",
      icon: <List size={18} strokeWidth={1.5} />,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col w-full min-h-screen bg-slate-100"
    >
      {/* HEADER */}
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="px-6 py-4 bg-white shadow-md sticky top-0 z-50"
      >
        <div className="flex justify-end md:justify-between items-center max-w-6xl mx-auto">
          <motion.div whileHover={{ scale: 1.05 }} className="hidden md:block">
            <p className="font-bold text-xl text-indigo-600 cursor-pointer">
              ⚡ MyApp
            </p>
          </motion.div>

          <nav className="flex gap-6">
            {liens.map((link) => (
              <NavLink
                key={link.id}
                to={link.paht}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-2 py-1 font-medium transition 
                  ${
                    isActive
                      ? "text-indigo-600"
                      : "text-slate-600 hover:text-indigo-600"
                  }`
                }
              >
                {link.icon}
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </motion.header>

      {/* Main */}
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          // exit={{ opacity: 0, y: -60 }}
          transition={{
            duration: 0.4,
            ease: [0.25, 0.8, 0.25, 1],
          }}
          className="flex-1 p-6 max-w-6xl mx-auto w-full "
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
    </motion.div>
  );
}
