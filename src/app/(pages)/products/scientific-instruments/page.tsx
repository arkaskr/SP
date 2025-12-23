"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";
import Image from 'next/image';

const LabEquipment = () => {
  const [openProduct, setOpenProduct] = useState<number | null>(null);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("centrifuges");


  type Category = {
    title: string;
    products: {
      id: number;
      name: string;
      image: string;
      description: string;
      details: {
        [key: string]: string | string[];
      };
    }[];
  };
  
  const categories: { [key: string]: Category } = {
    centrifuges: {
      title: "Centrifuges",
      products: [
        {
          id: 1,
          name: "Sorvall LYNX Superspeed Centrifuge",
          image: `/assets/scientific-instruments/Sorvall LYNX Superspeed Centrifuge.webp`,
          description:
            "High-performance superspeed centrifuge for research and clinical applications",
          details: {
            maxSpeed: "100,000 RPM",
            capacity: "Up to 6 x 1L",
            temperature: "-20°C to +40°C",
            features: [
              "Auto-lock rotor exchange",
              "Advanced touchscreen interface",
              "Automatic rotor recognition",
              "Energy efficiency mode",
            ],
          },
        },
        {
          id: 2,
          name: "Heraeus Megafuge 8",
          image: "/assets/scientific-instruments/Heraeus Megafuge 8.webp",
          description:
            "Versatile benchtop centrifuge for clinical and research labs",
          details: {
            maxSpeed: "15,200 RPM",
            capacity: "4 x 750mL",
            features: [
              "Auto-Lock rotor exchange",
              "Dual-purpose rotors",
              "ECO power saving mode",
            ],
          },
        },
      ],
    },
    spectroscopy: {
      title: "Spectroscopy",
      products: [
        {
          id: 3,
          name: "NanoDrop One Microvolume UV-Vis",
          image:
            "/assets/scientific-instruments/NanoDrop One Microvolume UV-Vis.webp",
          description: "Advanced spectrophotometer for micro-volume analysis",
          details: {
            sampleVolume: "1-2 µL",
            measurementTime: "<8 seconds",
            wavelengthRange: "190-850 nm",
            features: [
              "Acclaro Contaminant Identification",
              "Android-like interface",
              "Auto-blank and auto-measure",
            ],
          },
        },
      ],
    },
    microscopes: {
      title: "Microscopes",
      products: [
        {
          id: 4,
          name: "EVOS M7000 Imaging System",
          image:
            "/assets/scientific-instruments/EVOS M7000 Imaging System.webp",
          description: "Advanced fluorescence imaging system",
          details: {
            magnification: "1.25x to 100x",
            camera: "CMOS, 19.6 MP",
            features: [
              "Automated XYZ scanning",
              "LED illumination",
              "Automated multi-channel acquisition",
            ],
          },
        },
      ],
    },
    incubators: {
      title: "Incubators",
      products: [
        {
          id: 6,
          name: "Heracell VIOS CO2 Incubator",
          image:
            "/assets/scientific-instruments/Heracell VIOS CO2 Incubator.webp",
          description: "Advanced CO2 incubator with THRIVE active airflow",
          details: {
            capacity: "165L/251L",
            temperature: "Range: +3°C above ambient to 55°C",
            features: [
              "THRIVE active airflow",
              "Steri-Run sterilization",
              "ISO Class 5 cleanroom",
            ],
          },
        },
      ],
    },
    pcr: {
      title: "PCR & qPCR",
      products: [
        {
          id: 7,
          name: "QuantStudio 6 Pro Real-Time PCR",
          image:
            "/assets/scientific-instruments/QuantStudio 6 Pro Real-Time PCR.webp",
          description: "Advanced real-time PCR system with smart features",
          details: {
            throughput: "96-well, 384-well formats",
            rampRate: "6.5°C/sec",
            features: [
              "Smart Help voice commands",
              "Smart Setup rapid run setup",
              "Smart Remote monitoring",
            ],
          },
        },
      ],
    },
    balances: {
      title: "Balances & Scales",
      products: [
        {
          id: 9,
          name: "Explorer Semi-Micro Balance",
          image:
            "/assets/scientific-instruments/Explorer Semi-Micro Balance.webp",
          description: "High-precision balance for analytical measurements",
          details: {
            readability: "0.01 mg",
            capacity: "220g",
            features: [
              "Automatic internal calibration",
              "Touchscreen display",
              "Built-in ionizer",
            ],
          },
        },
      ],
    },
    chromatography: {
      title: "Chromatography",
      products: [
        {
          id: 10,
          name: "Agilent 1260 Infinity II HPLC System",
          image:
            "/assets/scientific-instruments/Agilent 1260 Infinity II HPLC System.webp",
          description: "High-performance liquid chromatography system",
          details: {
            flowRate: "0.001–5 mL/min",
            pressure: "Up to 600 bar",
            features: [
              "High-resolution separations",
              "Automated sample injection",
              "Advanced UV detector",
            ],
          },
        },
      ],
    },
    electrophoresis: {
      title: "Electrophoresis",
      products: [
        {
          id: 11,
          name: "PowerPac Basic Power Supply",
          image:
            "/assets/scientific-instruments/PowerPac Basic Power Supply.webp",
          description:
            "Versatile power supply for electrophoresis applications",
          details: {
            voltage: "10-300V",
            current: "0.01-400 mA",
            features: [
              "Programmable settings",
              "Dual output operation",
              "Built-in timer",
            ],
          },
        },
      ],
    },
    autoclaves: {
      title: "Autoclaves & Sterilizers",
      products: [
        {
          id: 12,
          name: "Tuttnauer 2540M Autoclave",
          image: "/assets/scientific-instruments/Tuttnauer 2540M Autoclave.jpg",
          description: "Reliable autoclave for laboratory sterilization",
          details: {
            chamberSize: "23L",
            cycleTime: "30-40 minutes",
            features: [
              "Automatic shutoff",
              "Fast heat-up time",
              "Easy-to-use control panel",
            ],
          },
        },
      ],
    },
    gasChromatography: {
      title: "Gas Chromatography",
      products: [
        {
          id: 13,
          name: "PerkinElmer Clarus 590 GC",
          image: "/assets/scientific-instruments/PerkinElmer Clarus 590 GC.jpg",
          description:
            "Efficient gas chromatograph for analytical applications",
          details: {
            columnOven: "RT to 450°C",
            detectors: "FID, TCD, ECD",
            features: [
              "Touchscreen interface",
              "Rapid temperature ramping",
              "Low carrier gas consumption",
            ],
          },
        },
      ],
    },
    spectrometry: {
      title: "Mass Spectrometry",
      products: [
        {
          id: 14,
          name: "Thermo Orbitrap Exploris 120",
          image: "/assets/scientific-instruments/Thermo Orbitrap Exploris 120.webp",
          description:
            "High-resolution mass spectrometer for proteomics research",
          details: {
            massRange: "40-6,000 m/z",
            resolution: "120,000",
            features: [
              "Advanced data acquisition",
              "Easy maintenance",
              "High sensitivity",
            ],
          },
        },
      ],
    },
    dnaSequencing: {
      title: "DNA Sequencing",
      products: [
        {
          id: 17,
          name: "Illumina MiSeq System",
          image: "/assets/scientific-instruments/Illumina MiSeq System.png",
          description:
            "Advanced benchtop sequencer for small genome applications",
          details: {
            readLength: "2x300 bp",
            throughput: "Up to 15 Gb per run",
            features: [
              "Onboard data analysis",
              "Automated library prep",
              "Flexible run configurations",
            ],
          },
        },
      ],
    },
    pipettes: {
      title: "Pipettes & Liquid Handling",
      products: [
        {
          id: 18,
          name: "Eppendorf Research Plus Pipette",
          image: "/assets/scientific-instruments/Eppendorf Research Plus Pipette.jpeg",
          description: "Ergonomic and precise adjustable-volume pipette",
          details: {
            volumeRange: "0.1-10 µL",
            accuracy: "±0.6%",
            features: [
              "Lightweight design",
              "Spring-loaded tip cone",
              "Autoclavable components",
            ],
          },
        },
      ],
    },
    thermalCyclers: {
      title: "Thermal Cyclers",
      products: [
        {
          id: 19,
          name: "Applied Biosystems SimpliAmp Thermal Cycler",
          image:
            "/assets/scientific-instruments/Applied Biosystems SimpliAmp Thermal Cycler.avif",
          description: "Compact and easy-to-use PCR thermal cycler",
          details: {
            blockFormat: "96-well",
            rampRate: "4°C/sec",
            features: [
              "Intuitive touchscreen interface",
              "Adjustable heated lid",
              "Gradient optimization",
            ],
          },
        },
      ],
    },
    labFurnaces: {
      title: "Laboratory Furnaces",
      products: [
        {
          id: 20,
          name: "Thermo Lindberg Blue M Furnace",
          image:
            "/assets/scientific-instruments/Thermo Lindberg Blue M Furnace.jpg",
          description: "High-temperature furnace for material processing",
          details: {
            maxTemperature: "1100°C",
            chamberSize: "4L",
            features: [
              "Programmable temperature control",
              "Ceramic fiber insulation",
              "Fast heat-up time",
            ],
          },
        },
      ],
    },
    biosafetyCabinets: {
      title: "Biosafety Cabinets",
      products: [
        {
          id: 21,
          name: "Labconco Purifier Logic+ Class II",
          image:
            "/assets/scientific-instruments/Labconco Purifier Logic+ Class II.jpg",
          description:
            "Advanced biosafety cabinet for contamination protection",
          details: {
            airflow: "Class II, Type A2",
            workSurface: "Stainless steel",
            features: [
              "Energy-efficient design",
              "Digital airflow monitoring",
              "Ergonomic sloped sash",
            ],
          },
        },
      ],
    },
  };
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setMobileCategoryOpen(false);
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-12 px-4 md:px-6 border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-3">
            Scientific Instruments
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mt-3 max-w-2xl mx-auto">
            Discover precision-engineered instruments for groundbreaking research
          </p>
        </div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-100 rounded-full opacity-20"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-purple-100 rounded-full opacity-20"></div>
      </div>

      {/* Mobile Category Selector */}
      <div className="md:hidden sticky top-0 z-20 bg-white shadow-md p-4">
        <div 
          className="flex items-center justify-between"
          onClick={() => setMobileCategoryOpen(!mobileCategoryOpen)}
        >
          <div className="flex items-center">
            <span className="font-medium text-gray-800">Category: </span>
            <span className="ml-2 font-semibold text-blue-700">{categories[activeCategory].title}</span>
          </div>
          {mobileCategoryOpen ? (
            <X className="w-6 h-6 text-gray-600" />
          ) : (
            <Menu className="w-6 h-6 text-gray-600" />
          )}
        </div>

        {mobileCategoryOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg overflow-hidden mt-1 animate-in slide-in-from-top duration-200 z-30">
            <div className="p-2 max-h-[70vh] overflow-y-auto">
              {Object.entries(categories).map(([key, category]) => (
                <button
                  key={key}
                  className={`w-full text-left px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                    activeCategory === key 
                      ? "bg-blue-50 text-blue-700" 
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => handleCategoryChange(key)}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex h-[calc(100vh-12rem)] md:h-[calc(100vh-14rem)]">
          {/* Desktop Category Sidebar */}
          <div className="hidden md:block w-64 shrink-0 pr-6">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden h-full">
              <h3 className="font-semibold text-gray-700 px-4 py-3 border-b border-gray-100">
                Categories
              </h3>
              <ScrollArea className="h-[calc(100%-3rem)]">
                <div className="p-2">
                  {Object.entries(categories).map(([key, category]) => (
                    <button
                      key={key}
                      className={`w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 mb-1 ${
                        activeCategory === key
                          ? "bg-blue-50 text-blue-700 shadow-sm" 
                          : "hover:bg-gray-50 text-gray-700"
                      }`}
                      onClick={() => setActiveCategory(key)}
                    >
                      {category.title}
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>

          {/* Product Display Area */}
          <div className="flex-1 bg-white rounded-xl shadow-sm overflow-hidden">
            {Object.entries(categories).map(([key, category]) => (
              <div
                key={key}
                className={`h-full ${activeCategory === key ? "block" : "hidden"}`}
              >
                <ScrollArea className="h-full">
                  <div className="p-4 md:p-6 space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-3">
                      {category.title}
                    </h2>
                    
                    {category.products.map((product) => (
                      <Card
                        key={product.id}
                        className="overflow-hidden transition-all duration-300 hover:shadow-md border-none"
                      >
                        <div className="flex flex-col lg:flex-row">
                          <div className="w-full lg:w-1/3 bg-gray-50 p-6 flex items-center justify-center">
                            <div className="relative w-full aspect-square max-w-xs">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-contain rounded-lg transform transition-transform duration-300 hover:scale-105"
                              />
                            </div>
                          </div>
                          
                          <div className="w-full lg:w-2/3 p-0">
                            <CardHeader
                              className="cursor-pointer p-6 pb-4"
                              onClick={() => setOpenProduct(openProduct === product.id ? null : product.id)}
                            >
                              <div className="flex justify-between items-center">
                                <CardTitle className="text-xl md:text-2xl font-bold text-gray-800">
                                  {product.name}
                                </CardTitle>
                                <div className="bg-gray-100 p-2 rounded-full transition-colors hover:bg-gray-200">
                                  {openProduct === product.id ? (
                                    <ChevronUp className="h-5 w-5 text-blue-600" />
                                  ) : (
                                    <ChevronDown className="h-5 w-5 text-blue-600" />
                                  )}
                                </div>
                              </div>
                              <CardDescription className="text-base mt-3 text-gray-600">
                                {product.description}
                              </CardDescription>
                            </CardHeader>
                            
                            {openProduct === product.id && (
                              <CardContent className="animate-in fade-in duration-200 p-6 pt-2 bg-gradient-to-br from-white to-gray-50">
                                <div className="grid md:grid-cols-2 gap-6">
                                  {Object.entries(product.details).map(([key, value]) => (
                                    <div key={key} className="space-y-3">
                                      <h4 className="font-semibold capitalize text-blue-700 border-b border-blue-100 pb-1">
                                        {key.replace(/([A-Z])/g, ' $1').trim()}
                                      </h4>
                                      {Array.isArray(value) ? (
                                        <ul className="space-y-2">
                                          {value.map((item, index) => (
                                            <li key={index} className="flex items-start">
                                              <span className="inline-block h-2 w-2 mt-1.5 mr-2 bg-blue-500 rounded-full"></span>
                                              <span className="text-gray-700">{item}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      ) : (
                                        <p className="text-gray-700">{value}</p>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabEquipment;
