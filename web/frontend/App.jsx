import { BrowserRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NavigationMenu } from "@shopify/app-bridge-react";
import Routes from "./Routes";
import "./index.css";

import {
  AppBridgeProvider,
  QueryProvider,
  PolarisProvider,
} from "./components";
import AppProviderContext from "./context/app-provider.jsx";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./context/UserContext";

export default function App() {
  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");
  const { t } = useTranslation();

  return (
    <PolarisProvider>
      <BrowserRouter>
        <AppBridgeProvider>
          <QueryProvider>
            <NavigationMenu
              navigationLinks={[
                {
                  label: "Product Pricing Details",
                  destination: "/details",
                },
              ]}
            />
            <UserProvider>
              <AppProviderContext>
                <Routes pages={pages} />
                <div className="text-[14px] flex items-center justify-center">
                  <Toaster />
                </div>
              </AppProviderContext>
            </UserProvider>
          </QueryProvider>
        </AppBridgeProvider>
      </BrowserRouter>
    </PolarisProvider>
  );
}
