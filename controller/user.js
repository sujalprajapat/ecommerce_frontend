var user = require('../model/usermodel');
const bcrypt = require('bcrypt');
const storage = require('node-persist');
storage.init();
exports.registeruser= async ( req,res)=>{
    var b= await bcrypt.hash(req.body.password,10);
    req.body.password=b;
    var data= await user.create(req.body);
    res.status(200).json({
        data
    })
}
exports.userlogin = async (req, res) => {
    var user_status = await storage.getItem('name');
    if (user_status == undefined) {
        var data = await user.find({ "email": req.body.email });
        if (data.length == 1) {
            bcrypt.compare(req.body.password, data[0].password, async function (error, result) {
                if (result== true) {
                    await storage.setItem('name',data[0].id);
                    res.status(200).json({
                        msg:"login done",
                });
                } else {
                    res.status(200).json({
                       msg: "check password"
                });
                }
            })
        } else {
            res.status(200).json({
                msg:"check email"
        });
        }
    }
    else {
        res.status(200).json({
            msg:"already login",
    });
    }
}
exports.userlogout = async (req, res) => {
    await storage.clear('name');
    res.status(200).json(
        "logout success",
    );
}