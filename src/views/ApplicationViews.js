import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { CreatePost } from "../components/CreatePost/CreatePost"
import { Posts } from "../Posts/Posts"
import { Categories } from "../components/Categories/Categories"
import { MyPosts } from "../components/MyPosts/MyPosts"
import { PostDetails } from "../Posts/PostDetails"
import { EditPost } from "../components/EditPost/EditPost"

export const ApplicationViews = ({ token, setToken }) => {
  return <>
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />}  />
      <Route path="/register" element={<Register setToken={setToken} />}  />
      <Route element={<Authorized token={token} />}>
        {/* Add Routes here */}
        <Route path="/Create-Post" element={<CreatePost setToken={setToken}/>} />
        <Route path="/My-Posts" element={<MyPosts setToken={setToken} />} />
        <Route path="posts">
          <Route index element={<Posts />} />
          <Route path=":postId" element={<PostDetails />} />
          <Route path="edit/:postId" element={<EditPost setToken={setToken} />} /> 
        </Route>
        <Route path="category" element={<Categories/>} />
      </Route>
    </Routes>
  </>
}
