"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Search,
  MoreHorizontal,
  Plus,
  Calendar,
  DollarSign,
  Trash2,
  Edit,
  Eye,
  CheckCircle,
  XCircle,
  User,
  Package,
} from "lucide-react"

// Mock subscription plans
const mockPlans = [
  {
    id: "1",
    name: "Basic Monthly",
    description: "Access to all basic courses",
    price: 499,
    duration: "monthly",
    features: ["Access to 50+ basic courses", "Mobile access", "Certificate of completion", "24/7 support"],
    isActive: true,
    createdAt: "2023-01-15",
  },
  {
    id: "2",
    name: "Premium Monthly",
    description: "Access to all courses including premium content",
    price: 999,
    duration: "monthly",
    features: [
      "Access to all 200+ courses",
      "Mobile and TV access",
      "Certificate of completion",
      "Downloadable resources",
      "1-on-1 mentor sessions",
      "24/7 priority support",
    ],
    isActive: true,
    createdAt: "2023-01-15",
  },
  {
    id: "3",
    name: "Basic Annual",
    description: "Access to all basic courses with annual discount",
    price: 4999,
    duration: "annual",
    features: ["Access to 50+ basic courses", "Mobile access", "Certificate of completion", "24/7 support"],
    isActive: true,
    createdAt: "2023-01-15",
  },
  {
    id: "4",
    name: "Premium Annual",
    description: "Access to all courses including premium content with annual discount",
    price: 9999,
    duration: "annual",
    features: [
      "Access to all 200+ courses",
      "Mobile and TV access",
      "Certificate of completion",
      "Downloadable resources",
      "1-on-1 mentor sessions",
      "24/7 priority support",
    ],
    isActive: true,
    createdAt: "2023-01-15",
  },
  {
    id: "5",
    name: "Enterprise",
    description: "Custom plan for organizations",
    price: 24999,
    duration: "annual",
    features: [
      "Access to all 200+ courses",
      "Custom course creation",
      "Team management dashboard",
      "Progress tracking",
      "API access",
      "Dedicated account manager",
    ],
    isActive: false,
    createdAt: "2023-03-10",
  },
]

// Mock subscriptions
const mockSubscriptions = [
  {
    id: "1",
    userId: "101",
    userName: "John Doe",
    userEmail: "john@example.com",
    planId: "2",
    planName: "Premium Monthly",
    startDate: "2023-04-15",
    endDate: "2023-05-15",
    status: "active",
    autoRenew: true,
    price: 999,
    paymentMethod: "Credit Card",
    lastPaymentDate: "2023-04-15",
  },
  {
    id: "2",
    userId: "102",
    userName: "Jane Smith",
    userEmail: "jane@example.com",
    planId: "4",
    planName: "Premium Annual",
    startDate: "2023-02-10",
    endDate: "2024-02-10",
    status: "active",
    autoRenew: true,
    price: 9999,
    paymentMethod: "PayPal",
    lastPaymentDate: "2023-02-10",
  },
  {
    id: "3",
    userId: "103",
    userName: "Robert Johnson",
    userEmail: "robert@example.com",
    planId: "1",
    planName: "Basic Monthly",
    startDate: "2023-04-05",
    endDate: "2023-05-05",
    status: "expired",
    autoRenew: false,
    price: 499,
    paymentMethod: "Credit Card",
    lastPaymentDate: "2023-04-05",
  },
  {
    id: "4",
    userId: "104",
    userName: "Emily Davis",
    userEmail: "emily@example.com",
    planId: "3",
    planName: "Basic Annual",
    startDate: "2023-01-20",
    endDate: "2024-01-20",
    status: "active",
    autoRenew: true,
    price: 4999,
    paymentMethod: "UPI",
    lastPaymentDate: "2023-01-20",
  },
  {
    id: "5",
    userId: "105",
    userName: "Michael Wilson",
    userEmail: "michael@example.com",
    planId: "5",
    planName: "Enterprise",
    startDate: "2023-03-15",
    endDate: "2024-03-15",
    status: "active",
    autoRenew: true,
    price: 24999,
    paymentMethod: "Bank Transfer",
    lastPaymentDate: "2023-03-15",
  },
]

