import { create } from "zustand";

export const useSettingsStore = create((set) => ({
  // Initial settings
  accountSettings: {
    username: "JohnDoe",
    email: "john.doe@example.com",
  },
  shippingSettings: {
    address: "123 Shoe St.",
    city: "SneakerTown",
    postalCode: "12345",
  },
  notificationSettings: {
    orderUpdates: true,
    promotions: false,
  },

  // Actions to update settings
  updateAccountSettings: (newAccountSettings) =>
    set((state) => ({
      accountSettings: { ...state.accountSettings, ...newAccountSettings },
    })),

  updateShippingSettings: (newShippingSettings) =>
    set((state) => ({
      shippingSettings: { ...state.shippingSettings, ...newShippingSettings },
    })),

  updateNotificationSettings: (newNotificationSettings) =>
    set((state) => ({
      notificationSettings: { ...state.notificationSettings, ...newNotificationSettings },
    })),

  // Optional: A general setter for multiple settings at once
  updateSettingsFromAPI: ({ accountSettings, shippingSettings, notificationSettings }) =>
    set((state) => ({
      accountSettings: accountSettings ? { ...state.accountSettings, ...accountSettings } : state.accountSettings,
      shippingSettings: shippingSettings ? { ...state.shippingSettings, ...shippingSettings } : state.shippingSettings,
      notificationSettings: notificationSettings ? { ...state.notificationSettings, ...notificationSettings } : state.notificationSettings,
    })),
}));
