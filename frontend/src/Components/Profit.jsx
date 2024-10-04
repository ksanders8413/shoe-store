


// import React, { useEffect, useState } from "react";
// import { FaPlus, FaMinus } from "react-icons/fa";

// const Profit = () => {
//   const [revenueItems, setRevenueItems] = useState([]);
//   const [expenseItems, setExpenseItems] = useState([]);
//   const [totalRevenue, setTotalRevenue] = useState(0);
//   const [totalExpenses, setTotalExpenses] = useState(0);
//   const [profit, setProfit] = useState(0);
//   const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
//   const [months] = useState([
//     "January", "February", "March", "April", "May", 
//     "June", "July", "August", "September", "October", 
//     "November", "December"
//   ]);

//   const data = [
//     {
//       month: "January",
//       revenues: [
//         {
//           description: "Product Sales",
//           amount: 7000,
//           products: [
//             { name: "Product A", amount: 4000 },
//             { name: "Product B", amount: 3000 },
//           ],
//         },
//         { description: "Service Income", amount: 3000 },
//         { description: "Consulting Fees", amount: 1000 },
//       ],
//       expenses: [
//         {
//           description: "Salaries",
//           amount: 2500,
//           items: [
//             { name: "Employee 1", amount: 1200 },
//             { name: "Employee 2", amount: 1300 },
//           ],
//         },
//         { description: "Rent", amount: 1500 },
//         { description: "Utilities", amount: 400 },
//       ],
//     },
//     // Add more month data if needed...
//   ];

//   useEffect(() => {
//     const currentMonthData = data[currentMonthIndex];
//     if (currentMonthData) {
//       const storedRevenues = localStorage.getItem(`revenues-${currentMonthIndex}`);
//       const storedExpenses = localStorage.getItem(`expenses-${currentMonthIndex}`);
      
//       setRevenueItems(storedRevenues ? JSON.parse(storedRevenues) : currentMonthData.revenues);
//       setExpenseItems(storedExpenses ? JSON.parse(storedExpenses) : currentMonthData.expenses);
//       calculateTotals(storedRevenues ? JSON.parse(storedRevenues) : currentMonthData.revenues, 
//                       storedExpenses ? JSON.parse(storedExpenses) : currentMonthData.expenses);
//     }
//   }, [currentMonthIndex]);

//   const calculateTotals = (revenues, expenses) => {
//     const fetchedTotalRevenue = revenues.reduce((acc, item) => acc + item.amount, 0);
//     const fetchedTotalExpenses = expenses.reduce((acc, item) => acc + item.amount, 0);
//     setTotalRevenue(fetchedTotalRevenue);
//     setTotalExpenses(fetchedTotalExpenses);
//     setProfit(fetchedTotalRevenue - fetchedTotalExpenses);
//   };

//   // Handle input change for inline editing
//   const handleFieldChange = (type, index, field, newValue, subIndex = null) => {
//     if (type === "revenue") {
//       const updatedRevenues = [...revenueItems];
//       if (subIndex !== null) {
//         updatedRevenues[index].products[subIndex][field] = field === "amount" ? parseFloat(newValue) || 0 : newValue;
//       } else {
//         updatedRevenues[index][field] = field === "amount" ? parseFloat(newValue) || 0 : newValue;
//       }
//       setRevenueItems(updatedRevenues);
//       localStorage.setItem(`revenues-${currentMonthIndex}`, JSON.stringify(updatedRevenues));
//       calculateTotals(updatedRevenues, expenseItems);
//     } else if (type === "expense") {
//       const updatedExpenses = [...expenseItems];
//       if (subIndex !== null) {
//         updatedExpenses[index].items[subIndex][field] = field === "amount" ? parseFloat(newValue) || 0 : newValue;
//       } else {
//         updatedExpenses[index][field] = field === "amount" ? parseFloat(newValue) || 0 : newValue;
//       }
//       setExpenseItems(updatedExpenses);
//       localStorage.setItem(`expenses-${currentMonthIndex}`, JSON.stringify(updatedExpenses));
//       calculateTotals(revenueItems, updatedExpenses);
//     }
//   };

//   const handleNextMonth = () => {
//     if (currentMonthIndex < data.length - 1) {
//       setCurrentMonthIndex(currentMonthIndex + 1);
//     }
//   };

//   const handlePrevMonth = () => {
//     if (currentMonthIndex > 0) {
//       setCurrentMonthIndex(currentMonthIndex - 1);
//     }
//   };

//   const [openProduct, setOpenProduct] = useState({ revenue: null, expense: null });

