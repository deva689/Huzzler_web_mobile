// import React, { useEffect, useState } from "react"; 
// import logo from "../../../assets/logo.png";
// import myservices from "../../../assets/MyServices.png";

// import {
//   Home,
//   Search, 
//   Briefcase,
//   User,
//   Settings,
//   LogOut,
//   Bookmark,
//   Menu,
//   X,
// } from "lucide-react";

// import { useNavigate, useLocation } from "react-router-dom";
// import { auth, db } from "../../../firbase/Firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";

// export default function FreelanceSideBar() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [collapsed, setCollapsed] = useState(
//     localStorage.getItem("sidebar-collapsed") === "true"
//   );

//   const [mobileOpen, setMobileOpen] = useState(false);

//   const [userInfo, setUserInfo] = useState({
//     firstName: "",
//     lastName: "",
//     role: "",
//   });

//   useEffect(() => {
//     onAuthStateChanged(auth, async (currentUser) => {
//       if (!currentUser) return;

//       const userRef = doc(db, "users", currentUser.uid);
//       const snap = await getDoc(userRef);

//       if (snap.exists()) {
//         const data = snap.data();
//         setUserInfo({
//           firstName: data.firstName || "",
//           lastName: data.lastName || "",
//           role: data.role || "",
//         });
//       }
//     });
//   }, []);

//   const isActive = (path) => location.pathname === path;

//   function toggleSidebar() {
//     const next = !collapsed;
//     setCollapsed(next);
//     localStorage.setItem("sidebar-collapsed", next);
//     window.dispatchEvent(new CustomEvent("sidebar-toggle", { detail: next }));
//   }

//   function handleMobileNav(path) {
//     navigate(path);
//     setMobileOpen(false); // close dropdown after selection
//   }

//   return (
//     <>
//       {/* MOBILE TOPBAR */}
//       <div className="mobile-topbar">
//         <img src={logo} className="mobile-logo" />
//         <button
//           className="mobile-menu-btn"
//           onClick={() => setMobileOpen(!mobileOpen)}
//         >
//           {mobileOpen ? <X size={26} /> : <Menu size={26} />}
//         </button>
//       </div>

//       {/* SIDEBAR */}
//       <aside
//         className={`hz-sidebar ${collapsed ? "collapsed" : ""} ${
//           mobileOpen ? "mobile-show" : ""
//         }`}
//       >
//         {/* Toggle Button */}
//         <button className="hz-collapse-btn" onClick={toggleSidebar}>
//           {collapsed ? ">" : "<"}
//         </button>

//         {/* LOGO CARD */}
//         {!collapsed ? (
//           <div className="hz-logo-card">
//             <img src={logo} className="hz-logo-img" />
//             <span className="hz-logo-text">HUZZLER..</span>
//           </div>
//         ) : (
//           <div className="hz-logo-small-wrap">
//             <img src={logo} className="hz-logo-img-small" />
//           </div>
//         )}

//         {/* MENU */}
//         <nav className="hz-menu">
//           <button
//             className={`hz-menu-btn ${isActive("/freelance-dashboard") ? "active-btn" : ""}`}
//             onClick={() => handleMobileNav("/freelance-dashboard")}
//           >
//             <Home size={18} className="icon" />
//             {!collapsed && "Home"}
//           </button>

//           <button
//             className={`hz-menu-btn ${isActive("/freelance-dashboard/freelancebrowesproject") ? "active-btn" : ""}`}
//             onClick={() => handleMobileNav("/freelance-dashboard/freelancebrowesproject")}
//           >
//             <Search size={18} className="icon" />
//             {!collapsed && "Browse Projects"}
//           </button>

//           <button
//             className={`hz-menu-btn ${isActive("/freelance-dashboard/freelancermyworks") ? "active-btn" : ""}`}
//             onClick={() => handleMobileNav("/freelance-dashboard/freelancermyworks")}
//           >
//             <Briefcase size={18} className="icon" />
//             {!collapsed && "My Jobs"}
//           </button>

