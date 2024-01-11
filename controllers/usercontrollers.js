const { name } = require("ejs");
const usermodel = require('../models/userModel')
const formmodel = require('../models/formModels')
const path = require('path')
const fs = require('fs');


const signin = (req, res) => {
    if (req.cookies.auth) {
        return res.redirect('/index');
    }
    return res.render('signin');
}
const signup = (req, res) => {
    if (req.cookies.auth) {
        return res.redirect('/index');
    }
    return res.render('signup');
}
const index = (req, res) => {
    if (!req.cookies.auth) {
        return res.redirect('/');
    }
    return res.render('index');
}
const edit = (req,res )=>{
    return res.render('edit')
}
const blog = async(req,res ) =>{
    try{
        if (!req.cookies.auth) {
            return res.redirect('/');
        }
        let record = await formmodel.find({})
        
        return res.render('blog',{record})
    }catch(err){
        console.log(err);
        return false;
    }
}
const register = async (req, res) => {
    try {
        let name = req.body.name;
        let email = req.body.email;
        let company = req.body.company;
        let password = req.body.password;

        let user = await usermodel.create({
            name: name,
            company: company,
            password: password,
            email: email
        })
        if (user) {
            console.log('user suucessfully register');
            return res.redirect('back');
        }


    } catch (err) {
        console.log(err);
        return false;
    }
}

const sign = async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;

        let user = await usermodel.findOne({ email: email })

        if (!user || user.password != password) {
            console.log("Email and Password not match");
            return res.redirect('/');
        }
        //cookie set in browser
        res.cookie('auth', user);
        return res.redirect('/index');

    } catch (err) {
        console.log(err);
        return false
    }
}

const logout = (req, res) => {
    res.clearCookie('auth');
    return res.redirect('/');
}

const add = async(req,res) =>{
    try{    
        let title = req.body.title;
        let description = req.body.description;

        let user = await formmodel.create({
            title,description,images : req.file.path
        })
     
        return res.redirect('/');

    }catch(err){
        console.log(err);
        return false;
    }
}
const deleterecord = async(req,res)=>{
    try{
        let id = req.query.id
        let record = await formmodel.findById(id)
        fs.unlinkSync(record.images)
       
        let all = await formmodel.findByIdAndDelete(id)
       
        return res.redirect('/blog');

    }catch(err){
        console.log(err);
        return false;
    }
}
const editrecord = async(req,res) => {
    try{
        let record = await formmodel.findById(req.query.id);

        return res.render('edit',{
            record
       })
    }catch(err){
        console.log(err);
         return false
    }
}

const editform = async(req,res) =>{
    let id = req.body.id;
   
    try{
      
        if(req.file){
            let oldrecord = await formmodel.findById(id)
            fs.unlinkSync(oldrecord.images)

            let all = await formmodel.findByIdAndUpdate(id,{
                title : req.body.title,
                description : req.body.description,
                images : req.file.path 
            })
            return res.redirect('/blog');

        }else{
            let all = await formmodel.findById(id)


            let record = await formmodel.findByIdAndUpdate(id, {
                 title : req.body.title,
                description: req.body.description,
                images: req.body.images
            })
            return res.redirect('/blog');
        }
              
    }catch(err){
        console.log(err);
        return false
    }
}


module.exports = {
    signin, signup, register, sign, index, logout,add,blog,deleterecord,editrecord,edit,editform
}