import React from "react";
import { Hero } from "@/components/Hero";
import { AboutCompany } from "@/components/About/AboutCompany";
import { AdvisoryBoard } from "@/components/About/AdvisoryBoard";
import { FounderDisplay } from "@/components/About/Founders";
import { TechTeam } from "@/components/About/TechTeam";

const adminadvisors = [
  {
    name: "Dr. Chiranjib Bhattacharjee",
    position: [
      "President, West Bengal Council of Higher Secondary Education",
      "Professor, Department of Chemical Engineering, Jadavpur University",
    ],
    expertise: [
      "Membrane Separation",
      "Wastewater Treatment",
      "Environmental Remediation",
    ],
    bio: "Dr. Chiranjib Bhattacharjee is a distinguished researcher and professor in Chemical Engineering, specializing in membrane separation technologies and environmental remediation. With a strong commitment to sustainable solutions, his work has significantly contributed to wastewater treatment and innovative separation techniques. His extensive research and academic leadership have played a crucial role in advancing chemical engineering methodologies.",
    achievements: [
      "Published over 100 research papers in reputed international journals.",
      "Significant contributions to membrane-based separation processes and wastewater treatment.",
      "Recipient of multiple awards for excellence in research and academic contributions.",
      "Mentored numerous doctoral scholars in chemical engineering.",
      "Regularly invited as a keynote speaker at international conferences on environmental technology.",
      "Active member of prestigious organizations such as the Indian Institute of Chemical Engineers (IIChE) and the Membrane Society of India.",
    ],
    image: "/assets/AboutUs/Advisory/Dr_Chiranjib_Bhattacharjee.jpeg",
  },
  {
    name: "Dr. Snehamanju Basu",
    position: [
      "Professor, Dean of Student and Cultural Affairs, Adamas University",
      "Ex-Registrar, Jadavpur University (From 2018 - 2024)",
    ],
    expertise: ["Academic Administration", "Curriculum Development"],
    bio: "Dr. Snehamanju Basu is a distinguished academician and administrator whose career has significantly influenced the field of geography and higher education. With a strong commitment to academic excellence and institutional development, she has excelled as a leader, educator, and scholar. Her dynamic contributions have left a lasting impact on various institutions and academic initiatives. Dr. Basu's innovative leadership and academic vision have profoundly shaped the institutions she has served, making her a trailblazer in academia and administration.",
    achievements: [
      "Established geography honours programs at Lal Baba College and Kalinagar Mahavidyalaya.",
      "One of the founder member of  the postgraduate geography department at Lady Brabourne College (2003) and developed it into an Advanced Research Centre (2014).",
      "Began mentoring doctoral scholars in geography in 2013.",
      "Became the first female Registrar at Jadavpur University in 2018.",
      "Authored books, published numerous research papers, and presented at global academic forums.",
      "Active member of prestigious organizations, including GSI, INCA, and IGC.",
    ],
    image: "/assets/AboutUs/Advisory/Dr_Snehamanju_Basu.jpg",
  },
  {
    name: "Dr. Rajib Bandyopadhyay",
    position: [
      "President, Institute of Innovation Centre, Jadavpur University",
      "Professor, Dept of Instrumentation and Electronics Engg, Jadavpur University",
    ],
    expertise: [
      "Sensors",
      "Electronic nose",
      "Electronic tongue",
      "NIR spectroscopy",
    ],
    bio: "Rajib Bandyopadhyay is a Professor in the Department of Instrumentation and Electronics Engineering at Jadavpur University. His research focuses on sensor technologies, including electronic nose and electronic tongue systems, and their applications in food quality assessment, environmental monitoring, and biomedical fields. He has contributed significantly to the development of advanced sensing systems for black tea quality evaluation, aroma profiling, and detection of adulterants in food products.",
    achievements: [
      "Developed carbon quantum dots from natural resources for sustainable applications.",
      "Pioneered the use of electronic nose and tongue systems for black tea quality evaluation.",
      "Published extensively on sensor technologies, including high-impact papers on electronic nose and tongue systems.",
      "Significant contributions to the detection of adulterants in food products using NIR spectroscopy.",
      "Developed advanced electrochemical sensors for detecting biomolecules and environmental pollutants.",
      "Recipient of multiple awards and recognitions for research in sensor technologies and food engineering.",
    ],
    image: "/assets/AboutUs/Advisory/RajibBandyopadhyay.jpeg",
  },
];
const boardadvisors = [
  {name: "Prof. (Dr.) Somnath Mukherjee",
  position: [
    "Adjunct Professor, Heritage Institute of Technology, Kolkata",
    "Ex-Professor, Civil Engineering Department, Jadavpur University"
  ],
  expertise: [
    "Water treatment plant",
    "Municipality sewage treatment plant",
    "Geoenvironmental Engineering",
    "Liquid retaining structures",
    "Biological reactor design"
  ],
  bio: "Dr. Somnath Mukherjee has more than four decades of professional experience in both Academia and Industry, specializing in Environmental Engineering and Structural Design. After graduating in Civil Engineering from Bengal Engineering College, Shibpur (now IIEST, Shibpur) in 1980, he pursued his M.Tech in Environmental Engineering from IIT Kharagpur in 1983. He worked in the industry for several years, holding key positions in organizations like NTPC Ltd., Development Consultants Pvt. Ltd., and Turnkey International Ltd. before returning to academia. He completed his PhD in Environmental Engineering from IIT Kharagpur in 1993 and served as a faculty member in the Civil Engineering Department at Jadavpur University for three decades. His research primarily focuses on water and wastewater treatment, biological reactor design, and geoenvironmental engineering. Apart from his academic contributions, he has been actively involved in consultancy projects for government and private organizations, contributing to major infrastructure and public health engineering projects."
  ,
  achievements: [
    "Published 86 articles in peer-reviewed international journals and 60 articles in conference proceedings.",
    "Authored/co-authored two books on Environmental Engineering.",
    "Reviewer for 12 peer-reviewed journals.",
    "Served as an examiner for WBPSC, WBUT, NIT-Durgapur, NIT-Patna, IIEST-Shibpur, IIT Kharagpur, UIT Burdwan, NIT Agartala, Anna University-Chennai, and Coal India.",
    "Worked in high-value consultancy projects for NTPC, Hindustan Copper Limited, National Dairy Development Board, Government of West Bengal, KMDA, Howrah Improvement Trust, Coal India, and others.",
    "Member of prestigious academic/government bodies including AICTE, UPSC (Engineering Services Exam & Interview), WBPSC, WBUT, and BIRAC."
  ],
  image: "/assets/AboutUs/Advisory/Dr_Somnath_Mukherjee.png"
},
{
  name: "Dr. Nur Al Hasan Haldar",
  position: [
    "Lecturer, School of Electrical Engineering, Computer and Mathematical Sciences (EECMS)",
    "Faculty of Science and Engineering",
    "Curtin University, Perth, Australia"
  ],
  expertise: [
    "Data Science",
    "Cyber Security",
    "Graph Data Analytics and Modeling",
    "Social Network Analysis",
    "Artificial Intelligence",
    "Machine Learning"
  ],
  "bio": "Dr. Nur Al Hasan Haldar is a Lecturer at Curtin University's School of Electrical Engineering, Computer and Mathematical Sciences (EECMS). With a PhD from The University of Western Australia, supported by CSIRO, his research focuses on data science, cybersecurity, and the optimization of computational methods for large-scale data management. He has made significant contributions to database systems, data modeling, and algorithmic efficiency, particularly in cybersecurity applications. Dr. Haldar has published extensively in top-tier journals and conferences, including TKDE, VLDB Journal, and ICDE. He is an active member of IEEE, ACM, and the Australian Computer Society, and serves as a reviewer and editor for prestigious journals and conferences.",
  achievements: [
    "Recipient of the ACS 1962 Medal for excellence in IT and computer science research.",
    "Awarded travel grants for presenting research at VLDB, WSDM, and Australasian Computer Science Week.",
    "Third place in the Alpha Innovation Contest, Perth, Australia.",
    "Published in high-impact journals such as IEEE Transactions on Knowledge and Data Engineering and VLDB Journal.",
    "Served as Special Issue Editor for Array Journal (Elsevier) and Guest Editor for Electronics (MDPI).",
    "Active member of IEEE, ACM, and the Australian Computer Society."
  ],
  image: "/assets/AboutUs/Advisory/NurAlHasanHaldar.jpg"
},{
  "name": "Dr. Wahida Rahman",
  "position": [
    "Senior Scientific Officer","West Bengal Forensic Science Laboratory","PhD in Physics, Jadavpur University",
  ],
  "expertise": [
    "Materials Science",
    "Energy Harvesting",
    "Nanomaterials",
    "Energy Density"
  ],
  "bio": "Wahida Rahman is a Ph.D. scholar specializing in Materials Science, with a focus on energy harvesting, nanomaterials, and energy density. Her research includes the development of advanced nanocomposites for piezoelectric and triboelectric nanogenerators, as well as the enhancement of energy storage performance in polymer-based nano-dielectrics. She has contributed to the field through innovative work on self-powered energy harvesting devices and high-sensitive nanofiber sensors, with publications in high-impact journals such as Nanotechnology and Materials Today: Proceedings.",
  "achievements": [
    "Published research on improved breakdown strength and energy storage performance of γ-PVDF/montmorillonite clay nano-dielectrics in Nanotechnology (2016).",
    "Developed self-powered piezoelectric nanogenerators based on ZnO nanoparticles for energy harvesting applications.",
    "Contributed to the development of highly durable piezoelectric energy harvesters using nanocomposites.",
    "Investigated electrospinning-based PVDF-TrFE nanofiber sensors for high-sensitive acoustic detection.",
    "Published in journals such as Materials Research Express, physica status solidi (a), and Current Science."
  ],
  "image": "/assets/AboutUs/Advisory/WahidaRahman.jpg"
}
  
];
const associates = [
  {
    name: "Dr. Nur Amin Hoque",
    position: [
      "R&D Scientist",
      "Postdoctoral Research from Zhejiang University, IISER Mohali, and IACS Kolkata",
    ],
    expertise: [
      "Nanomaterials",
      "Polymer Nano-Composites",
      "Energy Harvesting Technologies",
      "Biomedical Applications",
    ],
    bio: "Dr. Nur Amin Hoque is a distinguished researcher in Materials Science, specializing in sustainable energy generation and biomedical applications. With extensive experience in developing advanced materials, he has made significant contributions to wearable energy harvesting devices, nanogenerators, and biomedical imaging technologies. Dr. Hoque’s work addresses critical challenges in sustainability and healthcare, establishing him as a leader in the field.",
    achievements: [
      "Developed high-performance piezoelectric and triboelectric nanogenerators for mechanical energy harvesting.",
      "Innovated wearable triboelectric nanogenerators for real-time healthcare monitoring.",
      "Created advanced ultrasound transducers and photoacoustic sensors for biomedical imaging.",
      "1st Prize in Basic Science at the National Convention Anveshan (2017–18).",
      "Recipient of the SERB National Post-Doctoral Fellowship (2022).",
      "Published extensively in high-impact journals, with significant citations in Materials Science.",
    ],
    image: "/assets/AboutUs/Associates/DrNurAminHoque.jpg",
  },
  {
    "name": "Namrata Das",
    "position": [
      "Senior Research Fellow",
      "Doctoral Student at Jadavpur University, Kolkata"
    ],
    "expertise": [
      "Material Characterization",
      "Piezoelectric Nanogenerator",
      "Triboelectric Nanogenerator",
      "Polymers",
      "Material Science",
      "Energy Conservation"
    ],
    "bio": "Namrata Das is a Senior Research Fellow and Doctoral Student at Jadavpur University, Kolkata, specializing in nanomaterials and polymer nano-composites. Her research focuses on advancing high-performance applications, including piezoelectric devices, triboelectric energy harvesters, flexible sensors, and biomedical piezoelectric ultrasound transducers. She enhances piezoelectric properties in PVDF-based polymeric thin films using nanoparticles and biodegradable nanofibers. Her work aims to fabricate durable energy harvesters for mechanical-to-electrical energy conversion and wearable triboelectric nanogenerators for real-time healthcare monitoring. Namrata is dedicated to promoting sustainable energy solutions and improving healthcare technologies through innovative materials and devices.",
    "achievements": [
      "Presented research at the European Materials Research Society (E-MRS) Spring Meeting 2024 in Strasbourg, France.",
      "Contributed to the development of wearable triboelectric nanogenerators with improved charge retention.",
      "Published research on micro-patterned nanocomposites for self-powered wearable devices.",
      "Specializes in material characterization and energy conservation technologies."
    ],
    "image": "/assets/AboutUs/Associates/NamrataDas.jpeg"
  },
  {
    "name": "Dr. Debmalya Sarkar",
    "position": [
      "Research Associate at IIT Hyderabad, Department of Electrical Engineering",
      "PhD in Physics,Jadavpur University"
    ],
    "expertise": [
      "Self-Powered Devices",
      "Wearable and Skin-Attachable Devices",
      "Piezoelectric and Triboelectric Effects",
      "Electrospinning",
      "2D Materials",
      "Electronic Skin (E-Skin)",
      "Gas Sensing Applications"
    ],
    "bio": "Debmalya Sarkar is a Research Associate at IIT Hyderabad in the Department of Electrical Engineering and a recently completed doctoral graduate from Jadavpur University. His research focuses on self-powered, wearable, and skin-attachable devices utilizing piezoelectric and triboelectric effects. He works with bio-compatible polymers, natural nanomaterials, and lead-free semiconductors, employing techniques like drop casting and electrospinning. His devices harvest waste mechanical, vibrational, and biomechanical energy, converting it into electricity. Debmalya has applied these technologies to monitor human physiological activities and detect artificial finger movements. Currently, he is exploring surface engineering, 2D materials, and electronic skin for wireless healthcare units and gas sensing applications.",
    "achievements": [
      "Recipient of the MRSI Young Scientist Award 2024.",
      "Successfully defended his PhD thesis on self-powered and wearable piezoelectric/triboelectric nanogenerators.",
      "Published research on tribo-piezo coupling effects in self-powered devices.",
      "Awarded the UGC NET Senior and Junior Research Fellowship (2019).",
      "Received the DST Inspire SHE scholarship for academic excellence during his bachelor's and master's degrees."
    ],
    "image": "/assets/AboutUs/Associates/DebmalyaSarkar.jpg"
  }
];
// const legal = [
//   {
//     name: "Advocate Sk. Shehraja",
//     position: [
//       // "M.Sc. (Oxford Unversity, United Kingdom), LLB",
//     ],
//     expertise: [
//     ],
//     bio: "",
//     achievements: [
//     ],
//     image: "/assets/AboutUs/Legal/SkShehraja.jpg",
//   },
  
// ];

const AboutPage = () => {
  return (
    <div className="min-h-screen w-full bg-background text-blue-700 overflow-hidden pt-16">
      
      <AboutCompany />
      <FounderDisplay />
      <AdvisoryBoard
        title="Board of Advisory"
        advisors={adminadvisors}
        id="adminadvisories"
      />
      <AdvisoryBoard
        title="Board of Academic Advisors"
        advisors={boardadvisors}
        id="boardadvisories"
      />
      <AdvisoryBoard
        title="Meet our R&D Associates"
        advisors={associates}
        id="associates"
      />
      {/* <AdvisoryBoard
        title="Board of Legal Advisors"
        advisors={legal}
        id="legal"
      /> */}
      
      <TechTeam />
    </div>
  );
};

export default AboutPage;
