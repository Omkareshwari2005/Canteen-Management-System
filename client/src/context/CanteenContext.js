import React, { createContext, useState, useEffect } from "react";

export const CanteenContext = createContext();

export const CanteenProvider = ({ children }) => {

  // ================= MENU =================
  const [menu, setMenu] = useState(() => {
    const savedMenu = localStorage.getItem("menuItems");
    return savedMenu ? JSON.parse(savedMenu) : [];
  });

  useEffect(() => {
    localStorage.setItem("menuItems", JSON.stringify(menu));
  }, [menu]);

  const addMenuItem = (item) => {
    setMenu(prev => [...prev, item]);
  };

  const deleteMenuItem = (id) => {
    setMenu(prev => prev.filter(item => item.id !== id));
  };

  const toggleAvailable = (id) => {
    setMenu(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, available: !item.available }
          : item
      )
    );
  };

  // ================= ORDERS (FIXED) =================
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("orders");
    if (!savedOrders) return [];

    return JSON.parse(savedOrders).map(order => ({
      ...order,
      items: Array.isArray(order.items) ? order.items : []
    }));
  });

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  // ================= CONTEXT PROVIDER =================
  return (
    <CanteenContext.Provider
      value={{
        menu,
        addMenuItem,
        deleteMenuItem,
        toggleAvailable,
        orders, 
        setOrders
      }}
    >
      {children}
    </CanteenContext.Provider>
  );
};