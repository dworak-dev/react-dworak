"use client";
import { ErrorPage, ErrorPageProps } from "./error-page";

export const ServerError = (props?: Partial<ErrorPageProps>) => (
  <ErrorPage
    errorCode="500"
    title="Something went wrong on our end."
    description="We're experiencing technical difficulties. Our team has been notified and is working to fix this issue."
    footerText="If the problem persists, please contact our support team."
    {...props}
  />
);
