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

//@route DELETE api/posts/:id
//@desc Delete a posts
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        //check post
        if (!post) {
            return res.status(404).json({
                msg: 'Post not found'
            })
        }

        //Check user
        // if (post.user.toString() !== req.user.id) {
        //     return res.status(401).send({
        //         msg: 'User not authorized'
        //     })
        // }
        await post.remove()

        res.json({
            msg: 'The post has been removed'
        })
    } catch (err) {
        console.error(err.message)
        if (err.kind === 'ObjectId') {
            return res.status(404).json({
                msg: 'Post not found'
            })
        }
        res.status(500).send('Server Error')
    }
})

module.exports = router;