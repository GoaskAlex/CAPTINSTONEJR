import {Route, Routes} from "react-router-dom"
import Index from "./pages/Index.jsx"
import Login from "./pages/Login.jsx"
import Layout from "./pages/Layout.jsx"
import Register from "./pages/Register.jsx"
import './App.css'
import axios from 'axios'
import UserContextProvider from "./components/UserContext.jsx"
import Profile from "./pages/Profile.jsx"
import CreateArticle from "./pages/CreateArticle.jsx"
import ArticleForm from "./pages/ArticleForm.jsx"


axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.withCredentials = true;

function App() {
 

  return (
  <>
  <UserContextProvider>
    <Routes>
      <Route path = "/" element = {<Layout/>}>
      <Route index element = {<Index/>}/>
      <Route path = "/register" element = {<Register/>}/>
      <Route path = "/login" element = {<Login/>}/> 
      <Route path = "/account" element = {<Profile/>}/>
      <Route path = "/account/createArticle" element = {<CreateArticle/>}/>
      <Route path = "/account/createArticle/new" element = {<ArticleForm/>}/>
      <Route path = "/account/createArticle/:id" element = {<ArticleForm/>}/>

     
      </Route>
    </Routes>
 </UserContextProvider>
  </>
  )
}

export default App
