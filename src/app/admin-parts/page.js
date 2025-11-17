"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import "./PartsPage.css";

export default function AdminPartsPage() {
  const router = useRouter();
  
  const categories = [
    "Processor (CPU)",
    "Graphics Card (GPU)",
    "Motherboard",
    "Memory (RAM)",
    "Storage",
    "Power Supply",
    "Case",
    "Cooling",
    "Operating System",
    "Networking",
  ];

  // Map category names to Supabase table names
  const categoryToTable = {
    "Processor (CPU)": "cpus",
    "Graphics Card (GPU)": "gpus",
    "Motherboard": "motherboards",
    "Memory (RAM)": "memories",
    "Storage": "storages",
    "Power Supply": "psus",
    "Case": "cases",
    "Cooling": "coolings",
    "Operating System": "operating_systems",
    "Networking": "networkings",
  };

  const [parts, setParts] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [currentCategory, setCurrentCategory] = useState("");
  const [form, setForm] = useState({ name: "", price: "" });

  // Fetch all parts from Supabase on component mount
  useEffect(() => {
    fetchAllParts();
  }, []);

  const fetchAllParts = async () => {
    const allParts = {};
    
    try {
      for (const category of categories) {
        const tableName = categoryToTable[category];
        const { data, error } = await supabase
          .from(tableName)
          .select('*')
          .order('id', { ascending: true });
        
        if (error) {
          console.error(`Error fetching ${tableName}:`, error);
          allParts[category] = [];
        } else {
          // Map database fields to our form structure
          allParts[category] = data.map(item => ({
            id: item.id.toString(),
            name: item.name || '',
            price: item.price?.toString() || ''
          }));
        }
      }
      setParts(allParts);
    } catch (error) {
      console.error('Error fetching parts:', error);
    }
  };

  const handleAddClick = (category) => {
    setCurrentCategory(category);
    setForm({ name: "", price: "" });
    setEditItem(null);
    setShowModal(true);
  };

  const handleConfirm = async () => {
    if (!form.name.trim()) {
      alert("Please enter an item name.");
      return;
    }
    
    const tableName = categoryToTable[currentCategory];
    const priceValue = form.price.trim() ? parseFloat(form.price) : null;
    
    try {
      if (editItem !== null) {
        // Update existing item
        const itemToUpdate = parts[currentCategory][editItem];
        const { error } = await supabase
          .from(tableName)
          .update({ 
            name: form.name.trim(),
            price: priceValue
          })
          .eq('id', parseInt(itemToUpdate.id));
        
        if (error) throw error;
        
        // Update UI immediately
        setParts((prev) => ({
          ...prev,
          [currentCategory]: prev[currentCategory].map((item, idx) =>
            idx === editItem
              ? { ...item, name: form.name.trim(), price: form.price.trim() }
              : item
          )
        }));
      } else {
        // Insert new item and get the returned data
        const { data, error } = await supabase
          .from(tableName)
          .insert({ 
            name: form.name.trim(),
            price: priceValue
          })
          .select();
        
        if (error) throw error;
        
        // Add new item to UI immediately
        if (data && data[0]) {
          setParts((prev) => ({
            ...prev,
            [currentCategory]: [
              ...(prev[currentCategory] || []),
              {
                id: data[0].id.toString(),
                name: data[0].name || '',
                price: data[0].price?.toString() || ''
              }
            ]
          }));
        }
      }
      
      setShowModal(false);
    } catch (error) {
      console.error('Error saving item:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleRightClick = (category, index, e) => {
    e.preventDefault();
    
    // Remove any existing context menus first
    const existingMenus = document.querySelectorAll(".context-menu");
    existingMenus.forEach(menu => menu.remove());
    
    const menu = document.createElement("div");
    menu.className = "context-menu";
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.onclick = async () => {
      const itemToDelete = parts[category][index];
      const tableName = categoryToTable[category];
      
      menu.remove();
      
      try {
        const { error } = await supabase
          .from(tableName)
          .delete()
          .eq('id', parseInt(itemToDelete.id));
        
        if (error) throw error;
        
        // Update UI immediately without refetching
        setParts((prev) => ({
          ...prev,
          [category]: prev[category].filter((_, i) => i !== index)
        }));
      } catch (error) {
        console.error('Error deleting item:', error);
        alert(`Error: ${error.message}`);
      }
    };

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => {
      setEditItem(index);
      setForm(parts[category][index]);
      setCurrentCategory(category);
      setShowModal(true);
      menu.remove();
    };

    menu.append(removeBtn, editBtn);
    document.body.append(menu);
    menu.style.top = `${e.pageY}px`;
    menu.style.left = `${e.pageX}px`;

    const removeMenu = () => menu.remove();
    setTimeout(() => document.addEventListener("click", removeMenu, { once: true }), 0);
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Dashboard</h2>
        </div>
        <ul>
          <li onClick={() => router.push('/dashboard')}>Dashboard</li>
          <li onClick={() => router.push('/dashboard')}>Orders</li>
          <li className="active">Parts</li>
          <li>Change password</li>
        </ul>
      </div>

      <div className="main">
        <h1>Parts</h1>

        <div className="parts-container">
          {categories.map((category) => (
            <div className="category" key={category}>
              <h3>{category}</h3>
              <div className="items">
              {(parts[category] || []).map((item, index) => (
                <motion.div
                  key={item.id}
                  className="item"
                  onContextMenu={(e) => handleRightClick(category, index, e)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name} {item.price ? `- $${item.price}` : ""}
                </motion.div>
              ))}
              <motion.button
                className="add-btn"
                onClick={() => handleAddClick(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                Add
              </motion.button>
            </div>
          </div>
        ))}
        </div>

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <div className="modal-header">
                <h3>{editItem !== null ? `Edit ${currentCategory}` : `Add ${currentCategory}`}</h3>
                <button className="close-btn" onClick={() => setShowModal(false)}>
                  ×
                </button>
              </div>
              <input
                type="text"
                placeholder="enter Item name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                maxLength={50}
              />
              <input
                type="text"
                placeholder="enter Item price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                maxLength={15}
              />
              <motion.button 
                onClick={handleConfirm}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                Confirm
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
