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
import { Comment } from "../components/Comments/Comment"
import { PostComments } from "../components/Comments/PostComments"
import { EditComment } from "../components/Comments/EditComment"
import { Tags } from "../components/Tags/Tags"
import { EditTag } from "../components/Tags/EditTag"

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
          <Route path="comment/:postId" element={<Comment />} />
          <Route path="edit/:postId" element={<EditPost setToken={setToken} />} /> 
        </Route>
        <Route path="Comments/:postId" element={<PostComments token={token} />} />
        <Route path="Comments/edit/:commentId" element={<EditComment />} />
        <Route path="category" element={<Categories/>} />
        <Route path="tags">
          <Route index element={<Tags />} />
          <Route path="edit/:tagId" element={<EditTag />} />
        </Route>
      </Route>
    </Routes>
  </>
}
