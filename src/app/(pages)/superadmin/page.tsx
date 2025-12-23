// "use client"

// import { useState } from "react"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Shield, Users, BookOpen, Video, Settings, LayoutDashboard } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import UserManagement from "@/components/SuperAdmin/UserManagement"
// import CourseManagement from "@/components/SuperAdmin/CourseManagement"
// import MediaLibrary from "@/components/SuperAdmin/MediaLibrary"
// import AdminControl from "@/components/SuperAdmin/AdminControl"
// import SubscriptionManagement from "@/components/SuperAdmin/SubscriptionManagement"
// import DashboardOverview from "@/components/SuperAdmin/DashboardOverview"

// const SuperAdminHeader = () => (
//   <div className="w-full bg-primary text-primary-foreground">
//     <div className="container mx-auto p-4 flex justify-between items-center">
//       <div className="flex items-center gap-2">
//         <Shield className="h-6 w-6" />
//         <h1 className="text-xl font-bold">SuperAdmin Dashboard</h1>
//       </div>
//       <div className="flex items-center gap-4">
//         <div className="flex items-center gap-2">
//           <div className="h-8 w-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
//             <Shield className="h-4 w-4" />
//           </div>
//           <span className="font-medium">SuperAdmin</span>
//         </div>
//       </div>
//     </div>
//   </div>
// )

// export default function SuperAdminPage() {
//   const [activeTab, setActiveTab] = useState("dashboard")

//   return (
//     <div className="min-h-screen bg-background flex flex-col">
//       <SuperAdminHeader />

//       <div className="flex flex-1">
//         {/* Sidebar */}
//         <div className="w-64 border-r bg-card hidden md:block p-4">
//           <Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical" className="h-full">
//             <TabsList className="flex flex-col h-auto w-full bg-transparent space-y-1">
//               {/* <TabsTrigger value="dashboard" className="w-full justify-start px-3 py-2">
//                 <LayoutDashboard className="h-4 w-4 mr-2" />
//                 Dashboard
//               </TabsTrigger> */}
//               <TabsTrigger value="users" className="w-full justify-start px-3 py-2">
//                 <Users className="h-4 w-4 mr-2" />
//                 User Management
//               </TabsTrigger>
//               <TabsTrigger value="courses" className="w-full justify-start px-3 py-2">
//                 <BookOpen className="h-4 w-4 mr-2" />
//                 Course Management
//               </TabsTrigger>
//               {/* <TabsTrigger value="subscriptions" className="w-full justify-start px-3 py-2">
//                 <Shield className="h-4 w-4 mr-2" />
//                 Subscriptions
//               </TabsTrigger>
//               <TabsTrigger value="media" className="w-full justify-start px-3 py-2">
//                 <Video className="h-4 w-4 mr-2" />
//                 Media Library
//               </TabsTrigger> */}
//               <TabsTrigger value="admin" className="w-full justify-start px-3 py-2">
//                 <Settings className="h-4 w-4 mr-2" />
//                 Admin Control
//               </TabsTrigger>
//             </TabsList>
//           </Tabs>
//         </div>

//         {/* Mobile Tabs */}
//         <div className="md:hidden w-full p-4">
//           <Tabs value={activeTab} onValueChange={setActiveTab}>
//             <TabsList className="grid grid-cols-3 gap-2">
//               {/* <TabsTrigger value="dashboard">
//                 <LayoutDashboard className="h-4 w-4 mr-2" />
//                 Dashboard
//               </TabsTrigger> */}
//               <TabsTrigger value="users">
//                 <Users className="h-4 w-4 mr-2" />
//                 Users
//               </TabsTrigger>
//               <TabsTrigger value="courses">
//                 <BookOpen className="h-4 w-4 mr-2" />
//                 Courses
//               </TabsTrigger>
//               {/* <TabsTrigger value="subscriptions">
//                 <Shield className="h-4 w-4 mr-2" />
//                 Subs
//               </TabsTrigger> */}
//               {/* <TabsTrigger value="media">
//                 <Video className="h-4 w-4 mr-2" />
//                 Media
//               </TabsTrigger> */}
//               <TabsTrigger value="admin">
//                 <Settings className="h-4 w-4 mr-2" />
//                 Admin
//               </TabsTrigger>
//             </TabsList>
//           </Tabs>
//         </div>

//         {/* Main Content */}
//         <div className="flex-1 p-4 md:p-6 overflow-auto">
//           <Tabs value={activeTab} className="w-full">
//             {/* <TabsContent value="dashboard" className="mt-0 md:mt-0">
//               <DashboardOverview />
//             </TabsContent> */}

//             <TabsContent value="users" className="mt-0 md:mt-0">
//               <UserManagement />
//             </TabsContent>

//             <TabsContent value="courses" className="mt-0 md:mt-0">
//               <CourseManagement />
//             </TabsContent>

//             {/* <TabsContent value="subscriptions" className="mt-0 md:mt-0">
//               <SubscriptionManagement />
//             </TabsContent>

//             <TabsContent value="media" className="mt-0 md:mt-0">
//               <MediaLibrary />
//             </TabsContent> */}

//             <TabsContent value="admin" className="mt-0 md:mt-0">
//               <AdminControl />
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>
//     </div>
//   )
// }
"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, BookOpen, Settings, Shield } from "lucide-react"
import UserManagement from "@/components/SuperAdmin/UserManagement"
import CourseManagement from "@/components/SuperAdmin/CourseManagement"
import AdminControl from "@/components/SuperAdmin/AdminControl"

const SuperAdminHeader = () => (
  <div className="w-full bg-primary text-primary-foreground shadow-md">
    <div className="container mx-auto p-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Shield className="h-7 w-7 text-white" />
        <h1 className="text-2xl font-bold tracking-tight">SuperAdmin</h1>
      </div>
    </div>
  </div>
)

export default function SuperAdminPage() {
  const [activeTab, setActiveTab] = useState("users")

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SuperAdminHeader />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="users" className="p-4">
            <UserManagement />
          </TabsContent>

          <TabsContent value="courses" className="p-4">
            <CourseManagement />
          </TabsContent>

          <TabsContent value="admin" className="p-4">
            <AdminControl />
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-50">
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 h-16 rounded-none">
            <TabsTrigger 
              value="users" 
              className="flex flex-col gap-1 h-full justify-center items-center"
            >
              <Users className={`h-5 w-5 ${activeTab === 'users' ? 'text-primary' : 'text-muted-foreground'}`} />
              <span className={`text-xs ${activeTab === 'users' ? 'text-primary' : 'text-muted-foreground'}`}>
                Users
              </span>
            </TabsTrigger>

            <TabsTrigger 
              value="courses" 
              className="flex flex-col gap-1 h-full justify-center items-center"
            >
              <BookOpen className={`h-5 w-5 ${activeTab === 'courses' ? 'text-primary' : 'text-muted-foreground'}`} />
              <span className={`text-xs ${activeTab === 'courses' ? 'text-primary' : 'text-muted-foreground'}`}>
                Courses
              </span>
            </TabsTrigger>

            <TabsTrigger 
              value="admin" 
              className="flex flex-col gap-1 h-full justify-center items-center"
            >
              <Settings className={`h-5 w-5 ${activeTab === 'admin' ? 'text-primary' : 'text-muted-foreground'}`} />
              <span className={`text-xs ${activeTab === 'admin' ? 'text-primary' : 'text-muted-foreground'}`}>
                Admin
              </span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  )
}