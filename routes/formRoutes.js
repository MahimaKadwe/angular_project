const express=require('express');

const auth=require('../middlewares/auth');
const authforadmin=require('../middlewares/authforadmin')


const {getForms,createForm,getAllForms,deleteForm,updateForm,getFormById, getFormBySurveyID}=require('../controllers/formController')
const formRouter=express.Router();


formRouter.get('/',auth,getForms)

formRouter.get('/:id',getFormById)

formRouter.post('/',auth,createForm)


formRouter.delete("/:id",auth,deleteForm);

formRouter.put("/:id",auth,updateForm);

formRouter.get('/allforms',auth,authforadmin,getAllForms);

formRouter.get('/form/:id',getFormBySurveyID);



module.exports=formRouter

