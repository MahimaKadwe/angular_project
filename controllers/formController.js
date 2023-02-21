const express = require("express");
const formModel = require("../models/form");

//FOR CREATING A FORM...
const createForm = async (req, res) => {

formModel.create( {  
                        'title': req.body.title, 
                        'description': req.body.description,
                        'type': req.body.type,
                        'questions':req.body.questions,
                        'userId':req.userId
                    }, 
    (err, result ) => {
        if (err) {
            console.log('error', err)
            res.send('Something went wrong...')
        } else {
            res.status(200).send(result);
        }
    })



};

//FOR UPDATING FORM
const updateForm = async (req, res) => {
  const id = req.params.id;
  const { title, description,questions } = req.body;
  const newForm = {
    title: title,
    description: description,
    type:type,
    questions:questions
  };
  try {
    await formModel.findByIdAndUpdate(id, newForm, { new: true });
    res.status(200).json(newForm);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong.." });
  }
};

//FOR DELETING A FORM
const deleteForm = async (req, res) => {
  const id = req.params.id;
  
    let checker=false;
    const usersForms=await formModel.find({
      userId:req.userId
    })

    //searching inside the array for that form with id
    for(let i=0;i<usersForms.length;i++){
      if(id===usersForms[i].id)
        checker=true;
    }

    if(checker===true){
    try {
      
    const form = await formModel.findByIdAndRemove(id);
    res.status(202).json(form);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong..." });
  }
}
else{
  res.json({message:"You can't delete another user's form"});
}
};



//FOR GETTING FORMS
const getForms = async (req, res) => {
  try {
    const forms = await formModel.find({
      userId: req.userId,
    });
    res.status(200).json(forms);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong..." });
  }
};


//FOR GETTING ALL FORMS OF ALL USERS AS AN ADMIN...
const getAllForms =async (req, res)=>{

	try{
		const forms=await formModel.find()
		res.status(200).json(forms);

	}
	catch(error){
		console.log(error);
		res.status(500).json({message:"Something went wrong..."});
	}

}


//FOR GETTING A FORM BY ITS ID
const getFormById=async(req,res)=>{
  try{
    const form=await formModel.findById(req.params.id)
    res.status(200).json(form);
  }
  catch(error){
    console.log(error);
    res.status(500).json({message:"Something went wrong..."});
  }
}


//FOR GETTING BY SURVEY ID REQUIRED FOR FE

const getFormBySurveyID=async(req,res)=>{
  try{
    const forms=await formModel.findOne({
      _id:req.params.id,
    })
    res.status(200).json(forms);
  }
  catch(error){
    console.log(error);
    res.status(500).json({message:"Something went wrong..."});
  }
}




module.exports = {
  createForm,
  updateForm,
  deleteForm,
  getForms,
  getFormById,
  getAllForms,
  getFormBySurveyID
};





















