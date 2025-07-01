import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from '@/components/organisms/Layout'
import SearchPage from '@/components/pages/SearchPage'
import WidgetBuilderPage from '@/components/pages/WidgetBuilderPage'
import DashboardPage from '@/components/pages/DashboardPage'
import SettingsPage from '@/components/pages/SettingsPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Layout>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/widget/:businessId" element={<WidgetBuilderPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Layout>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          className="z-50"
        />
      </div>
    </Router>
  )
}

export default App