//   const toggleProduct = (type, index) => {
//     setOpenProduct((prev) => ({
//       ...prev,
//       [type]: prev[type] === index ? null : index,
//     }));
//   };

//   return (
//     <div className="income-statement-container">
//       <h2 className="text-2xl font-semibold mb-4">
//         {months[currentMonthIndex]} Income Statement
//       </h2>
      
//       <table className="w-full border-collapse mb-4">
//         <thead>
//           <tr>
//             <th className="border px-4 py-2 text-left">Description</th>
//             <th className="border px-4 py-2 text-left">Revenue</th>
//             <th className="border px-4 py-2 text-left">Expenses</th>
//           </tr>
//         </thead>
//         <tbody>
//           {revenueItems.map((item, index) => (
//             <React.Fragment key={index}>
//               <tr onClick={() => toggleProduct("revenue", index)} className="cursor-pointer">
//                 <td className="border px-4 py-2 pl-6 flex items-center">
//                   {openProduct.revenue === index ? <FaMinus /> : <FaPlus />} 
//                   <input
//                     type="text"
//                     value={item.description}
//                     onChange={(e) => handleFieldChange("revenue", index, "description", e.target.value)}
//                     className="ml-2 w-full p-1 border rounded"
//                   />
//                 </td>
//                 <td className="border px-4 py-2">
//                   <input
//                     type="number"
//                     value={item.amount}
//                     onChange={(e) => handleFieldChange("revenue", index, "amount", e.target.value)}
//                     className="w-full p-1 border rounded"
//                   />
//                 </td>
//                 <td className="border px-4 py-2"></td>
//               </tr>
//               {openProduct.revenue === index && (
//                 <tr>
//                   <td colSpan={3} className="border px-4 py-2 pl-12">
//                     <table className="w-full border-collapse">
//                       <thead>
//                         <tr>
//                           <th className="border px-4 py-2 text-left">Product</th>
//                           <th className="border px-4 py-2 text-left">Amount</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {item.products && item.products.map((product, idx) => (
//                           <tr key={idx}>
//                             <td className="border px-4 py-2 pl-6">
//                               <input
//                                 type="text"
//                                 value={product.name}
//                                 onChange={(e) => handleFieldChange("revenue", index, "name", e.target.value, idx)}
//                                 className="ml-2 w-full p-1 border rounded"
//                               />
//                             </td>
//                             <td className="border px-4 py-2">
//                               <input
//                                 type="number"
//                                 value={product.amount}
//                                 onChange={(e) => handleFieldChange("revenue", index, "amount", e.target.value, idx)}
//                                 className="w-full p-1 border rounded"
//                               />
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </td>
//                 </tr>
//               )}
//             </React.Fragment>
//           ))}
//           {expenseItems.map((item, index) => (
//             <React.Fragment key={index}>
//               <tr onClick={() => toggleProduct("expense", index)} className="cursor-pointer">
//                 <td className="border px-4 py-2 pl-6 flex items-center">
//                   {openProduct.expense === index ? <FaMinus /> : <FaPlus />}
//                   <input
//                     type="text"
//                     value={item.description}
//                     onChange={(e) => handleFieldChange("expense", index, "description", e.target.value)}
//                     className="ml-2 w-full p-1 border rounded"
//                   />
//                 </td>
//                 <td className="border px-4 py-2"></td>
//                 <td className="border px-4 py-2">
//                   <input
//                     type="number"
//                     value={item.amount}
//                     onChange={(e) => handleFieldChange("expense", index, "amount", e.target.value)}
//                     className="w-full p-1 border rounded"
//                   />
//                 </td>
//               </tr>
//               {openProduct.expense === index && (
//                 <tr>
//                   <td colSpan={3} className="border px-4 py-2 pl-12">
//                     <table className="w-full border-collapse">
//                       <thead>
//                         <tr>
//                           <th className="border px-4 py-2 text-left">Employee</th>
//                           <th className="border px-4 py-2 text-left">Amount</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {item.items && item.items.map((subItem, idx) => (
//                           <tr key={idx}>
//                             <td className="border px-4 py-2 pl-6">
//                               <input
//                                 type="text"
//                                 value={subItem.name}
//                                 onChange={(e) => handleFieldChange("expense", index, "name", e.target.value, idx)}
//                                 className="ml-2 w-full p-1 border rounded"
//                               />
//                             </td>
//                             <td className="border px-4 py-2">
//                               <input
//                                 type="number"
//                                 value={subItem.amount}
//                                 onChange={(e) => handleFieldChange("expense", index, "amount", e.target.value, idx)}
//                                 className="w-full p-1 border rounded"
//                               />
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </td>
//                 </tr>
//               )}
//             </React.Fragment>
//           ))}
//         </tbody>
//         <tfoot>
//           <tr>
//             <td className="border px-4 py-2 font-bold">Totals</td>
//             <td className="border px-4 py-2 font-bold">{totalRevenue.toFixed(2)}</td>
//             <td className="border px-4 py-2 font-bold">{totalExpenses.toFixed(2)}</td>
//           </tr>
//         </tfoot>
//       </table>

