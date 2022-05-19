/* libraries */
const express = require("express");
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const crypto = require('crypto')
const router = express.Router();
const mysqlDB = require('../database/databaseAccessLayer')

const { append } = require("express/lib/response");



// GET /follow_business/follow_business_1
router.get("/follow_business_1", async(req, res) => {
    let cartItemsTotal = 0
    let productInfo = await mysqlDB.getRandomProducts(6)
    let storeInfo = await mysqlDB.getRandomStores(6)

    console.log(productInfo)
    console.log(storeInfo)

    // res.json({
    //     a: cardItemsTotal,
    //     b: productInfo,
    //     c: storeInfo
    // })

    // res.render("follow_business/follow_business_1", { 
    //     storeInfo, productInfo, cardItemsTotal 
    // })

    res.render("follow_business/follow_business_1", { storeInfo:storeInfo, productInfo:productInfo, cartItemsTotal:cartItemsTotal })
})




// GET /follow_business/follow_business_2

router.get("/follow_business_2/:id", async (req, res) => {

    let storeId = req.params.id


    let storeInfo = await mysqlDB.getStoreInfoByStoreId(storeId)
    
    let productInfo = await mysqlDB.getProductsAndImagesByStoreID(storeId)
    let storeImages = await mysqlDB.getShopPhotoByStoreId(storeId)
 


    res.render("follow_business/follow_business_2",{ storeInfo:storeInfo[0], productInfo:productInfo, storeImages:storeImages })
})






router.post("/follow_business_2", async (req, res) => {

    //the function that adds to the th follower to number of followers
    //the function that get the new followers quantity

    // let buyer_id = req.session.buyer.buyer_id
    let followersNum = 3
    // await mysqlDB.addToCart(buyer_id, product_id)
    // let followersNum =  await mysqlDB.getStoreInfoByStoreId(storeId).followers


    res.json({ quantity: followersNum })

})



module.exports = router;