import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/Home/HomePage.js'
import FoodPage from './pages/Food/FoodPage.js'
import CartPage from './pages/Cart/CartPage.js'
import LoginPage from './pages/Login/LoginPage.js'
import RegisterPage from './pages/Register/RegisterPage.js'
import CheckoutPage from './pages/Checkout/CheckoutPage.js'
import AuthRoute from './components/AuthRoute/AuthRoute.js'
import PaymentPage from './pages/Payment/PaymentPage.js'
import OrderTrack from './pages/OrderTrack/OrderTrack.js'
import ProfilePage from './pages/Profile/ProfilePage.js'
import OrdersPage from './pages/Orders/OrdersPage.js'
import DashboardPage from './pages/Dashboard/DashboardPage.js'
import AdminRoute from './components/AdminRoutes/AdminRoute.js'
import FoodsAdminPage from './pages/FoodsAdmin/FoodsAdminPage.js'
import FoodEditPage from './pages/FoodEdit/FoodEditPage.js'
import UserPage from './pages/UserPage/UserPage.js'
import UserEditPage from './pages/UserEdit/UserEditPage.js'

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search/:searchTerm" element={<HomePage />} />
            <Route path="/tag/:tag" element={<HomePage />} />
            <Route path="/food/:id" element={<FoodPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/checkout" element={<AuthRoute><CheckoutPage /></AuthRoute>} />
            <Route path="/payment" element={<AuthRoute><PaymentPage /></AuthRoute>} />
            <Route path="/track/:orderId" element={<AuthRoute><OrderTrack /></AuthRoute>} />
            <Route path="/profile" element={<AuthRoute><ProfilePage /></AuthRoute>} />
            <Route path="/orders/:filter?" element={<AuthRoute><OrdersPage /></AuthRoute>} />
            <Route path="/dashboard" element={<AuthRoute><DashboardPage /></AuthRoute>} />
            <Route path="/admin/foods/:searchTerm?" element={<AdminRoute>< FoodsAdminPage /></AdminRoute>} />
            <Route path="/admin/addFood" element={<AdminRoute>< FoodEditPage /></AdminRoute>} />
            <Route path="/admin/editFood/:foodId" element={<AdminRoute>< FoodEditPage /></AdminRoute>} />
            <Route path="/admin/users/:searchTerm?" element={<AdminRoute>< UserPage /></AdminRoute>} />
            <Route path="/admin/editUser/:userId" element={<AdminRoute>< UserEditPage /></AdminRoute>} />

        </Routes>
    )
}
