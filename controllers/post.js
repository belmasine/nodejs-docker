const Post = require('../models/postModel');

const getAllPosts = async(req, res, next) => {
    try {
      
        const posts = await Post.find();
        console.log('posts', posts)
        res.status(200).json({
            status: 'success',
            results: posts.length,
            data: {
                posts
            }
        })
        
    } catch (error) {
        res.status(400).json({
            status: 'Fail request'
        })
    }
   
}

const getOnePOst = async(req,res, next) => {
    try {
        const _id = req.params.id;
        const post = await Post.findById(_id);
        res.status(200).json({
            status: 'success',
            data: {
                post
            }
        })
        
    } catch (error) {
        res.status(400).json({
            status: 'Fail request'
        })
    }
}

const createPost = async (req,res) => {
    const post = await Post.create(req.body);
    res.status(201).json({
        status: "success",
        data: {
            post
        }
    });
}

const updatePost = async (req,res) => {
    const { id: postId } = req.params;
    const post = await Post.findOneAndUpdate({ _id: postId }, req.body);
    if (!post) {
      return  res.status(404).json({msg: `Id  ${postId} not found`});
    }
    res.status(200).json(post);
  };
  
  const deletePost = async (req,res) => {
    const { id: postId } = req.params;
    const post = await Post.findOneAndDelete({ _id: postId }).exec();
    if (!post) {
        return  res.status(404).json({msg: `Id  ${postId} not found`});
    }
    res.status(200).json(post);
  }

module.exports = {
    getAllPosts,
    getOnePOst,
    createPost,
    updatePost,
    deletePost
}