"use client";
import { ErrorPage, ErrorPageProps } from "./error-page";

export const NotFound = (props?: Partial<ErrorPageProps>) => (
  <ErrorPage
    errorCode="404"
    title="Oops! The page you're looking for doesn't exist."
    description="It might have been moved or deleted. Check the URL or go back to the homepage."
    footerText="Still lost? Try searching or contact support."
    {...props}
  />
);
