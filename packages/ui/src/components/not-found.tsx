"use client";

import { Button } from "@packages/ui/components/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@packages/ui/components/card";

interface NotFoundProps {
  errorCode?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  homeUrl?: string;
  footerText?: string;
}

export default function NotFound({
  errorCode = "404",
  title = "Oops! The page you're looking for doesn't exist.",
  description = "It might have been moved or deleted. Check the URL or go back to the homepage.",
  buttonText = "← Back to Home",
  homeUrl = "/",
  footerText = "Still lost? Try searching or contact support.",
}: NotFoundProps = {}) {
  return (
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
}
