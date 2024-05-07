import Post from "../model/PostModel.js";

async function getAllBlogPosts(req, res) {
    try {
        const allPosts = await Post.find().sort({ createdAt: -1 }).populate('postedBy', 'username');
        
        if (!allPosts || allPosts.length === 0) {
            return res.status(400).json({ error: "No posts found" });
        }
        const postsWithUsername = allPosts.map(post => {
            return {
                ...post.toObject(),
                username: post.postedBy.username
            };
        });
        res.status(200).json(postsWithUsername);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function addBlogPost(req,res){
    try{
           const {postedBy,BlogType, title, Blogimg, BlogDesc}=req.body;
          if(!BlogType || !title || !Blogimg || !BlogDesc)
          return res.status(400).json({error:"All the fields are required"});
          const newPost=new Post({
            postedBy,
            BlogType,
            title,
            Blogimg,
            BlogDesc
          })
          await newPost.save();
          res.status(200).json(newPost);
    }catch(err){
         res.status(500).json({error:err.message});

    }
}
async function fetchBlog(req, res) {
    try {
           console.log("vfvfbfv")
        const latestPosts = await Post.find()
                                      .sort({ createdAt: -1 })
                                      .limit(9);
        if (latestPosts.length === 0) {
            return res.status(404).json({ error: "No posts found" });
        }
        res.status(200).json(latestPosts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


async function updateBlogPost(req,res){
    try {
        const { postId } = req.params;
        
        const { BlogType, title, Blogimg, BlogDesc } = req.body;
        if (!BlogType || !title || !Blogimg || !BlogDesc)
            return res.status(400).json({ error: "All the fields are required" });
        const getpost = await Post.findById(postId);
        if (!getpost) {
            return res.status(404).json({ error: 'Post not found in database' });
        }
        
        if (BlogType) getpost.BlogType = BlogType;
        if (title) getpost.title = title;
        if (Blogimg) getpost.Blogimg = Blogimg;
        if (BlogDesc) getpost.BlogDesc = BlogDesc;
        await getpost.save();
        console.log(getpost)
        return res.status(200).json(getpost);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
}

async function deleteBlogPost(req, res) {
    try {
        const { postId } = req.params;
    
        // Delete the post with the given postId
        const deletedPost = await Post.findByIdAndDelete(postId);
        
       
        if (!deletedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }
        const allPosts = await Post.find().sort({ createdAt: -1 }).populate('postedBy', 'username');
        if (!allPosts || allPosts.length === 0) {
            return res.status(400).json({ error: "No posts found" });
        }
        const postsWithUsername = allPosts.map(post => {
            return {
                ...post.toObject(),
                username: post.postedBy.username
            };
        });
             console.log(postsWithUsername)
        return res.status(200).json(postsWithUsername);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}
async function getIdPost(req,res)
{
    const {postId}=req.params;
    try{
           
            const post=await Post.findById(postId);
            console.log(post);
            if(!post){
                return res.status(400).json({ error: 'post is not find' });
            }
              res.status(200).json(post);

    }catch(err){
      return res.status(500).json({ error: err.message });
    }
}

export {addBlogPost, fetchBlog, updateBlogPost, deleteBlogPost, getAllBlogPosts, getIdPost}