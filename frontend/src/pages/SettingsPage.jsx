


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSettingsStore } from "../stores/useSettingsStore";
import { useUserStore } from "../stores/useUserStore";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";

const SettingsPage = () => {
  const {
    accountSettings,
    shippingSettings,
    notificationSettings,
    updateAccountSettings,
    updateShippingSettings,
    updateNotificationSettings,
  } = useSettingsStore();

  const { user, isAuthenticated, isCheckingAuth, checkAuth } = useUserStore();

  const [localAccountSettings, setLocalAccountSettings] = useState(accountSettings);
  const [localShippingSettings, setLocalShippingSettings] = useState(shippingSettings);
  const [localNotificationSettings, setLocalNotificationSettings] = useState(notificationSettings);
  const navigate = useNavigate();

  const handleSaveAccount = async () => {
    try {
      const response = await axios.put("http://localhost:5000/api/settings/account", localAccountSettings); // Adjust the URL as per your backend API
      updateAccountSettings(response.data);
      toast.success("Account settings updated successfully!");
    } catch (error) {
      console.error("Error updating account settings:", error);
      toast.error("Failed to update account settings.");
    }
  };

  const handleSaveShipping = async () => {
    try {
      const response = await axios.put("/api/settings/shipping", localShippingSettings); // Adjust the URL
      updateShippingSettings(response.data);
      toast.success("Shipping settings updated successfully!");
    } catch (error) {
      console.error("Error updating shipping settings:", error);
      toast.error("Failed to update shipping settings.");
    }
  };

  const handleSaveNotifications = async () => {
    try {
      const response = await axios.put("/api/settings/notifications", localNotificationSettings); // Adjust the URL
      updateNotificationSettings(response.data);
      toast.success("Notification settings updated successfully!");
    } catch (error) {
      console.error("Error updating notification settings:", error);
      toast.error("Failed to update notification settings.");
    }
  };

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isCheckingAuth && !isAuthenticated) {
      navigate("/"); // Redirect if not authenticated
    }
  }, [isAuthenticated, isCheckingAuth, navigate]);

  if (isCheckingAuth) {
    return <div>Loading...</div>; // Show a loading screen while checking auth
  }

  return (
    <div className="container mx-auto mt-6 p-4">
      {/* Profile Information Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        className="w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800 mb-8"
      >
        <div className="flex justify-between space-x-6">
          <motion.div
            className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold text-emerald-400 mb-3">Profile Information</h3>
            <p className="text-gray-300">Name: {user?.name}</p>
            <p className="text-gray-300">Email: {user?.email}</p>
          </motion.div>

          <motion.div
            className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-emerald-400 mb-3">Account Activity</h3>
            <p className="text-gray-300">
              <span className="font-bold">Joined: </span>
              {new Date(user.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-gray-300">
              <span className="font-bold">Last Login: </span>
              {new Date(user.lastLogin).toLocaleString()}
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Settings Form */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Settings</h2>

        {/* Account Settings */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Account Settings</h3>
          <div className="mb-4">
            <label className="block mb-2 text-gray-600">Username</label>
            <input
              type="text"
              value={localAccountSettings.username}
              onChange={(e) => setLocalAccountSettings({ ...localAccountSettings, username: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-emerald-500"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-600">Email</label>
            <input
              type="email"
              value={localAccountSettings.email}
              onChange={(e) => setLocalAccountSettings({ ...localAccountSettings, email: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-emerald-500"
            />
          </div>
          <button
            onClick={handleSaveAccount}
            className="w-full py-2.5 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition duration-200"
          >
            Save Account Settings
          </button>
        </section>

        {/* Shipping Settings */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Shipping Settings</h3>
          <div className="mb-4">
            <label className="block mb-2 text-gray-600">Shipping Address</label>
            <input
              type="text"
              value={localShippingSettings.address}
              onChange={(e) => setLocalShippingSettings({ ...localShippingSettings, address: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-emerald-500"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-600">City</label>
            <input
              type="text"
              value={localShippingSettings.city}
              onChange={(e) => setLocalShippingSettings({ ...localShippingSettings, city: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-emerald-500"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-600">Postal Code</label>
            <input
              type="text"
              value={localShippingSettings.postalCode}
              onChange={(e) => setLocalShippingSettings({ ...localShippingSettings, postalCode: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-emerald-500"
            />
          </div>
          <button
            onClick={handleSaveShipping}
            className="w-full py-2.5 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition duration-200"
          >
            Save Shipping Settings
          </button>
        </section>

        {/* Notification Settings */}
        <section>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Notification Settings</h3>
          <div className="mb-4">
            <label className="flex items-center text-gray-700">
              <input
                type="checkbox"
                checked={localNotificationSettings.orderUpdates}
                onChange={() =>
                  setLocalNotificationSettings({
                    ...localNotificationSettings,
                    orderUpdates: !localNotificationSettings.orderUpdates,
                  })
                }
                className="mr-2"
              />
              Order Status Updates
            </label>
          </div>
          <div className="mb-4">
            <label className="flex items-center text-gray-700">
              <input
                type="checkbox"
                checked={localNotificationSettings.promotions}
                onChange={() =>
                  setLocalNotificationSettings({
                    ...localNotificationSettings,
                    promotions: !localNotificationSettings.promotions,
                  })
                }
                className="mr-2"
              />
              Promotional Emails
            </label>
          </div>
          <button
            onClick={handleSaveNotifications}
            className="w-full py-2.5 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition duration-200"
          >
            Save Notification Settings
          </button>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;
