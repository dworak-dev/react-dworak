"use client";
import { Button } from "@packages/ui/components/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@packages/ui/components/card";

export interface ErrorPageProps {
  errorCode?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  homeUrl?: string;
  footerText?: string;
}

export const ErrorPage = ({
  errorCode = "500",
  title = "Something went wrong.",
  description = "An unexpected error occurred.",
  buttonText = "← Back to Home",
  homeUrl = "/",
  footerText = "If the problem persists, please contact support.",
}: ErrorPageProps) => (
  <div className="min-h-screen flex flex-col items-center justify-center px-4">
    <Card className="w-full max-w-md text-center shadow-md rounded-md">
      <CardHeader>
        <CardTitle className="text-4xl font-bold tracking-tight">
          {errorCode}
        </CardTitle>
        <p className="text-muted-foreground text-sm mt-2">{title}</p>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <a href={homeUrl}>
          <Button variant="default" size="lg" asChild>
            <span>{buttonText}</span>
          </Button>
        </a>
      </CardFooter>
    </Card>
    <p className="text-xs text-muted-foreground mt-6">{footerText}</p>
  </div>
);
