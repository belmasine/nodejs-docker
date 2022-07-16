const User = require('../models/userModel');

const bcrypt = require('bcryptjs');

const signup = async(req, res, next) => {
    try {
        const {username, password} = req.body;
        const hashPwd = await bcrypt.hash(password, 12);
        const user = await User.create({
            username,
            password: hashPwd
        });
        req.session.user = user

        res.status(201).json({
            status: 'success',
            data: {
                user: user
            }
        })
        
    } catch (error) {
        res.status(400).json({
            status: "fail 1"
        })
    }
}

const login = async(req, res, next) => {

    try {
        const {username, password} = req.body;
        const user  = await User.findOne({username});
        if(!user) {
            return res.status(404).json({
                msg: 'userr not found'
            })
        };

        const isCorrect = await bcrypt.compare(password, user.password);

        if (isCorrect) {
            req.session.user = user
            res.status(200).json({
                status: 'success',
            })
        } else {
            res.status(400).json({
                msg: 'username or password incorrect'
            })
        }
        

        
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            status: "fail 2"
        })
    }

}

const list = async(req, res, next) => {
    try {
        const users = await User.find();
      
        res.status(200).json({
            status: 'success',
            results: users.length,
            data: {
                users
            }
        })
        
    } catch (error) {
        res.status(400).json({
            status: 'Fail request 1'
        })
    }
   
}

const deleteUser = async (req,res) => {
    const { id: postId } = req.params;
    const user = await User.findOneAndDelete({ _id: postId }).exec();
    if (!user) {
        return  res.status(404).json({msg: `Id  ${postId} not found`});
    }
    res.status(200).json(user);
  }


module.exports = {
    signup,
    login,
    list,
    deleteUser
}