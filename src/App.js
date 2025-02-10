import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./routes/layout/layout";
import Home from "./pages/home/Home";
import "./style/main.scss"
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Notfound from "./pages/404/Notfound";
import Properties from "./pages/properties/Properties";
import Expertises from "./pages/expertise/Expertises";
import Login from "./pages/login/Login";
import AuthProvider from "./context/AuthProvider";
import WpProvider from "./context/WpProvider";
import PropertyCommand from "./pages/propertiesCommand/PropertyCommand";
import ExpertiseCommand from "./pages/expertiseCommand/ExpertiseCommand";
import PropertiesUpdate from "./pages/propertiesUpdate/PropertiesUpdate";
import AboutCommand from "./pages/aboutCommand/AboutCommand";
import ContactUpdate from "./pages/contactUpdate/ContactUpdate";
import Kvkk from "./pages/kvkk/Kvkk";
import CookieProvider from "./context/CookieProvider";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/*",
          element: <Notfound />
        },
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/hakkimda",
          element: <About />
        },
        {
          path: "/iletisim",
          element: <Contact />
        },
        {
          path: "/ilanlar",
          element: <Properties />
        },
        {
          path: "/ilanyonetimi",
          element: <PropertyCommand />
        },
        {
          path: "/hakkimdayonetimi",
          element: <AboutCommand />
        },
        {
          path: "/ilanguncelle/:id",
          element: <PropertiesUpdate />
        },
        {
          path: "/iletisimguncelle",
          element: <ContactUpdate />
        },
        {
          path: "/kvkk",
          element: <Kvkk />
        },
        {
          path: "/uzmanliklarim",
          element: <Expertises />
        },
        {
          path: "/uzmanlıkyonetimi",
          element: <ExpertiseCommand />
        },
        {
          path: "/giris",
          element: <Login />
        }
      ]
    }
  ])
  return (
    <AuthProvider>
      <WpProvider>
        <CookieProvider>
          <RouterProvider router={router} />
        </CookieProvider>
      </WpProvider>
    </AuthProvider>
  )
}

export default App;
