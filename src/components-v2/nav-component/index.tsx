"use client";
import React from "react";
import styles from "./index.module.css"; // Import your CSS file for styling
import { Header } from "./components/header";

interface TopNavBarProps {
  children: React.ReactNode;
}

const TopNavBar: React.FC<TopNavBarProps> = ({ children }) => {
  return (
    <div className={styles.navWrapper}>
      <div className={styles.topNavBar}>
        <Header />
      </div>
      <div className={styles.navContent}>{children}</div>
    </div>
  );
};

export default TopNavBar;
