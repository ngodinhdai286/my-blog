import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import PostManage from "./components/module/post/PostManage";
import PostDetailsPage from "./pages/PostDetailsPage";
import PostAddNew from "./components/module/post/PostAddNew";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import DashboardLayout from "./components/module/dashboard/DashboardLayout";
import { Route, Routes } from "react-router-dom";
// import { AuthProvider } from "./contexts/auth-context";
import CategoryManage from "./components/module/category/CategoryManage";
import CategoryAddNew from "./components/module/category/CategoryAddNew";
import UserManage from "components/module/user/UserManage";
import { AuthProvider } from "contexts/auth-context";
import CategoryUpdate from "components/module/category/CategoryUpdate";
import UserAddNew from "components/module/user/UserAddNew";
import UserProfile from "components/module/user/UserProfile";
import UserUpdate from "components/module/user/UserUpdate";

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
          <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
          <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
          <Route
            path="/:slug"
            element={<PostDetailsPage></PostDetailsPage>}
          ></Route>
          <Route element={<DashboardLayout></DashboardLayout>}>
            <Route
              path="/dashboard"
              element={<DashboardPage></DashboardPage>}
            ></Route>
            <Route
              path="/manage/post"
              element={<PostManage></PostManage>}
            ></Route>
            <Route
              path="/manage/add-post"
              element={<PostAddNew></PostAddNew>}
            ></Route>
            <Route
              path="/manage/category"
              element={<CategoryManage></CategoryManage>}
            ></Route>
            <Route
              path="/manage/add-category"
              element={<CategoryAddNew></CategoryAddNew>}
            ></Route>
            <Route
              path="/manage/update-category"
              element={<CategoryUpdate></CategoryUpdate>}
            ></Route>
            <Route
              path="/manage/user"
              element={<UserManage></UserManage>}
            ></Route>
            <Route
              path="/manage/add-user"
              element={<UserAddNew></UserAddNew>}
            ></Route>
            <Route
              path="/manage/update-user"
              element={<UserUpdate></UserUpdate>}
            ></Route>
            <Route
              path="/profile"
              element={<UserProfile></UserProfile>}
            ></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
