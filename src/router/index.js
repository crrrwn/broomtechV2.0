import { createRouter, createWebHistory } from "vue-router"
import { auth } from "../firebase/config"
import { useAuthStore } from "../stores/auth"

// Lazy loading routes
const Home = () => import("../views/Home.vue")
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
    component: Home,
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
    meta: { requiresAuth: false }, // Changed to false to allow anyone to register
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

  // Admin routes
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

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const requiredRole = to.meta.role

  // Wait for auth initialization if it's still loading
  if (authStore.isLoading) {
    console.log("Auth is still loading, waiting for initialization...")
    await authStore.initAuth()
  }

  console.log("Navigation guard - Current user role:", authStore.userRole)
  console.log("Navigation guard - Required role:", requiredRole)
  console.log("Navigation guard - Requires auth:", requiresAuth)
  console.log("Navigation guard - Current user:", auth.currentUser?.uid)

  if (requiresAuth && !auth.currentUser) {
    console.log("No authenticated user, redirecting to login")
    next("/login")
  } else if (requiresAuth && requiredRole && authStore.userRole !== requiredRole) {
    console.log("User role doesn't match required role")
    // Redirect based on user role
    if (authStore.userRole === "user") {
      console.log("Redirecting to user dashboard")
      next("/user")
    } else if (authStore.userRole === "driver") {
      console.log("Redirecting to driver dashboard")
      next("/driver")
    } else if (authStore.userRole === "admin") {
      console.log("Redirecting to admin dashboard")
      next("/admin")
    } else {
      console.log("No role found, redirecting to login")
      next("/login")
    }
  } else {
    console.log("Navigation allowed to:", to.path)
    next()
  }
})

export default router