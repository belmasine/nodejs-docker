const  express =  require('express');
const router = express.Router();
const {
    signup,
    login,
    list,
    deleteUser
    
} = require('../controllers/auth');

//router.route('/').post(signup);

router.post("/signup", signup)
router.post("/login", login)
router.get("/", list)
router.delete("/:id", deleteUser)


/*router.route('/:id')
    .get(getOnePOst)
    .patch(updatePost)
    .delete(deletePost);*/

module.exports = router;