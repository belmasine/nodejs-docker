const  express =  require('express');
const router = express.Router();

const protect = require('../middleware/auth')
const {
    getAllPosts,
    getOnePOst,
    createPost,
    deletePost,
    updatePost
} = require('../controllers/post');

router.route('/')
    .get(getAllPosts)
    .post(protect, createPost);

router.route('/:id')
    .get(getOnePOst)
    .patch(protect, updatePost)
    .delete(protect, deletePost);

module.exports = router;