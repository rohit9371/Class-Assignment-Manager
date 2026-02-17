import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'
import transporter from '../config/nodemailer.js'
import Teacher from "../models/Teacher.js";


// ================== STUDENT REGISTRATION ==================
export const register = async (req, res) => {
    const { name, rollno, email, password } = req.body;

    if (!name || !rollno || !email || !password) {
        return res.json({ success: false, message: 'Missing Details' });
    }

    try {
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.json({ success: false, message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userModel({ name, rollno, email, password: hashedPassword });
        await user.save();

        // FIXED: student._id → user._id
        const token = jwt.sign(
            { id: user._id, role: "student" },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        // Send welcome email
        await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome to GradeFlow',
            text: `Your account has been created with email: ${email}`
        });

        return res.json({
            success: true,
            message: "Registration successful",
            role: "student"
        });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};



// ================== LOGIN (Student + Teacher) ==================
export const login = async (req, res) => {
    console.log("REQ BODY =>", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: "Email and password are required" });
    }

    try {

        // 1️⃣ TEACHER LOGIN
        const teacher = await Teacher.findOne({ email });

        if (teacher) {
            const isMatch = await bcrypt.compare(password, teacher.password);
            if (!isMatch) return res.json({ success: false, message: "Invalid password" });

            const token = jwt.sign(
                { id: teacher._id, role: "teacher" },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            return res.json({
                success: true,
                role: "teacher",
                email: teacher.email
            });
        }


        // 2️⃣ STUDENT LOGIN
        const student = await userModel.findOne({ email });

        if (student) {
            const isMatch = await bcrypt.compare(password, student.password);
            if (!isMatch) return res.json({ success: false, message: "Invalid password" });

            const token = jwt.sign(
                { id: student._id, role: "student" },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            return res.json({
                success: true,
                role: "student",
                email: student.email
            });
        }

        return res.json({ success: false, message: "User not found" });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};




// ================== LOGOUT ==================
export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        });
        return res.json({ success: true, message: "Logged Out" });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};




//send otp for verifcation
export const sendVerifyOtp= async (req, res)=>{
    try{
        const {userId}= req; //it was req.body
        const user = await userModel.findById(userId);

        if(user.isAccountVerified){
            return res.json({
                sucess:false,
                message:'Account already verified'
            })
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000)) //floor: rounds a number down to the nearest integer

        user.verifyOtp=otp;
        user.verifyOtpExpireAt=Date.now()+ 24 * 60 * 60 * 1000;

        await user.save();

        const mailOption={
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Account Verification OTP',
            text: `Your GradeFlow verification OTP is ${otp}`

        }
        await transporter.sendMail(mailOption);

        res.json({
            success: true, message: 'Verification OTP sent on Email'
        })



    }catch(error){
        res.json({
            success: false, message: error.message
        })

    }
}

//verify email by matching otp
export const verifyEmail = async (req, res)=>{
    // const {userId, otp}=req.body;
    const{otp}=req.body;
    const userId= req.userId;

    if(!userId || !otp){
        return res.json({
            success: false, message: 'Missing Details'
        })
    }

    try{
        const user= await userModel.findById(userId);
        
        if(!user){
            return res.json({
                success: false, message: 'User not Found'
            })

        
        }
        console.log(user.verifyOtp);
        console.log(otp);
        if(user.verifyOtp==='' || user.verifyOtp != otp){
           
            return res.json({
               
                success: false, message: 'Invalid OTP '
            })
        }
        if(user.verifyOtpExpireAt< Date.now()){
            return res.json({
                success: false, message: ' OTP expired '
            })

        } 

        user.isAccountVerified = true;
        user.verifyOtp=''; // after verification we reset these properties
        user.verifyOtpExpireAt= 0;

        
        await user.save();


    }catch(error){
        return res.json({
            success: false, message: error.message
        })
    }
}

//checking if user is authenticated 
export const isAuthenticated =async (req, res)=>{
    try{
        return res.json({
            success:true
        });
    }catch(error){
        return res.json({
            success:false, message: error.message
        })
    }
} 

//send Password Reset OTP
export const sendResetOtp = async (req,res)=>{
    const {email}= req.body;
    if(!email){
        return res.json({
            success: false, message: 'Email is required'
        })
    }

    try{
        const user =await userModel.findOne({email});
        if(!user){
            return res.json({
                success: false, message: 'User not found'
            })
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000)) //floor: rounds a number down to the nearest integer

        user.resetOtp=otp;
        user.resetOtpExpireAt=Date.now()+ 15  * 60 * 1000; //15min

        await user.save();

        const mailOption={
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Reset Password OTP',
            text: `Your OTP to reset password is  ${otp}. Use this OTP to reset your password at GradeFlow`

        }
        await transporter.sendMail(mailOption);

        return res.json({
            success: true, message:'Reset password OTP sent successfully'
        })


    }catch(error){
        return es.json({
            success: false, message: error.message
        }) 
    }
}

export const resetPassword =async (req, res)=>{
    const{email, otp, newPassword}=req.body;
     if(!email ||!otp || !newPassword){
        return res.json({
            success:false, message: 'Email, OTP, and new password are required'
        })
     }

     try{
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success: false, message: 'User not found'})
        }

        if(user.resetOtp==='' || user.resetOtp != otp){
           
            return res.json({
               
                success: false, message: 'Invalid OTP '
            })
        }
        if(user.resetOtpExpireAt< Date.now()){
            return res.json({
                success: false, message: ' OTP expired '
            })

        } 
        const hashedPassword =await bcrypt.hash(newPassword, 10);
        
        user.password=hashedPassword;
        user.resetOtp='';
        user.resetOtpExpireAt=0;

        await user.save();

        return res.json({
            success: true, message: ' Password has been reset successfully '
        });



     }catch(error){
        return res.json({
            success: false, message: error.message
        });
     }
} 