//           <button
//             className={`hz-menu-btn ${isActive("/freelance-dashboard/sidebarsaved") ? "active-btn" : ""}`}
//             onClick={() => handleMobileNav("/freelance-dashboard/sidebarsaved")}
//           >
//             <img src={myservices} width={18} className="icon" />
//             {!collapsed && "My Service"}
//           </button>

//           <button
//             className={`hz-menu-btn ${isActive("/freelance-dashboard/saved") ? "active-btn" : ""}`}
//             onClick={() => handleMobileNav("/freelance-dashboard/saved")}
//           >
//             <Bookmark size={18} className="icon" />
//             {!collapsed && "Saved"}
//           </button>

//           <div className="hz-bottom-menu">
//             <button
//               className={`hz-menu-btn ${isActive("/freelance-dashboard/accountfreelancer") ? "active-btn" : ""}`}
//               onClick={() => handleMobileNav("/freelance-dashboard/accountfreelancer")}
//             >
//               <User size={18} className="icon" />
//               {!collapsed && "Profile"}
//             </button>

//             <button
//               className={`hz-menu-btn ${isActive("/freelance-dashboard/settings") ? "active-btn" : ""}`}
//               onClick={() => handleMobileNav("/freelance-dashboard/settings")}
//             >
//               <Settings size={18} className="icon" />
//               {!collapsed && "Settings"}
//             </button>

//             <button
//               className="hz-menu-btn"
//               onClick={() => handleMobileNav("/logout")}
//             >
//               <LogOut size={18} className="icon" />
//               {!collapsed && "Logout"}
//             </button>
//           </div>
//         </nav>

//         {/* FOOTER */}
//         <div className="hz-user-footer">
//           <div className="hz-user-avatar">
//             {(userInfo.firstName || "?")[0].toUpperCase()}
//           </div>

//           {!collapsed && (
//             <div>
//               <p className="hz-user-name">
//                 {userInfo.firstName} {userInfo.lastName}
//               </p>
//               <p className="hz-user-role">{userInfo.role}</p>
//             </div>
//           )}
//         </div>
//       </aside>

//       {/* CSS */}
//       <style>{`
//         .hz-sidebar {
//           width: 300px;
//           height: 100vh;
//           background: #e8e8e8;
//           position: fixed;
//           left: 0;
//           top: 0;
//           padding: 18px;
//           display: flex;
//           flex-direction: column;
//           justify-content: flex-start;
//           transition: 0.3s ease;
//           font-family: 'Rubik', sans-serif;
//           z-index: 999;
//         }

//         .hz-sidebar.collapsed {
//           width: 80px;
//         }

//         .hz-collapse-btn {
//           position: absolute;
//           top: 50px;
//           left: 320px;
//           width: 32px;
//           height: 32px;
//           border-radius: 10px;
//           background: #a855f7;
//           border: none;
//           color: white;
//           cursor: pointer;
//           transition: left 0.3s ease;
//         }

//         .hz-sidebar.collapsed .hz-collapse-btn {
//           left: 100px;
//         }

//         .hz-logo-card {
//           width: 80%;
//           height: 75px;
//           background: #a855f7;
//           border-radius: 20px;
//           display: flex;
//           align-items: center;
//           padding: 10px 18px;
//           gap: 16px;
//           box-shadow: 0 8px 20px rgba(0,0,0,0.1);
//           margin-top:-10px;
//         }

//         .hz-logo-img {
//           width: 46px;
//           height: 46px;
//         }

//         .hz-logo-text {
//           font-size: 22px;
//           font-weight: 600;
//           color: white;
//         }

//         .hz-logo-img-small {
//           width: 55px;
//           height: 55px;
//           background: white;
//           border-radius: 14px;
//           border: 2px solid #a855f7;
//           padding: 4px;
//         }

//         .hz-logo-small-wrap {
//           display: flex;
//           justify-content: center;
//           margin-bottom: 10px;
//         }

