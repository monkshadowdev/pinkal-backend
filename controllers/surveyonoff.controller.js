import { SurveyOnOff } from "../models/surveyonoff.model.js";

export const surveyOnOff = async (req, res) => {
    try {
        const { surveyEnabled } = req.body;
    
        if (typeof surveyEnabled !== "boolean") {
          return res.status(400).json({ message: "Invalid value for surveyEnabled." });
        }
    
        // Use findOneAndUpdate to update or create the document, ensuring only one exists
        const surveyStatus = await SurveyOnOff.findOneAndUpdate(
          {}, // Empty filter ensures it checks the entire collection
          { surveyEnabled }, // Set the new surveyEnabled value
          { new: true, upsert: true } // Create the document if it doesn't exist
        );
    
        res.status(200).json({
          message: "Survey status updated successfully.",
          data: surveyStatus,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
      }
}