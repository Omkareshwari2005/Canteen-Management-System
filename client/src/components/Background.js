import React from "react";

const Background = ({ children }) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundImage: "url('/images/canteen-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative"
      }}
    >
      {/* Blur overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backdropFilter: "blur(6px)",
          backgroundColor: "rgba(0,0,0,0.25)"
        }}
      />

      {/* Login card */}
      <div
        style={{
          position: "relative",
          backgroundColor: "rgba(255,255,255,0.9)",
          padding: "30px",
          borderRadius: "18px",
          boxShadow: "0 15px 40px rgba(0,0,0,0.4)",
          width: "350px",
          zIndex: 1
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Background;