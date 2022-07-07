import { Fragment, ReactNode, useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import BackendWebSocket from "./backendComunication/BackendWebSocket";
import { BaseHeader, NavigationItems } from "./modules/Layout/BaseHeader";
import { BaseLayout } from "./modules/Layout/BaseLayout";
import LeftSidebar, { LeftNavigationItems } from "./modules/Layout/LeftSidebar";
import { AlarmPage } from "./modules/pages/AlarmPage";
import { BasePage } from "./modules/pages/BasePage";
import CrudAulas from "./modules/pages/ConfigurationPage/CrudAulas";
import CrudDepartments from "./modules/pages/ConfigurationPage/CrudDepartments";
import CrudDevices from "./modules/pages/ConfigurationPage/CrudDevices";
import CrudTelegram from "./modules/pages/ConfigurationPage/CrudTelegram";
import CrudWarnings from "./modules/pages/ConfigurationPage/CrudWarnings";
import MoveDevices from "./modules/pages/ConfigurationPage/MoveDevices";
import LiveSensorData from "./modules/pages/LiveSensorData";
import { ThemeProvider } from "./modules/ThemeProvider";

type NavigationItemsWithPages = NavigationItems & {
  item: ReactNode;
  leftNavigation?: LeftNavigationItems[];
};

function App() {
  console.log("APP TSX");
  const navigation: NavigationItemsWithPages[] = useMemo(
    () => [
      {
        name: "Alarms",
        path: "/alarms",
        item: <AlarmPage />,
      },
      {
        name: "Configuration",
        path: "/config",
        item: <LiveSensorData />, //<ConfigurationPage />,
        leftNavigation: [
          {
            name: "Departments",
            path: "/config/department",
            item: <CrudDepartments />,
          },
          {
            name: "Aulas",
            path: "/config/aulas",
            item: <CrudAulas />,
          },
          {
            name: "Devices",
            path: "/config/devices",
            item: <CrudDevices />,
          },
          {
            name: "Sensor Placement",
            path: "/config/placement",
            item: <MoveDevices />,
          },
          {
            name: "Warnings",
            path: "/config/warnings",
            item: <CrudWarnings />,
          },
          {
            name: "Telegram Chat Id",
            path: "/config/telegram",
            item: <CrudTelegram />,
          },
          {
            name: "Live Sensor Data",
            path: "/config/live",
            item: <LiveSensorData />,
          },
          // {
          //   name: "Aula",
          //   path: "/config/aula",
          //   item: <div>AULA</div>,
          // },
        ],
      },
    ],
    []
  );

  const baseHeader = useMemo(
    () => <BaseHeader links={navigation} />,
    [navigation]
  );

  return (
    <RecoilRoot>
      <BackendWebSocket></BackendWebSocket>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <BaseLayout header={baseHeader}>
                  <BasePage />
                </BaseLayout>
              }
            />
            {navigation.map((item, index) => {
              return (
                <Fragment key={"base" + index}>
                  <Route
                    key={index}
                    path={item.path}
                    element={
                      <BaseLayout
                        header={baseHeader}
                        leftBlock={
                          <LeftSidebar navigation={item.leftNavigation} />
                        }
                      >
                        {item.item}
                      </BaseLayout>
                    }
                  />
                  {item.leftNavigation?.map((subitem, subindex) => (
                    <Route
                      key={index + "-" + subindex}
                      path={subitem.path}
                      element={
                        <BaseLayout
                          header={baseHeader}
                          leftBlock={
                            <LeftSidebar navigation={item.leftNavigation} />
                          }
                        >
                          {subitem.item}
                        </BaseLayout>
                      }
                    />
                  ))}
                </Fragment>
              );
            })}
            <Route path="*" element={<div>Doesnt exist</div>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
