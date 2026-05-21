"use client";

import React, { useEffect, useState } from "react";
import { Download } from "lucide-react";
import styles from "../layout/Sidebar.module.css"; // Reuse sidebar item styling

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setIsInstallable(false);
    }
    setDeferredPrompt(null);
  };

  if (!isInstallable) return null;

  return (
    <button
      onClick={handleInstallClick}
      className={styles.navItem}
      style={{
        width: "100%",
        border: "none",
        background: "transparent",
        textAlign: "left",
        cursor: "pointer",
        marginTop: "12px",
        color: "var(--primary)",
      }}
    >
      <Download size={20} className={styles.navIcon} style={{ color: "var(--primary)" }} />
      <span>Install App</span>
    </button>
  );
}
