var admin= require('../model/adminmodel');
var storage = require('node-persist');
var cat=require('../model/categorymodel');
var puzzle = require('../model/puzzlemodel');
storage.init();
exports.addadmin = async (req,res)=>{
    var data = await admin.create(req.body);
    res.status(200).json({
        message:'done',
        data
    });
}
exports.adminlogin= async (req,res)=>{
    var ad_status= await storage.getItem('admin_status');
    var email=req.body.email;
    var password=req.body.password;
    console.log("email",email);
    if(ad_status==undefined){
        var data= await admin.find({email:email,password:password});
        if(data.length>0){
            storage.setItem('admin_status');
            res.status(200).json({
                msg:"login done",
            })
        } 
        else{
            res.status(200).json({
                msg:"check email and password",
            })
        }
    }else{
        res.status(200).json({
            msg:"already login",
        })
    }
}

exports.adminlogout = async (req,res)=>{
    storage.clear('admin_status');
    res.status(200).json({
        msg:"logout"
    })
}
exports.addcat= async(req,res)=>{
    req.body.image=req.file.originalname;
    var data= await cat.create(req.body);
    res.status(200).json({
        data,
    })
}
exports.viewcat = async (req,res)=>{
    var data = await cat.find();
    res.status(200).json({
        data
    })
}
exports.upcat = async (req,res) =>{
    var id= req.param.id;
    var data= await cat.findByIdAndUpdate(id,req.body);
    res.status(200).json({
        data
    })
}
exports.delcat = async (req,res)=>{
    var id= req.param.id;
    var data = await cat.findByIdAndDelete(id,req.body);
    res.status(200).json({
        data
    })
}
exports.addpuzzle= async (req,res)=>{
    var ans=req.body.answer;
    var array=[];
    var a=['','','','','','','','','','','','','','','',''];
    var k=0;
    for(var i=0;i<16-ans.length;i++){
        var r=Math.floor(Math.random()*(122-97)+97);
        array[i]=String.fromCharCode(r);
    }
    while(k!==array.length)
    {
        var r=Math.floor(Math.random()*(16 - 0) + 0);
        if(a[r]==''){
            a[r]=array[k];
            k++;
        }
    }
    k=0;
    while(k!==ans.length)
    {
        var r=Math.floor(Math.random()*(16 - 0) + 0);
        if(a[r]==''){
            a[r]=ans[k];
            k++;
        }
    }
    req.body.question=a.toString();
    req.body.puzzle_img=req.file.originalname;
    var data = await  puzzle.create(req.body)
    res.status(200).json({
        data
    })
}
exports.viewpuzzle=async (req,res)=>{
    var data= await puzzle.find().populate('cat_id');
    res.status(200).json({
        data
    })
}
exports.uppuzzle=async (req,res)=>{
    var id = req.param.id;
    var data = await puzzle.findByIdAndUpdate(id,req.body);
    res.status(200).json({
        data
    })
}
