import { createRouter, createWebHistory } from "vue-router"
import { auth } from "../firebase/config"
import { useAuthStore } from "../stores/auth"

// Import Home component directly to ensure it loads immediately
import Home from "../views/Home.vue"

// Lazy loading for other views
const Login = () => import("../views/auth/Login.vue")
const Register = () => import("../views/auth/Register.vue")
const VerifyEmail = () => import("../views/auth/VerifyEmail.vue")
const ForgotPassword = () => import("../views/auth/ForgotPassword.vue")
const AdminLogin = () => import("../views/auth/AdminLogin.vue")

// User routes
const UserDashboard = () => import("../views/user/Dashboard.vue")
const UserProfile = () => import("../views/user/Profile.vue")
const BookService = () => import("../views/user/BookService.vue")
const OrderTracking = () => import("../views/user/OrderTracking.vue")
const OrderHistory = () => import("../views/user/OrderHistory.vue")

// Driver routes
const DriverDashboard = () => import("../views/driver/Dashboard.vue")
const DriverProfile = () => import("../views/driver/Profile.vue")
const DriverRegistration = () => import("../views/driver/Registration.vue")
const DriverTasks = () => import("../views/driver/Tasks.vue")
const TaskDetail = () => import("../views/driver/TaskDetail.vue")

// Admin routes
const AdminDashboard = () => import("../views/admin/Dashboard.vue")
const AdminUsers = () => import("../views/admin/Users.vue")
const AdminDrivers = () => import("../views/admin/Drivers.vue")
const AdminBookings = () => import("../views/admin/Bookings.vue")
const AdminPayments = () => import("../views/admin/Payments.vue")
const AdminReports = () => import("../views/admin/Reports.vue")
const AdminSettings = () => import("../views/admin/Settings.vue")
const DriverManagement = () => import("../views/admin/DriverManagement.vue")

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home, // Using the directly imported component
    meta: { requiresAuth: false },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { requiresAuth: false },
  },
  {
    path: "/verify-email",
    name: "VerifyEmail",
    component: VerifyEmail,
    meta: { requiresAuth: false },
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: { requiresAuth: false },
  },
  {
    path: "/admin/login",
    name: "AdminLogin",
    component: AdminLogin,
    meta: { requiresAuth: false },
  },
  {
    path: "/admin",
    name: "AdminDashboard",
    component: AdminDashboard,
    meta: { requiresAuth: true, role: "admin" },
  },

  // User routes
  {
    path: "/user",
    name: "UserDashboard",
    component: UserDashboard,
    meta: { requiresAuth: true, role: "user" },
  },
  {
    path: "/user/profile",
    name: "UserProfile",
    component: UserProfile,
    meta: { requiresAuth: true, role: "user" },
  },
  {
    path: "/user/book-service",
    name: "BookService",
    component: BookService,
    meta: { requiresAuth: true, role: "user" },
  },
  {
    path: "/user/order-tracking/:id",
    name: "OrderTracking",
    component: OrderTracking,
    meta: { requiresAuth: true, role: "user" },
  },
  {
    path: "/user/order-history",
    name: "OrderHistory",
    component: OrderHistory,
    meta: { requiresAuth: true, role: "user" },
  },

  // Driver routes
  {
    path: "/driver",
    name: "DriverDashboard",
    component: DriverDashboard,
    meta: { requiresAuth: true, role: "driver" },
  },
  {
    path: "/driver/profile",
    name: "DriverProfile",
    component: DriverProfile,
    meta: { requiresAuth: true, role: "driver" },
  },
  {
    path: "/driver/register",
    name: "DriverRegistration",
    component: DriverRegistration,
    meta: { requiresAuth: false },
  },
  {
    path: "/driver/tasks",
    name: "DriverTasks",
    component: DriverTasks,
    meta: { requiresAuth: true, role: "driver" },
  },
  {
    path: "/driver/tasks/:id",
    name: "TaskDetail",
    component: TaskDetail,
    meta: { requiresAuth: true, role: "driver" },
  },

  // Admin extended routes
  {
    path: "/admin/users",
    name: "AdminUsers",
    component: AdminUsers,
    meta: { requiresAuth: true, role: "admin" },
  },
  {
    path: "/admin/drivers",
    name: "AdminDrivers",
    component: AdminDrivers,
    meta: { requiresAuth: true, role: "admin" },
  },
  {
    path: "/admin/driver-management",
    name: "DriverManagement",
    component: DriverManagement,
    meta: { requiresAuth: true, role: "admin" },
  },
  {
    path: "/admin/bookings",
    name: "AdminBookings",
    component: AdminBookings,
    meta: { requiresAuth: true, role: "admin" },
  },
  {
    path: "/admin/payments",
    name: "AdminPayments",
    component: AdminPayments,
    meta: { requiresAuth: true, role: "admin" },
  },
  {
    path: "/admin/reports",
    name: "AdminReports",
    component: AdminReports,
    meta: { requiresAuth: true, role: "admin" },
  },
  {
    path: "/admin/settings",
    name: "AdminSettings",
    component: AdminSettings,
    meta: { requiresAuth: true, role: "admin" },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Simplify the router guard to reduce initial loading delay
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  
  // Skip auth check for non-protected routes to improve initial load time
  if (!requiresAuth) {
    return next()
  }
  
  // Only initialize auth if needed
  if (authStore.isLoading) {
    await authStore.initAuth()
  }

  const currentUser = auth.currentUser
  const userRole = authStore.userRole
  const requiredRole = to.meta.role

  if (!currentUser) {
    return next("/login")
  }

  if (requiredRole && userRole !== requiredRole) {
    if (userRole === "user") return next("/user")
    if (userRole === "driver") return next("/driver")
    if (userRole === "admin") return next("/admin")
    return next("/login")
  }

  return next()
})

export default router