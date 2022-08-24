import UserModel from "../Models/userModel.js";
import bcrypt from 'bcrypt'

//get a User
export const getUser = async(req, res)=>{
  const id = req.params.id;
  
  try{
    const user = await UserModel.findById(id);
    if(user){
      const {password, ...otherDetails}=user._doc
      res.status(200).json(otherDetails)
    }

    else{
      res.status(404).json("No such user exist")
    }
  }catch(error){
    res.status(500).json({message:error.message})
  }
}


//update user

export const  updateUser = async(req, res)=>{
  //id of user to be updated
  const id = req.params.id
  //id of user who is performing the action of updating
  const {currentUserId, currentUserAdminStatus, password}= req.body
  //if i want to update my self details || if admin want to update the user
  if(id===currentUserId || currentUserAdminStatus){
    try{
      if(password){
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(password, salt)
      }
      //{new:true } is to get the updated status of user otherwise you will get the previous state of user
      const user = await UserModel.findByIdAndUpdate(id, req.body, {new :true})

      res.status(200).json(user)

    }
    catch(error){
      res.status(500).json({message:error.message})
    }
  }
  else{
    res.status(403).json("access denies! you can only update your profile")
  }
}

//delete user
export const deleteUser = async (req, res) => {
  const id = req.params.id;

  const { currentUserId, currentUserAdminStatus } = req.body;

  if (currentUserId === id || currentUserAdminStatus) {
    try {
      await UserModel.findByIdAndDelete(id);
      res.status(200).json("User deleted successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Access Denied! you can only delete your own profile");
  }
};

// Follow a User
export const followUser = async (req, res) => {
  //id is user who should be followed
  const id = req.params.id;
  //currentUserId is who wants to follow
  const { currentUserId } = req.body;
  // if someone want to follow him/herself
  if (currentUserId === id) {
    res.status(403).json("Action forbidden");
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(currentUserId);
      
      //check if the user is already following or not
      if (!followUser.followers.includes(currentUserId)) {
        await followUser.updateOne({ $push: { followers: currentUserId } });
        await followingUser.updateOne({ $push: { following: id } });
        res.status(200).json("User followed!");
      } else {
        res.status(403).json("User is Already followed by you");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

// UnFollow a User
export const UnFollowUser = async (req, res) => {
  const id = req.params.id;

  const { currentUserId } = req.body;

  if (currentUserId === id) {
    res.status(403).json("Action forbidden");
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(currentUserId);

      if (followUser.followers.includes(currentUserId)) {
        await followUser.updateOne({ $pull: { followers: currentUserId } });
        await followingUser.updateOne({ $pull: { following: id } });
        res.status(200).json("User Unfollowed!");
      } else {
        res.status(403).json("User is not followed by you");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};