export default function SubscriptionManagement() {
  const [plans, setPlans] = useState<typeof mockPlans>([])
  const [subscriptions, setSubscriptions] = useState<typeof mockSubscriptions>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("plans")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedPlan, setSelectedPlan] = useState<typeof mockPlans[0] | null>(null)
  const [selectedSubscription, setSelectedSubscription] = useState<typeof mockSubscriptions[0] | null>(null)
  const [isCreatePlanDialogOpen, setIsCreatePlanDialogOpen] = useState(false)
  const [isEditPlanDialogOpen, setIsEditPlanDialogOpen] = useState(false)
  const [isDeletePlanDialogOpen, setIsDeletePlanDialogOpen] = useState(false)
  const [isViewSubscriptionDialogOpen, setIsViewSubscriptionDialogOpen] = useState(false)
  const [isEditSubscriptionDialogOpen, setIsEditSubscriptionDialogOpen] = useState(false)
  const [newPlan, setNewPlan] = useState({
    name: "",
    description: "",
    price: 0,
    duration: "monthly",
    features: [""],
    isActive: true,
  })

  useEffect(() => {
    // Simulate API call to fetch plans and subscriptions
    const fetchData = async () => {
      try {
        setIsLoading(true)
        // In a real app, you would fetch from your API
        // const plansResponse = await fetch('/api/subscription-plans');
        // const subscriptionsResponse = await fetch('/api/subscriptions');

        // Using mock data for demonstration
        setTimeout(() => {
          setPlans(mockPlans)
          setSubscriptions(mockSubscriptions)
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching data:", error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filter subscriptions based on search query and filters
  const filteredSubscriptions = subscriptions.filter((subscription) => {
    const matchesSearch =
      subscription.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subscription.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subscription.planName.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || subscription.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleCreatePlan = () => {
    // Validate form
    if (!newPlan.name || !newPlan.description || newPlan.price <= 0) {
      alert("Please fill in all required fields")
      return
    }

    // In a real app, you would call your API to create the plan
    // const response = await fetch('/api/subscription-plans', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(newPlan)
    // });

    // Simulate creating a new plan
    const createdPlan = {
      id: (plans.length + 1).toString(),
      ...newPlan,
      createdAt: new Date().toISOString().split("T")[0],
    }

    setPlans([...plans, createdPlan])
    setIsCreatePlanDialogOpen(false)
    setNewPlan({
      name: "",
      description: "",
      price: 0,
      duration: "monthly",
      features: [""],
      isActive: true,
    })
  }

  const handleUpdatePlanStatus = (planId: string, isActive: boolean) => {
    // In a real app, you would call your API to update the plan status
    // const response = await fetch(`/api/subscription-plans/${planId}`, {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ isActive })
    // });

    // Update plan status in the state
    setPlans(plans.map((plan) => (plan.id === planId ? { ...plan, isActive } : plan)))
  }

  const handleDeletePlan = (planId: string) => {
    // In a real app, you would call your API to delete the plan
    // const response = await fetch(`/api/subscription-plans/${planId}`, {
    //   method: 'DELETE'
    // });

    // Remove plan from the state
    setPlans(plans.filter((plan) => plan.id !== planId))
    setIsDeletePlanDialogOpen(false)
  }

  const handleUpdateSubscriptionStatus = (subscriptionId: string, status: string) => {
    // In a real app, you would call your API to update the subscription status
    // const response = await fetch(`/api/subscriptions/${subscriptionId}`, {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ status })
    // });

    // Update subscription status in the state
    setSubscriptions(
      subscriptions.map((subscription) =>
        subscription.id === subscriptionId ? { ...subscription, status } : subscription,
      ),
    )

    setIsEditSubscriptionDialogOpen(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="mr-1 h-3 w-3" /> Active
          </span>
        )
      case "expired":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="mr-1 h-3 w-3" /> Expired
          </span>
        )
      case "cancelled":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <XCircle className="mr-1 h-3 w-3" /> Cancelled
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        )
    }
  }

  const addFeatureField = () => {
    setNewPlan({
      ...newPlan,
      features: [...newPlan.features, ""],
    })
  }

  const updateFeature = (index: number, value: string) => {
    const updatedFeatures = [...newPlan.features]
    updatedFeatures[index] = value
    setNewPlan({
      ...newPlan,
      features: updatedFeatures,
    })
  }

  const removeFeature = (index: number) => {
    const updatedFeatures = [...newPlan.features]
    updatedFeatures.splice(index, 1)
    setNewPlan({
      ...newPlan,
      features: updatedFeatures,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Subscription Management</h2>
          <p className="text-muted-foreground">Manage subscription plans and monitor active subscriptions.</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="plans">
            <Package className="h-4 w-4 mr-2" />
            Subscription Plans
          </TabsTrigger>
          <TabsTrigger value="subscriptions">
            <User className="h-4 w-4 mr-2" />
            User Subscriptions
          </TabsTrigger>
        </TabsList>

        {/* Subscription Plans Tab */}
        <TabsContent value="plans" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Available Plans</h3>
            <Button onClick={() => setIsCreatePlanDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Plan
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              <div className="col-span-full text-center py-8">Loading subscription plans...</div>
            ) : plans.length === 0 ? (
              <div className="col-span-full text-center py-8">No subscription plans found. Create your first plan.</div>
            ) : (
              plans.map((plan) => (
                <Card key={plan.id} className={plan.isActive ? "" : "opacity-70"}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{plan.name}</CardTitle>
                        <CardDescription>{plan.description}</CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedPlan(plan)
                              setIsEditPlanDialogOpen(true)
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Plan
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {plan.isActive ? (
                            <DropdownMenuItem onClick={() => handleUpdatePlanStatus(plan.id, false)}>
                              <XCircle className="mr-2 h-4 w-4" />
                              Deactivate Plan
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => handleUpdatePlanStatus(plan.id, true)}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Activate Plan
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => {
                              setSelectedPlan(plan)
                              setIsDeletePlanDialogOpen(true)
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Plan
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-2xl font-bold">₹{plan.price}</div>
                      <div className="text-muted-foreground">
                        {plan.duration === "monthly" ? "per month" : "per year"}
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-sm text-muted-foreground">Created: {plan.createdAt}</div>
                    <div>
                      {plan.isActive ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Inactive
                        </span>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        {/* User Subscriptions Tab */}
        <TabsContent value="subscriptions" className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search subscriptions..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Auto Renew</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">
                        Loading subscriptions...
                      </TableCell>
                    </TableRow>
                  ) : filteredSubscriptions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">
                        No subscriptions found. Try adjusting your filters.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredSubscriptions.map((subscription) => (
                      <TableRow key={subscription.id}>
                        <TableCell>
                          <div className="font-medium">{subscription.userName}</div>
                          <div className="text-sm text-muted-foreground">{subscription.userEmail}</div>
                        </TableCell>
                        <TableCell>{subscription.planName}</TableCell>
                        <TableCell>{subscription.startDate}</TableCell>
                        <TableCell>{subscription.endDate}</TableCell>
                        <TableCell>{getStatusBadge(subscription.status)}</TableCell>
                        <TableCell>
                          {subscription.autoRenew ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                        </TableCell>
                        <TableCell>₹{subscription.price}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedSubscription(subscription)
                                  setIsViewSubscriptionDialogOpen(true)
                                }}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedSubscription(subscription)
                                  setIsEditSubscriptionDialogOpen(true)
                                }}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Status
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {subscription.status === "active" && (
                                <DropdownMenuItem
                                  onClick={() => handleUpdateSubscriptionStatus(subscription.id, "cancelled")}
                                >
                                  <XCircle className="mr-2 h-4 w-4" />
                                  Cancel Subscription
                                </DropdownMenuItem>
                              )}
                              {subscription.status === "expired" && (
                                <DropdownMenuItem
                                  onClick={() => handleUpdateSubscriptionStatus(subscription.id, "active")}
                                >
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Reactivate Subscription
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Plan Dialog */}
      <Dialog open={isCreatePlanDialogOpen} onOpenChange={setIsCreatePlanDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Subscription Plan</DialogTitle>
            <DialogDescription>Create a new subscription plan for your platform.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Plan Name
              </Label>
              <Input
                id="name"
                value={newPlan.name}
                onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={newPlan.description}
                onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price (₹)
              </Label>
              <Input
                id="price"
                type="number"
                value={newPlan.price}
                onChange={(e) => setNewPlan({ ...newPlan, price: Number.parseInt(e.target.value) })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="duration" className="text-right">
                Duration
              </Label>
              <Select value={newPlan.duration} onValueChange={(value) => setNewPlan({ ...newPlan, duration: value })}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="annual">Annual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="features" className="text-right pt-2">
                Features
              </Label>
              <div className="col-span-3 space-y-2">
                {newPlan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      placeholder={`Feature ${index + 1}`}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFeature(index)}
                      disabled={newPlan.features.length <= 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addFeatureField} className="mt-2">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Feature
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="col-span-4 flex items-center space-x-2">
                <Checkbox
                  id="isActive"
                  checked={newPlan.isActive}
                  onCheckedChange={(checked) => setNewPlan({ ...newPlan, isActive: Boolean(checked) })}
                />
                <label
                  htmlFor="isActive"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Make plan active immediately
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreatePlanDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreatePlan}>Create Plan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Plan Dialog */}
      {selectedPlan && (
        <AlertDialog open={isDeletePlanDialogOpen} onOpenChange={setIsDeletePlanDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the subscription plan &quot;{selectedPlan.name}&quot;. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-700"
                onClick={() => handleDeletePlan(selectedPlan.id)}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* View Subscription Dialog */}
      {selectedSubscription && (
        <Dialog open={isViewSubscriptionDialogOpen} onOpenChange={setIsViewSubscriptionDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Subscription Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">User</h3>
                  <p className="font-medium">{selectedSubscription.userName}</p>
                  <p className="text-sm text-muted-foreground">{selectedSubscription.userEmail}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Plan</h3>
                  <p className="font-medium">{selectedSubscription.planName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Start Date</h3>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{selectedSubscription.startDate}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">End Date</h3>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{selectedSubscription.endDate}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                  {getStatusBadge(selectedSubscription.status)}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Auto Renew</h3>
                  <span>{selectedSubscription.autoRenew ? "Yes" : "No"}</span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Price</h3>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>₹{selectedSubscription.price}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Payment Method</h3>
                  <span>{selectedSubscription.paymentMethod}</span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Last Payment</h3>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{selectedSubscription.lastPaymentDate}</span>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewSubscriptionDialogOpen(false)}>
                Close
              </Button>
              <Button
                onClick={() => {
                  setIsViewSubscriptionDialogOpen(false)
                  setIsEditSubscriptionDialogOpen(true)
                }}
              >
                Edit Status
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Subscription Dialog */}
      {selectedSubscription && (
        <Dialog open={isEditSubscriptionDialogOpen} onOpenChange={setIsEditSubscriptionDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Update Subscription Status</DialogTitle>
              <DialogDescription>
                Change the status of {selectedSubscription.userName}&apos;s subscription.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="status">Select Status</Label>
                <Select
                  defaultValue={selectedSubscription.status}
                  onValueChange={(value) => handleUpdateSubscriptionStatus(selectedSubscription.id, value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditSubscriptionDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsEditSubscriptionDialogOpen(false)}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

