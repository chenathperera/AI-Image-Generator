import userModel from "../models/userModel.js";
import historyModel from "../models/historyModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// REGISTER
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check existing user
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing details" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword
    });

    const user = await newUser.save();

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET
    );

    res.json({
      success: true,
      token,
      user: { name: user.name }
    });

  } catch (error) {
    console.log("Error in registerUser:", error);
    res.json({ success: false, message: error.message });
  }
};

// LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET
    );

    res.json({
      success: true,
      token,
      user: { name: user.name }
    });

  } catch (error) {
    console.log("Error in loginUser:", error);
    res.json({ success: false, message: error.message });
  }
};

// usrrcredit
const userCredit = async (req, res) => {

  try {
    const { userId } = req.body;

    const user = await userModel.findById(userId);
    res.json({
      success: true,
      credits: user.creditBalance,
      user
    });


  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};


// rout admin login (To be implemented)
const adminLogin = async (req, res) => {
    // Implementation for admin login goes here

    try {

        const {email,password} = req.body;

        if(email=== process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){

                    const token = jwt.sign(email+password,process.env.JWT_SECRET);
                    res.json({ success: true, token });

        }else{

                res.json({ success: false, message: "Invalid Credintials" })
        
        }
  
    } catch (error) {

        console.log(error);
        res.json({ success: false, message:error.message })
        
    }

    
}

// Save to history
 const addToUserHistory = async (req, res) => {
    try {
        // Use req.body.userId which was set by your userAuth middleware
        const { userId, image, name, prompt } = req.body;

        if (!image) {
            return res.json({ success: false, message: "Image data is missing" });
        }

        const historyData = { 
            userId, // This comes from the token decode
            image, 
            name, 
            prompt, 
            date: Date.now() 
        };

        const newHistory = new historyModel(historyData);
        await newHistory.save();

        res.json({ success: true, message: "Added to History" });
    } catch (error) {
        console.log("History Save Error:", error);
        res.json({ success: false, message: error.message });
    }
}

// Get user history
export const getUserHistory = async (req, res) => {
    try {
        // userAuth middleware usually adds 'userId' to the req object
        const userId = req.body.userId; 
        
        const history = await historyModel.find({ userId }).sort({ _id: -1 });
        res.json({ success: true, history });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// Remove item from history
export const deleteUserHistory = async (req, res) => {
    try {
        const { historyId } = req.body; // The _id of the history item
        const userId = req.body.userId; // Set by userAuth middleware

        // Delete the item only if it belongs to the logged-in user
        const deletedItem = await historyModel.findOneAndDelete({ _id: historyId, userId });

        if (deletedItem) {
            res.json({ success: true, message: "Deleted from History" });
        } else {
            res.json({ success: false, message: "Item not found or unauthorized" });
        }
    } catch (error) {
        console.log("Delete History Error:", error);
        res.json({ success: false, message: error.message });
    }
}

export { registerUser, loginUser, userCredit, adminLogin ,addToUserHistory};
