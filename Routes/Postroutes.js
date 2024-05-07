import express from 'express'
import { addBlogPost, deleteBlogPost, fetchBlog, getAllBlogPosts, getIdPost, updateBlogPost } from '../controller/PostController.js';
import protectRoute from '../security/protectRoute.js';


const router=express.Router();

router.post('/', addBlogPost);
router.get('/getdata', fetchBlog);
router.post('/updatepost/:postId',updateBlogPost );
router.delete('/deletepost/:postId',deleteBlogPost );
router.get('/getposts', getAllBlogPosts);
router.get('/getIdPost/:postId', getIdPost);
export default router;