//       <div className="font-bold text-lg mt-4">
//         Profit: {profit.toFixed(2)}
//       </div>

//       {/* Navigation */}
//       <div className="mt-4">
//         <button
//           onClick={handlePrevMonth}
//           disabled={currentMonthIndex === 0}
//           className="mr-2 p-2 bg-gray-300 rounded disabled:bg-gray-100"
//         >
//           Previous Month
//         </button>
//         <button
//           onClick={handleNextMonth}
//           disabled={currentMonthIndex === data.length - 1}
//           className="p-2 bg-gray-300 rounded disabled:bg-gray-100"
//         >
//           Next Month
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Profit;




import React, { useEffect, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const Profit = () => {
  const [revenueItems, setRevenueItems] = useState([]);
  const [expenseItems, setExpenseItems] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [profit, setProfit] = useState(0);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  const [months] = useState([
    "January", "February", "March", "April", "May", 
    "June", "July", "August", "September", "October", 
    "November", "December"
  ]);

  const data = [
    {
      month: "January",
      revenues: [
        {
          description: "Product Sales",
          amount: 7000,
          products: [
            { name: "Product A", amount: 4000 },
            { name: "Product B", amount: 3000 },
          ],
        },
        { description: "Service Income", amount: 3000 },
        { description: "Consulting Fees", amount: 1000 },
      ],
      expenses: [
        {
          description: "Salaries",
          amount: 2500,
          items: [
            { name: "Employee 1", amount: 1200 },
            { name: "Employee 2", amount: 1300 },
          ],
        },
        { description: "Rent", amount: 1500 },
        { description: "Utilities", amount: 400 },
      ],
    },
  ];

  useEffect(() => {
    const currentMonthData = data[currentMonthIndex];
    if (currentMonthData) {
      const storedRevenues = localStorage.getItem(`revenues-${currentMonthIndex}`);
      const storedExpenses = localStorage.getItem(`expenses-${currentMonthIndex}`);
      
      setRevenueItems(storedRevenues ? JSON.parse(storedRevenues) : currentMonthData.revenues);
      setExpenseItems(storedExpenses ? JSON.parse(storedExpenses) : currentMonthData.expenses);
      calculateTotals(storedRevenues ? JSON.parse(storedRevenues) : currentMonthData.revenues, 
                      storedExpenses ? JSON.parse(storedExpenses) : currentMonthData.expenses);
    }
  }, [currentMonthIndex]);

  const calculateTotals = (revenues, expenses) => {
    const fetchedTotalRevenue = revenues.reduce((acc, item) => acc + item.amount, 0);
    const fetchedTotalExpenses = expenses.reduce((acc, item) => acc + item.amount, 0);
    setTotalRevenue(fetchedTotalRevenue);
    setTotalExpenses(fetchedTotalExpenses);
    setProfit(fetchedTotalRevenue - fetchedTotalExpenses);
  };

  // Handle input change for inline editing
  const handleFieldChange = (type, index, field, newValue, subIndex = null) => {
    if (type === "revenue") {
      const updatedRevenues = [...revenueItems];
      if (subIndex !== null) {
        updatedRevenues[index].products[subIndex][field] = field === "amount" ? parseFloat(newValue) || 0 : newValue;
      } else {
        const oldAmount = updatedRevenues[index].amount;
        updatedRevenues[index][field] = field === "amount" ? parseFloat(newValue) || 0 : newValue;
        setTotalRevenue((prevTotal) => prevTotal + (updatedRevenues[index].amount - oldAmount));
      }
      setRevenueItems(updatedRevenues);
      localStorage.setItem(`revenues-${currentMonthIndex}`, JSON.stringify(updatedRevenues));
      setProfit(totalRevenue - totalExpenses);
    } else if (type === "expense") {
      const updatedExpenses = [...expenseItems];
      if (subIndex !== null) {
        updatedExpenses[index].items[subIndex][field] = field === "amount" ? parseFloat(newValue) || 0 : newValue;
      } else {
        const oldAmount = updatedExpenses[index].amount;
        updatedExpenses[index][field] = field === "amount" ? parseFloat(newValue) || 0 : newValue;
        setTotalExpenses((prevTotal) => prevTotal + (updatedExpenses[index].amount - oldAmount));
      }
      setExpenseItems(updatedExpenses);
      localStorage.setItem(`expenses-${currentMonthIndex}`, JSON.stringify(updatedExpenses));
      setProfit(totalRevenue - totalExpenses);
    }
  };

  // Function to add a new revenue item
  const addRevenueItem = () => {
    const newRevenueItem = { description: "", amount: 0, products: [] };
    const updatedRevenues = [...revenueItems, newRevenueItem];
    setRevenueItems(updatedRevenues);
    localStorage.setItem(`revenues-${currentMonthIndex}`, JSON.stringify(updatedRevenues));
  };

  // Function to add a new expense item
  const addExpenseItem = () => {
    const newExpenseItem = { description: "", amount: 0, items: [] };
    const updatedExpenses = [...expenseItems, newExpenseItem];
    setExpenseItems(updatedExpenses);
    localStorage.setItem(`expenses-${currentMonthIndex}`, JSON.stringify(updatedExpenses));
  };

  const handleNextMonth = () => {
    if (currentMonthIndex < data.length - 1) {
      setCurrentMonthIndex(currentMonthIndex + 1);
    }
  };

  const handlePrevMonth = () => {
    if (currentMonthIndex > 0) {
      setCurrentMonthIndex(currentMonthIndex - 1);
    }
  };

  const [openProduct, setOpenProduct] = useState({ revenue: null, expense: null });

  const toggleProduct = (type, index) => {
    setOpenProduct((prev) => ({
      ...prev,
      [type]: prev[type] === index ? null : index,
    }));
  };

  return (
    <div className="income-statement-container">
      <h2 className="text-2xl font-semibold mb-4">
        {months[currentMonthIndex]} Income Statement
      </h2>

      <table className="w-full border-collapse mb-4">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-left">Description</th>
            <th className="border px-4 py-2 text-left">Revenue</th>
            <th className="border px-4 py-2 text-left">Expenses</th>
          </tr>
        </thead>
        <tbody>
          {revenueItems.map((item, index) => (
            <React.Fragment key={index}>
              <tr onClick={() => toggleProduct("revenue", index)} className="cursor-pointer">
                <td className="border px-4 py-2 pl-6 flex items-center">
                  {openProduct.revenue === index ? <FaMinus /> : <FaPlus />} 
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => handleFieldChange("revenue", index, "description", e.target.value)}
                    className="ml-2 w-full p-1 border rounded"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    value={item.amount}
                    onChange={(e) => handleFieldChange("revenue", index, "amount", e.target.value)}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="border px-4 py-2"></td>
              </tr>
            </React.Fragment>
          ))}
          {expenseItems.map((item, index) => (
            <React.Fragment key={index}>
              <tr onClick={() => toggleProduct("expense", index)} className="cursor-pointer">
                <td className="border px-4 py-2 pl-6 flex items-center">
                  {openProduct.expense === index ? <FaMinus /> : <FaPlus />}
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => handleFieldChange("expense", index, "description", e.target.value)}
                    className="ml-2 w-full p-1 border rounded"
                  />
                </td>
                <td className="border px-4 py-2"></td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    value={item.amount}
                    onChange={(e) => handleFieldChange("expense", index, "amount", e.target.value)}
                    className="w-full p-1 border rounded"
                  />
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="border px-4 py-2 font-bold">Totals</td>
            <td className="border px-4 py-2 font-bold">{totalRevenue.toFixed(2)}</td>
            <td className="border px-4 py-2 font-bold">{totalExpenses.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>

      <div className="font-bold text-lg mt-4">
        Profit: {profit.toFixed(2)}
      </div>

      {/* Add buttons for Revenue and Expenses */}
      <div className="flex justify-between mt-4">
        <button onClick={addRevenueItem} className="p-2 bg-green-500 text-white rounded">
          Add Revenue
        </button>
        <button onClick={addExpenseItem} className="p-2 bg-red-500 text-white rounded">
          Add Expense
        </button>
      </div>

      {/* Navigation */}
      <div className="mt-4">
        <button
          onClick={handlePrevMonth}
          disabled={currentMonthIndex === 0}
          className="mr-2 p-2 bg-gray-300 rounded disabled:bg-gray-100"
        >
          Previous Month
        </button>
        <button
          onClick={handleNextMonth}
          disabled={currentMonthIndex === data.length - 1}
          className="p-2 bg-gray-300 rounded disabled:bg-gray-100"
        >
          Next Month
        </button>
      </div>
    </div>
  );
};

export default Profit;
