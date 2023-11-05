// Пакеты
import { Outlet } from "react-router-dom";

// Компоненты
import Header from "./Header";
import Footer from "./Footer";

// Redux
import { useAppSelector } from "../store/hooks";
import { selectCurrentTheme } from "../store/reducers/currentThemeSlice";



function Layout() {

  const currentTheme = useAppSelector(selectCurrentTheme);

  return (
    <div className={`layout ${currentTheme}`}>

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