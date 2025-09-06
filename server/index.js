const port = process.env.PORT || 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { type } = require("os");
const { error } = require("console");

app.use(express.json());
app.use(cors());

//database connection with mongoDB
mongoose.connect('mongodb+srv://aditidevelopment:22918120@cluster0.keab2kv.mongodb.net/Drapify')

//api creation

app.get("/", (req, res)=>{
    res.send("Express App is Running");
})


//image storage
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) =>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname )}`)
    } 
})

const upload = multer({storage: storage})

//Creating upload endpoint for images

app.use('/images', express.static('./upload/images'))

app.post("/upload", upload.single('product'), (req, res)=>{
    res.json({
        success: 1,
        image_url: `https://drapify-backend.onrender.com/images/${req.file.filename}`
    })
})

//Schema for creating products

const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {        
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
})

app.post('/addproduct', async (req, res)=>{
    let products = await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    }
    else{
        id = 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success: true,
        name: req.body.name,
    });
})

//Api for deleting products
app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({
        id: req.body.id,
    })
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name,
    })
})

//Api for getting all product
app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    res.send(products);
})

///endpoint for new collections
app.get('/newcollections', async (req, res)=>{
    let products = await Product.find({});
    let newcollections = products.slice(1).slice(-8);
    res.send(newcollections);
})



//endpoint for popular in women
app.get('/popularinwomen', async (req, res)=>{
    let products = await Product.find({category:"women"})
    let popularinwomen = products.slice(1).slice(-4);
    res.send(popularinwomen);
})

//creating middleware that fetches user
const fetchUser = async (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({errors: "Please authenticate using valid token"})
    }
    else{
        try{
            const data = jwt.verify(token, '2cba9aaa16dbd9e73566aae478b745e4');
            req.user = data.user;
            next();
        }catch(err){
            res.status(401).send({errors:"Please authenticate using a valid token"})
        }
    }
}

//endpoint for adding to cart
app.post('/addtocart', fetchUser, async (req, res)=>{
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added");
})

//endpoint for removing from cart
app.post('/removefromcart', fetchUser, async (req, res)=>{
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Removed");
})

//endpoint for retrieving cart data of users
app.post('/getcart', fetchUser, async (req, res)=>{
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})

app.listen(port, (err)=>{
    if(!err) {
        console.log("Server running on port " + port);
    }
    else {
        console.log("Error: " + err);
    }
})

const Users = mongoose.model('Users',{
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
    },
    address: {
        type: String,
    },
    cartData: {
        type: Object
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

app.post('/signup', async (req, res)=>{
    let check = await Users.findOne({email: req.body.email});
    if(check){
        return res.status(400).json({success: false, errors:"User with this email already exists"})
    }
    let cart = {};
    for(let i = 0; i<300; i++){
        cart[i] = 0;
    }
    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })

    await user.save();

    const data = {
        user: {
            id: user.id
        }
    }

    const token = jwt.sign(data, '2cba9aaa16dbd9e73566aae478b745e4');
    res.json({success: true})
})

//endpoint for user login
app.post('/login', async (req, res)=>{
    let user = await Users.findOne({email: req.body.email});
    if(user){
        const passCheck = req.body.password === user.password;
        if(passCheck){
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, '2cba9aaa16dbd9e73566aae478b745e4');
            res.json({success:true, token});
        }
        else{
            res.json({success:false, errors:"Wrong Password"});
        }
    } 
    else{
        res.json({success:false, errors: "Wrong email id"});
    }
})
