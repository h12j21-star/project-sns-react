import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SearchPage from "../pages/SearchPage";
import ProfilePage from "../pages/ProfilePage";
import PostPage from "../pages/PostPage";
import UploadPage from "../pages/UploadPage";
import FollowersPage from "../pages/FollowersPage";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import SplashScreen from "../components/common/SplashScreen";

function Router() {
  // const HomePage = lazy(() => import("../pages/HomePage"));

  return (
    <Routes>
      {/* 로그인 */}
      <Route
        path="/"
        element={
          true ? (
            <LoginPage />
          ) : (
            <Suspense fallback={<SplashScreen />}>
              <HomePage />
            </Suspense>
          )
        }
      />
      <Route path="/login" element={<LoginPage login />} />
      <Route path="/signup" element={<LoginPage signin />} />
      {/* LoginPage settings */}
      {/* 홈 */}
      <Route path="/home" element={<HomePage/>}/>
      
      <Route path="/settings" element={<LoginPage settings />} />
      {/*  */}
      <Route path="/search" element={<SearchPage></SearchPage>} />
      <Route path="/upload" element={<UploadPage></UploadPage>} />
      <Route path="/account" element={<ProfilePage></ProfilePage>}>
        <Route path="followers" element={<div>하이</div>} />
        <Route path="settings" element={<div>하이</div>} />
        <Route path="post" element={<div>하이</div>} />
        <Route path=":id" element={<div>하이</div>} />
      </Route>
      <Route path="*" element={<ErrorPage></ErrorPage>} />
    </Routes>
  );
}

export default Router;
