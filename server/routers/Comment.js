const express= require('express')
const router=express.Router()

const { Comment }=require('../models')
const {validateToken}=require('../middleware/Authmiddle')


router.get('/:postId',async(req,res)=>{
    const postId=req.params.postId
    const comments = await Comment.findAll({where:{PostId :postId}});
    res.json(comments)

})



router.post('/',validateToken,async(req,res)=>{
    
    
    try {
        const comment = req.body;
        const username=req.user.username
        comment.username=username
        await Comment.create(comment);

        res.json(comment);
} catch (error) {
    console.error(error);
      
    }


})

router.delete("/:commentId",validateToken,async(req,res)=>{
    try {
        const commentId = req.params.commentId;
        const deleted = await Comment.destroy({ where: { id: commentId } });
        if (deleted) {
            return res.json("Deleted successfully");
        } else {
            return res.status(404).json({ message: "Comment not found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
})







module.exports=router

