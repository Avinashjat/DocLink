import doctorModel from "../models/doctorModel.js"


const changeAvailable = async (req , res) =>{
    try {

        const {docId} = req.body

        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId , {available :!docData.available})
        res.json({success:true , message : 'Availablity Changed'})
        
    } catch (error) {
        console.error("Error:", error);
        res.json({ success: false, message: error.message });
    }    
    }

    export {changeAvailable}