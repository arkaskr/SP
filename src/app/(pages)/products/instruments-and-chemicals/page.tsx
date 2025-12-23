
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

export default function InstrumentsAndChemicalsForm() {
  const [category, setCategory] = useState("Scientific Instruments");
  const [casEntries, setCasEntries] = useState([
    { cas: "", chemicalName: "", manufacturer: "", note: "" },
  ]);
  const [details, setDetails] = useState("");
  const [instituteName, setInstituteName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleAddCAS = () => {
    setCasEntries([
      ...casEntries,
      { cas: "", chemicalName: "", manufacturer: "", note: "" },
    ]);
  };

  const handleCASChange = (index: number, updatedEntry: typeof casEntries[0]) => {
    const updated = [...casEntries];
    updated[index] = updatedEntry;
    setCasEntries(updated);
  };

  const handleDeleteCAS = (index: number) => {
    const updated = [...casEntries];
    updated.splice(index, 1);
    setCasEntries(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    const synergiaprep = "914040a6-f7c8-4750-91b9-8aef783befb2";

    formData.append("access_key", synergiaprep);
    formData.append("Institute/University Name", instituteName);
    formData.append("Your Name", userName);
    formData.append("Email", email);
    formData.append("Phone Number", phone);
    formData.append("Institute/University Address", address);
    formData.append("Category", category);

    if (category === "Chemicals") {
      casEntries.forEach((entry, idx) => {
        formData.append(`CAS Number ${idx + 1}`, entry.cas);
        formData.append(`Chemical Name ${idx + 1}`, entry.chemicalName);
        formData.append(`Manufacturer ${idx + 1}`, entry.manufacturer);
        formData.append(`Note ${idx + 1}`, entry.note);
      });
    } else if (category === "Scientific Instruments") {
      formData.append("Questions & Comments", details);
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("Web3Forms response:", result);

      if (result.success) {
        alert("Form submitted successfully!");
        setInstituteName("");
        setUserName("");
        setEmail("");
        setPhone("");
        setAddress("");
        setDetails("");
        setCasEntries([{ cas: "", chemicalName: "", manufacturer: "", note: "" }]);
        setCategory("Scientific Instruments");
      } else {
        alert("Failed to submit the form. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong while submitting the form.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#0f3bfe] via-blue-400 dark:via-blue-900 to-blue-200 pt-10 bg-cover bg-center p-4 pt-36 m-0">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-2xl w-[900px] p-8 rounded-3xl shadow-xl bg-white/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
              Request Quotation
            </h1>
          </motion.div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Label className="block mb-2 text-blue-800 font-semibold text-lg">
                Institute / University / Company Name
              </Label>
              <Input
                type="text"
                placeholder="Enter your institute or university name"
                value={instituteName}
                onChange={(e) => setInstituteName(e.target.value)}
                required
                className="bg-white/20 text-blue-800 placeholder-gray-400 border-none focus:ring-blue-300 focus:bg-white/30 transition-all duration-300"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Label className="block mb-2 text-blue-800 font-semibold text-lg">
                Your Name
              </Label>
              <Input
                type="text"
                placeholder="Enter your full name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                className="bg-white/20 text-blue-800 placeholder-gray-400 border-none focus:ring-blue-300 focus:bg-white/30 transition-all duration-300"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Label className="block mb-2 text-blue-800 font-semibold text-lg">
                Email
              </Label>
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/20 text-blue-800 placeholder-gray-400 border-none focus:ring-blue-300 focus:bg-white/30 transition-all duration-300"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Label className="block mb-2 text-blue-800 font-semibold text-lg">
                Phone Number
              </Label>
              <Input
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="bg-white/20 text-blue-800 placeholder-gray-400 border-none focus:ring-blue-300 focus:bg-white/30 transition-all duration-300"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <Label className="block mb-2 text-blue-800 font-semibold text-lg">
                Institute / University / Company Address
              </Label>
              <Textarea
                placeholder="Enter full address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={2}
                required
                className="bg-white/20 text-blue-800 placeholder-gray-400 border-none focus:ring-blue-300 focus:bg-white/30 transition-all duration-300"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <Label className="block mb-2 text-blue-800 font-semibold text-lg">
                Select Category
              </Label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 bg-white/20 text-blue-800 border-none rounded-md focus:ring-blue-300 focus:bg-white/30 transition-all duration-300"
              >
                <option value="Scientific Instruments">Scientific Instruments</option>
                <option value="Chemicals">Chemicals</option>
              </select>
            </motion.div>

            {category === "Chemicals" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >
                <Label className="block mb-2 text-blue-800 font-semibold text-lg">
                  Chemical Information
                </Label>
                <div className="grid grid-cols-5 gap-4 font-semibold text-sm text-blue-500 mb-2">
                  <div>CAS</div>
                  <div>Chemical Name</div>
                  <div>Manufacturer</div>
                  <div>Note</div>
                  <div>Action</div>
                </div>
                {casEntries.map((entry, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="grid grid-cols-5 gap-4 mb-2 items-center"
                  >
                    <Input
                      placeholder="CAS Number"
                      value={entry.cas}
                      onChange={(e) =>
                        handleCASChange(index, { ...entry, cas: e.target.value })
                      }
                      className="bg-white/20 text-blue-800 placeholder-gray-400 border-none focus:ring-blue-300 focus:bg-white/30 transition-all duration-300"
                    />
                    <Input
                      placeholder="Chemical Name"
                      value={entry.chemicalName}
                      onChange={(e) =>
                        handleCASChange(index, { ...entry, chemicalName: e.target.value })
                      }
                      className="bg-white/20 text-blue-800 placeholder-gray-400 border-none focus:ring-blue-300 focus:bg-white/30 transition-all duration-300"
                    />
                    <Input
                      placeholder="Manufacturer"
                      value={entry.manufacturer}
                      onChange={(e) =>
                        handleCASChange(index, { ...entry, manufacturer: e.target.value })
                      }
                      className="bg-white/20 text-blue-800 placeholder-gray-400 border-none focus:ring-blue-300 focus:bg-white/30 transition-all duration-300"
                    />
                    <Input
                      placeholder="Note"
                      value={entry.note}
                      onChange={(e) =>
                        handleCASChange(index, { ...entry, note: e.target.value })
                      }
                      className="bg-white/20 text-blue-800 placeholder-gray-400 border-none focus:ring-blue-300 focus:bg-white/30 transition-all duration-300"
                    />
                    {casEntries.length > 1 && (
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => handleDeleteCAS(index)}
                        className="w-2/3 rounded-3xl transition-all duration-300"
                      >
                        Delete
                      </Button>
                    )}
                  </motion.div>
                ))}
                <div className="mt-4 flex justify-center">
                  <Button
                    type="button"
                    className="rounded-2xl bg-purple-400 hover:bg-purple-500 transition-all duration-300"
                    onClick={handleAddCAS}
                  >
                    Add More
                  </Button>
                </div>
              </motion.div>
            )}

            {category === "Scientific Instruments" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >
                <Label className="block mb-2 text-blue-500 font-semibold text-center">
                  Questions & Comments
                </Label>
                <Textarea
                  placeholder="Describe the instruments you need or any related comments"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  rows={5}
                  className="bg-white/20 text-blue-800 placeholder-gray-400 border-none focus:ring-blue-300 focus:bg-white/30 transition-all duration-300"
                />
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.7 }}
              className="flex justify-center mt-4"
            >
              <Button
                type="submit"
                className="w-1/2 max-w-xs bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-2xl shadow-md transition-all duration-300"
              >
                Submit
              </Button>
            </motion.div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
