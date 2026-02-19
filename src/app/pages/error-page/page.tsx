"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";
import styles from "./ErrorPage.module.css";

const ErrorPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorCard}>
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ margin: "0 auto 16px" }}>
          <circle cx="32" cy="32" r="31" stroke="url(#gradient)" strokeWidth="2" />
          <path
            d="M20 36c3.2-3.2 7.5-5 12-5s8.8 1.8 12 5"
            stroke="url(#gradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="24" cy="26" r="3" fill="#6366f1" />
          <circle cx="40" cy="26" r="3" fill="#ec4899" />
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6366f1" />
              <stop offset="1" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>

        <div className={styles.errorNumber}>404</div>
        <h2>{t("Page Not Found")}</h2>
        <p>{t("The page you are looking for does not exist or has been moved.")}</p>

        <Link href="/" className={styles.homeBtn}>
          <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
            <path
              d="M15.75 8.38H3.74l4.78-4.86a.75.75 0 00-1.06-1.06L1.65 8.52a.75.75 0 000 1.06l5.82 5.81a.75.75 0 001.06-1.06L3.77 9.64H15.75a.63.63 0 000-1.26z"
              fill="white"
            />
          </svg>
          {t("Back to Home")}
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;