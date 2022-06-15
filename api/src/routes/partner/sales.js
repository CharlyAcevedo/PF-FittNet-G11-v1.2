const { Router } = require("express");
const { getPartnerSales } = require("../../controlers/salesFilters");
const router = Router();

//----------------------------------------------------------------------------
// Envia todas las ventas con status Payed del partner
//----------------------------------------------------------------------------
// http://localhost:3001/api/partner/sales/:id

router.get('/:id', async (req, res) => { 
    try {
        const { id } = req.params;
        console.log(id, "el id desde la ruta")
        const response = await getPartnerSales(id);      
        res.status(200).send(response);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
})
  

module.exports = router;