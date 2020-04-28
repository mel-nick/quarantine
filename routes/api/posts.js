const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const {
    check,
    validationResult
} = require('express-validator')

const Post = require('../../dbmodels/Post')
const User = require('../../dbmodels/User')

router.post('/', [auth, [
    check('temp', 'Temp required').not().isEmpty(),
    check('employee_name', 'Employee Name required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    try {
        const user = await User.findById(req.user.id).select('-password')
        const newPost = new Post({
            temp: req.body.temp,
            comment: req.body.comment,
            employee_name: req.body.employee_name,
            city: req.body.city,
            user: req.user.id,
            author:user.name,
        })

        const post = await newPost.save()
        res.json(post)

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

//@route GET api/posts
//@desc Get all posts
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({
            date: -1
        })
        res.json(posts)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;