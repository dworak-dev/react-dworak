"use client";

import { BlueCircle, RedCircle } from "@packages/assets";
import { LandpadItemFragment } from "@packages/graphql";
import { Button } from "@packages/ui/components/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@packages/ui/components/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@packages/ui/components/dropdown-menu";
import { Input } from "@packages/ui/components/input";
import { Label } from "@packages/ui/components/label";
import { Moon, Sun } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { defaultAppCachedCatalogs } from "./cached-catalogs";

export default () => {
  const { setTheme } = useTheme();

  const [data, setData] = useState<LandpadItemFragment[]>([]);

  const fetchData = async () => {
    const response =
      await defaultAppCachedCatalogs.landpadsCachedQuery.getData();

    const landpads: LandpadItemFragment[] = [];
    if (response.landpads) {
      response.landpads.forEach((landpad) => {
        if (landpad) landpads.push(landpad);
      });

      setData(landpads);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative flex flex-col gap-8">
      <Button
        onClick={() => {
          {
            /* x-release-please-start-version */
          }
          throw new Error("This is a test error V1.2.10");
          {
            /* x-release-please-end */
          }
        }}
      >
        Sentry.js Test Error
      </Button>
      {!data ? "Loading" : `Landpads: ${data.length}`}
      <Image width={100} height={100} src={BlueCircle} alt="popo"></Image>
      <div
        style={{
          width: 100,
          height: 100,
          backgroundImage: `url(${RedCircle.src})`,
        }}
      ></div>
      <div className="absolute top-4 right-4 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Card className="w-full max-w-sm rounded-md shadow-md">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button variant="link">Sign Up</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Login
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </CardFooter>
      </Card>
      {/* x-release-please-start-version */}
      <span>V1.2.10</span>
      {/* x-release-please-end */}
    </div>
  );
};
