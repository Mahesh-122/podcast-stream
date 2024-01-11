import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { addView, addepisodes, createCasting, favoritCasting, getByCategory, getByTag, getCastingById, getCastings, random, search, mostpopular } from "../controllers/castings.js";


const router = express.Router();

//create a Casting
router.post("/",verifyToken, createCasting);
//get all Castings
router.get("/", getCastings);
//get Casting by id
router.get("/get/:id",getCastingById)

//add episode to a 
router.post("/episode",verifyToken, addepisodes);

//favorit/unfavorit Casting
router.post("/favorit",verifyToken,favoritCasting); 

//add view
router.post("/addview/:id",addView); 


//searches
router.get("/mostpopular", mostpopular)
router.get("/random", random)
router.get("/tags", getByTag)
router.get("/category", getByCategory)
router.get("/search", search)





export default router;