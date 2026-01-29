import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { STEPS_FALLBACK_TEXT } from "../constants/constants";
import UserFormWizard from "../components/wizard/UserFormWizard";

// Lazy-loaded step components
const PersonalInfo = lazy(
  () => import("../components/wizard/steps/PersonalInfo"),
);
const FamilyInfo = lazy(() => import("../components/wizard/steps/FamilyInfo"));
const SituationInfo = lazy(() => import("../components/wizard/steps/SituationInfo"));

export const AppRoutes: React.FC = () => (
  <Routes>
    {/* Redirect root to first step */}
    <Route path="/" element={<Navigate to="/user-wizard/personal" />} />
    <Route path="/user-wizard" element={<UserFormWizard />}>
    <Route index element={<Navigate to="personal" replace />} />
      <Route
        path="personal"
        element={
          <Suspense fallback={<p>{STEPS_FALLBACK_TEXT.loadingPersonalInfo}</p>}>
            <PersonalInfo />
          </Suspense>
        }
      />
      <Route
        path="family"
        element={
          <Suspense fallback={<p>{STEPS_FALLBACK_TEXT.loadingFamilyInfo}</p>}>
            <FamilyInfo />
          </Suspense>
        }
      />
      <Route
        path="situation"
        element={
          <Suspense
            fallback={<p>{STEPS_FALLBACK_TEXT.loadingSituationInfo}</p>}
          >
            <SituationInfo />
          </Suspense>
        }
      />
    </Route>
  </Routes>
);
