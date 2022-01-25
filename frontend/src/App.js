import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Home } from "./components/pages/Home";

import { Layout } from "./components/pages/Layout";
import { EmailVerification } from "./components/registration/auth/EmailVerification";
import { Login } from "./components/registration/auth/Login";
import { PasswordReset } from "./components/registration/auth/PasswordReset";
import { PasswordResetConfirm } from "./components/registration/auth/PasswordResetConfirm";
import { Register } from "./components/registration/auth/Register";
import { ResendEmailVerification } from "./components/registration/auth/ResendEmailVerification";

import { Payments } from './components/pages/Payment'
import { JobDetail } from "./components/jobs/JobDetail";
import { Success } from "./components/pages/Success";


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/jobs/:id/payment" element={<Payments />} />
          <Route path="/success/payment" element={<Success />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/accounts/confirm-email/:key" element={<EmailVerification />} />
          <Route path="/accounts/resend-email-verification" element={<ResendEmailVerification />} />
          <Route path="/accounts/password/reset" element={<PasswordReset />} />
          <Route path="/accounts/password/reset/key/:key" element={<PasswordResetConfirm />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
