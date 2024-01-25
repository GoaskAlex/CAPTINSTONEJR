import express from "express"
import cors from 'cors'
import mongoose from "mongoose"
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookieParser from "cookie-parser"
import imageDownloader from "image-downloader"
import { UserModel } from "./models/Users.js"
import { ArticleModel } from "./models/Articles.js"
dotenv.config()
const app = express()
const bcryptSalt = bcrypt.genSaltSync(10)
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    credentials:true,
    origin:'http://localhost:5173'
}));

//-------Temp Delete Later
import{dirname} from'path'
import { fileURLToPath } from "url"
const __dirname =dirname(fileURLToPath(import.meta.url))


//Temp
app.use('/uploads', express.static(__dirname+'/uploads'))
app.get('/test',(req,res)=>{
    res.json('test')
})




//---------------------------------------------------------------------
app.post('/register', async (req,res)=>{
  const {name,userName,password} = req.body;

  try{
      const userDoc = await UserModel.create({
            name,
            userName,
            password:bcrypt.hashSync(password, bcryptSalt),
        })
        res.json({userDoc})

    }catch{
    res.status(422).json(e)
  }
})

app.post('/login', async(req,res)=>{
    const{userName,password}= req.body;
    const userDoc = await UserModel.findOne({userName})
    if(userDoc){
        const passCheck = bcrypt.compareSync(password, userDoc.password)
        if(passCheck){
            jwt.sign({userName:userDoc.userName, id:userDoc._id}, process.env.jwtSecret, {}, (err,token)=>{
            if(err) throw err;
            res.cookie('token', token).json(userDoc)
            })
        }else{
            res.status(422).json("Big OOOF")
        }
        
    }else{
        res.json('not found');
    }
})

app.get('/profile', (req,res)=>{
    const {token} = req.cookies;
    if (token){
        jwt.verify(token, process.env.jwtSecret, {}, async(err, userData) =>{
             if (err) throw err;
           const {userName,_id} = await UserModel.findById(userData.id)
           res.json({userName,_id})
})
    }else{
        res.json(null)
    }
   
})

app.post('/logout',(req,res)=>{
    res.cookie('token','').json(true)
})

//----------------------------------------------------------------------


app.post('/upload-by-link', async(req,res)=>{
    const{link} = req.body
    const newName ='photo'+ Date.now() + '.jpg';
   await imageDownloader.image({
        url:link,
        dest: __dirname+'/uploads/' + newName,
    })
    res.json(newName)
})

app.post('/createArticle', (req,res)=>{
    const {token} = req.cookies;
    const {title,
        subtext,
        image,
        story,
    } =req.body
    jwt.verify(token, process.env.jwtSecret, {}, async(err, userData) =>{
        if (err) throw err;
          const articleDoc = await ArticleModel.create({
              title,
              subtext,
              image,
              story,
              author:userData.id,
            })
        res.json(articleDoc)
    })
})



app.get('/author-createArticle',(req,res)=>{
    const {token} = req.cookies;
    jwt.verify(token, process.env.jwtSecret, {}, async(err, userData) =>{
    const {id} = userData;
    res.json(await ArticleModel.find({author:id}))
    })
})

app.get('/createArticle/:id', async(req,res)=>{
    const {id} =req.params;
    res.json(await ArticleModel.findById(id))
})


app.get('/createArticle', async(req,res)=>{
    res.json(await ArticleModel.find())
})

mongoose.connect(process.env.MONGO_URL)
    
    .then(()=>{
        console.log('Mongoose Connected')
    }).catch((error)=>{
        console.log(error);
    })
 
    app.listen(3001,()=>{
        console.log("Tetris Server");
    })