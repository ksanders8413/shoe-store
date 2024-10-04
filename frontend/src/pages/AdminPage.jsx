import { BarChart, DollarSign, PlusCircle, ShoppingBasket } from "lucide-react";
import { useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";

import CreateProductForm from "../Components/CreateProductForm";
import ProductsList from "../Components/ProductsList";
import AnalyticsTab from "../Components/AnalyticsTab";
import { useProductStore } from "../stores/useProductStore";
import Profit from "../Components/Profit";
import ProductCalculator from "../Components/ProductCalculator";
import { FaCalculator} from "react-icons/fa";

const tabs = [
  { id: "create", label: "Create Product", icon: PlusCircle },
  { id: "products", label: "Products", icon: ShoppingBasket },
  { id: "analytics", label: "Analytics", icon: BarChart },
  { id: "profit", label: "Profit/Loss", icon: DollarSign },
  { id: "productCalculator", label: "Product Calculator", icon: FaCalculator},
];

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("create");
  const {fetchAllProducts} = useProductStore()

  useEffect(() => {
    fetchAllProducts()
  },[fetchAllProducts])



  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 py-16">
        <Motion.h1
          className="text-4xl font-bold mb-8 text-emerald-400 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Admin Dashboard
        </Motion.h1>
        <div className="flex justify-center mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200 ${
                activeTab === tab.id
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <tab.icon className="mr-2 h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </div>
        {activeTab === "create" && <CreateProductForm />}
				{activeTab === "products" && <ProductsList />}
				{activeTab === "analytics" && <AnalyticsTab />}
				{activeTab === "profit" && <Profit />}
				{activeTab === "productCalculator" && <ProductCalculator />}
				
      </div>
    </div>
  );
};

export default AdminPage;








