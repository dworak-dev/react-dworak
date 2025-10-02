"use client";

import { defaultAppRouteConfigs } from "@packages/shared/routes";
import { Button } from "@packages/ui/components/button";

export const Header = ({ auth }: { auth: boolean }) => (
  <header
    style={{
      backgroundColor: "#7a7a7a",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
    }}
  >
    <h1
      style={{
        fontSize: 30,
        color: "black",
      }}
    >
      Default App
    </h1>
    <div
      style={{
        display: "flex",
        gap: "15px",
        fontSize: "18px",
      }}
    >
      <a href={"/"}>Home</a>
      <a href={defaultAppRouteConfigs.stats.getRoute()}>Estadisticas (auth)</a>
      <a href={defaultAppRouteConfigs.charts.getRoute()}>Graficas </a>
    </div>
    <div>
      {auth ? (
        <Button
          style={{
            backgroundColor: "#770000",
            color: "white",
            cursor: "pointer",
          }}
          onClick={() => {
            console.log("Logging out...");
            //set cookie to false with plain js:
            document.cookie = "auth=false; path=/";

            //reload the page
            window.location.reload();
          }}
        >
          Logout
        </Button>
      ) : (
        <Button
          style={{
            backgroundColor: "green",
            cursor: "pointer",
          }}
          onClick={() => {
            console.log("Logging in...");
            //set cookie to true with plain js:
            document.cookie = "auth=true; path=/";

            //reload the page
            window.location.reload();
          }}
        >
          Login
        </Button>
      )}
    </div>
  </header>
);