//         .hz-menu {
//           margin-top: 5px;
//           display: flex;
//           flex-direction: column;
//           gap: 12px;
//         }

//         .hz-menu-btn {
//           height: 40px;
//           width: 90%;
//           border: none;
//           border-radius: 14px;
//           background: none;
//           display: flex;
//           align-items: center;
//           padding: 0 16px;
//           gap: 12px;
//           cursor: pointer;
//           transition: 0.25s ease;
//           font-size: 15px;
//           color: #222;
//         }

//         .hz-menu-btn:hover {
//           background: #c084fc;
//           color: white;
//         }

//         .hz-menu-btn:hover .icon,
//         .hz-menu-btn:hover img {
//           filter: brightness(0) invert(1);
//         }

//         .active-btn {
//           background: #a855f7 !important;
//           color: white !important;
//         }

//         .active-btn .icon,
//         .active-btn img {
//           filter: brightness(0) invert(1);
//         }

//         .hz-sidebar.collapsed .hz-menu-btn {
//           justify-content: center;
//           padding: 0;
//         }

//         .hz-user-footer {
//           height: 70px;
//           background: white;
//           border-radius: 0;
//           box-shadow: 0 6px 20px rgba(0,0,0,0.1);
//           width: calc(100% + 6px);
//           margin-left: -18px;
//           display: flex;
//           align-items: center;
//           padding: 10px 15px;
//           gap: 12px;
//           margin-bottom: 25px;
//         }

//         .hz-user-avatar {
//           width: 44px;
//           height: 44px;
//           background: #a855f7;
//           border-radius: 50%;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           color: white;
//           font-weight: 600;
//         }

//         .hz-user-name {
//           font-size: 15px;
//           font-weight: 600;
//         }

//         .hz-user-role {
//           font-size: 12px;
//           color: #666;
//         }

//         .hz-bottom-menu {
//           margin-top: auto;
//           padding-top: 10px;
//           display: flex;
//           flex-direction: column;
//           gap: 14px;
//         }

//         /* MOBILE TOPBAR */
//         .mobile-topbar {
//           display: none;
//         }

//         @media (max-width: 768px) {
//           .hz-sidebar {
//             left: -320px;
//             transition: 0.35s ease;
//           }

//           .hz-sidebar.mobile-show {
//             left: 0;
//             width: 100%;
//             margin-top:8     0px;
//           }

//           .hz-collapse-btn {
//             display: none;
//           }

//           .mobile-topbar {
//             display: flex;
//             width: 100%;
//             height: 60px;
//             background: white;
//             align-items: center;
//             justify-content: space-between;
//             padding: 0 15px;
//             border-bottom: 1px solid #ddd;
//             position: fixed;
//             top: 0;
//             z-index: 1000;
//           }

//           .mobile-logo {
//             width: 45px;
//           }

//           .mobile-menu-btn {
//             background: none;
//             border: none;
//             cursor: pointer;
//             margin-right:10px;
//           }

//           body {
//             padding-left: 0 !important;
//           }
//         }
//       `}</style>
//     </>
//   );
// }



import React, { useEffect, useState } from "react"; 
import logo from "../../../assets/logo.png";
import myservices from "../../../assets/MyServices.png";

