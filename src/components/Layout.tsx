// Пакеты
import { Outlet } from "react-router-dom";

// Компоненты
import Header from "./Header";
import Footer from "./Footer";



function Layout() {

  return (
    <div className="layout">

      {/* ШАПКА */}
      <Header />

      {/* НЕПОСРЕДСТВЕННО КОНТЕНТ ПРИЛОЖЕНИЯ */}
      <main className="layout__app-content">
        <Outlet />
      </main>

      {/* ПОДВАЛ */}
      <Footer />
    </div>
  );
}

export default Layout;