import {
  Home,
  Search, 
  Briefcase,
  User,
  Settings,
  LogOut,
  Bookmark,
  Menu,
  X,
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";
import { auth, db } from "../../../firbase/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function FreelanceSideBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(
    localStorage.getItem("sidebar-collapsed") === "true"
  );

  const [mobileOpen, setMobileOpen] = useState(false);

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    role: "",
  });

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) return;

      const userRef = doc(db, "users", currentUser.uid);
      const snap = await getDoc(userRef);

      if (snap.exists()) {
        const data = snap.data();
        setUserInfo({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          role: data.role || "",
        });
      }
    });
  }, []);

  const isActive = (path) => location.pathname === path;

  function toggleSidebar() {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem("sidebar-collapsed", next);
    window.dispatchEvent(new CustomEvent("sidebar-toggle", { detail: next }));
  }

  function handleMobileNav(path) {
    navigate(path);
    setMobileOpen(false); // close dropdown after selection
  }

  return (
    <>
      {/* MOBILE TOPBAR */}
      <div className="mobile-topbar">
        <img src={logo} className="mobile-logo" />
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* SIDEBAR */}
      <aside
        className={`hz-sidebar ${collapsed ? "collapsed" : ""} ${
          mobileOpen ? "mobile-show" : ""
        }`}
      >
        {/* Toggle Button */}
        <button className="hz-collapse-btn" onClick={toggleSidebar}>
          {collapsed ? ">" : "<"}
        </button>

        {/* LOGO CARD */}
        {!collapsed ? (
          <div className="hz-logo-card">
            <img src={logo} className="hz-logo-img" />
            <span className="hz-logo-text">HUZZLER..</span>
          </div>
        ) : (
          <div className="hz-logo-small-wrap">
            <img src={logo} className="hz-logo-img-small" />
          </div>
        )}

        {/* MENU */}
        <nav className="hz-menu">
          <button
            className={`hz-menu-btn ${isActive("/freelance-dashboard") ? "active-btn" : ""}`}
            onClick={() => handleMobileNav("/freelance-dashboard")}
          >
            <Home size={18} className="icon" />
            {!collapsed && "Home"}
          </button>

          <button
            className={`hz-menu-btn ${isActive("/freelance-dashboard/freelancebrowesproject") ? "active-btn" : ""}`}
            onClick={() => handleMobileNav("/freelance-dashboard/freelancebrowesproject")}
          >
            <Search size={18} className="icon" />
            {!collapsed && "Browse Projects"}
          </button>

          <button
            className={`hz-menu-btn ${isActive("/freelance-dashboard/freelancermyworks") ? "active-btn" : ""}`}
            onClick={() => handleMobileNav("/freelance-dashboard/freelancermyworks")}
          >
            <Briefcase size={18} className="icon" />
            {!collapsed && "My Jobs"}
          </button>

          <button
            className={`hz-menu-btn ${isActive("/freelance-dashboard/sidebarsaved") ? "active-btn" : ""}`}
            onClick={() => handleMobileNav("/freelance-dashboard/sidebarsaved")}
          >
            <img src={myservices} width={18} className="icon" />
            {!collapsed && "My Service"}
          </button>

          <button
            className={`hz-menu-btn ${isActive("/freelance-dashboard/saved") ? "active-btn" : ""}`}
            onClick={() => handleMobileNav("/freelance-dashboard/saved")}
          >
            <Bookmark size={18} className="icon" />
            {!collapsed && "Saved"}
          </button>

          <div className="hz-bottom-menu">
            <button
              className={`hz-menu-btn ${isActive("/freelance-dashboard/accountfreelancer") ? "active-btn" : ""}`}
              onClick={() => handleMobileNav("/freelance-dashboard/accountfreelancer")}
            >
              <User size={18} className="icon" />
              {!collapsed && "Profile"}
            </button>

            <button
              className={`hz-menu-btn ${isActive("/freelance-dashboard/settings") ? "active-btn" : ""}`}
              onClick={() => handleMobileNav("/freelance-dashboard/settings")}
            >
              <Settings size={18} className="icon" />
              {!collapsed && "Settings"}
            </button>

            <button
              className="hz-menu-btn"
              onClick={() => handleMobileNav("/logout")}
            >
              <LogOut size={18} className="icon" />
              {!collapsed && "Logout"}
            </button>
          </div>
        </nav>

        {/* FOOTER */}
        <div className="hz-user-footer">
          <div className="hz-user-avatar">
            {(userInfo.firstName || "?")[0].toUpperCase()}
          </div>

          {!collapsed && (
            <div>
              <p className="hz-user-name">
                {userInfo.firstName} {userInfo.lastName}
              </p>
              <p className="hz-user-role">{userInfo.role}</p>
            </div>
          )}
        </div>
      </aside>

      {/* CSS */}
      <style>{`
        .hz-sidebar {
          width: 300px;
          height: 100vh;
          background: #e8e8e8;
          position: fixed;
          left: 0;
          top: 0;
          padding: 18px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          transition: 0.3s ease;
          font-family: 'Rubik', sans-serif;
          z-index: 999;
        }

        .hz-sidebar.collapsed {
          width: 80px;
        }

        .hz-collapse-btn {
          position: absolute;
          top: 50px;
          left: 320px;
          width: 32px;
          height: 32px;
          border-radius: 10px;
          background: #a855f7;
          border: none;
          color: white;
          cursor: pointer;
          transition: left 0.3s ease;
        }

        .hz-sidebar.collapsed .hz-collapse-btn {
          left: 100px;
        }

        .hz-logo-card {
          width: 80%;
          height: 75px;
          background: #a855f7;
          border-radius: 20px;
          display: flex;
          align-items: center;
          padding: 10px 18px;
          gap: 16px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
          margin-top:-10px;
        }

        .hz-logo-img {
          width: 46px;
          height: 46px;
        }

        .hz-logo-text {
          font-size: 22px;
          font-weight: 600;
          color: white;
        }

        .hz-logo-img-small {
          width: 55px;
          height: 55px;
          background: white;
          border-radius: 14px;
          border: 2px solid #a855f7;
          padding: 4px;
        }

        .hz-logo-small-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 10px;
        }

        .hz-menu {
          margin-top: 5px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .hz-menu-btn {
          height: 40px;
          width: 90%;
          border: none;
          border-radius: 14px;
          background: none;
          display: flex;
          align-items: center;
          padding: 0 16px;
          gap: 12px;
          cursor: pointer;
          transition: 0.25s ease;
          font-size: 15px;
          color: #222;
        }

        .hz-menu-btn:hover {
          background: #c084fc;
          color: white;
        }

        .hz-menu-btn:hover .icon,
        .hz-menu-btn:hover img {
          filter: brightness(0) invert(1);
        }

        .active-btn {
          background: #a855f7 !important;
          color: white !important;
        }

        .active-btn .icon,
        .active-btn img {
          filter: brightness(0) invert(1);
        }

        .hz-sidebar.collapsed .hz-menu-btn {
          justify-content: center;
          padding: 0;
        }

        .hz-user-footer {
          height: 70px;
          background: white;
          border-radius: 0;
          box-shadow: 0 6px 20px rgba(0,0,0,0.1);
          width: calc(100% + 6px);
          margin-left: -18px;
          display: flex;
          align-items: center;
          padding: 10px 15px;
          gap: 12px;
          margin-bottom: 25px;
        }

        .hz-user-avatar {
          width: 44px;
          height: 44px;
          background: #a855f7;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          font-weight: 600;
        }

        .hz-user-name {
          font-size: 15px;
          font-weight: 600;
        }

        .hz-user-role {
          font-size: 12px;
          color: #666;
        }

        .hz-bottom-menu {
          margin-top: auto;
          padding-top: 10px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        /* MOBILE TOPBAR */
        .mobile-topbar {
          display: none;
        }

        @media (max-width: 768px) {
          .hz-sidebar {
            left: -320px;
            transition: 0.35s ease;
          }

          .hz-sidebar.mobile-show {
            left: 0;
            width: 100%;
            margin-top:8     0px;
          }

          .hz-collapse-btn {
            display: none;
          }

          .mobile-topbar {
            display: flex;
            width: 100%;
            height: 60px;
            background: white;
            align-items: center;
            justify-content: space-between;
            padding: 0 15px;
            border-bottom: 1px solid #ddd;
            position: fixed;
            top: 0;
            z-index: 1000;
          }

          .mobile-logo {
            width: 45px;
          }

          .mobile-menu-btn {
            background: none;
            border: none;
            cursor: pointer;
            margin-right:50px;
          }

          body {
            padding-left: 0 !important;
          }
        }
      `}</style>
    </>
  );
}