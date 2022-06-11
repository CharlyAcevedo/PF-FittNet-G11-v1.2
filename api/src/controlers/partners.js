const mongoose = require("mongoose");
const User = require("../models/User");
const Partner = require("../models/Partner");
const Gym = require("../models/Gyms");
const Service = require("../models/Service");
const Address = require("../models/Address");
const ObjectId = require("mongoose").Types.ObjectId;
const Plan = require("../models/Plan");
const SocialMedia = require("../models/SocialMedia");
const { postGyms } = require("../controlers/gyms")
const { putSocialMedia } =require("./helpers")


const getPartner = async (req, res) => {
  const { id } = req.params;
  console.log(id, "esta es la ruta correcta");
  try {
    const partner = await User.aggregate([
      {
        $match: { _id: ObjectId(id) },
      },
      {
        $lookup: {
          from: "partners",
          localField: "partner",
          foreignField: "_id",
          as: "partner",
        },
      },
      {
        $lookup: {
          from: "plans",
          localField: "partner.planType",
          foreignField: "_id",
          as: "planType",
        },
      },
      {
        $lookup: {
          from: "socialmedias",
          localField: "partner.socialNetworks",
          foreignField: "_id",
          as: "socialNetworks",
        },
      },
      {
        $lookup: {
          from: "gyms",
          localField: "partner.gyms",
          foreignField: "_id",
          as: "gyms",
        },
      },
    ]);
    // console.log(partner)
    res.json({
      ok: true,
      partner,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error",
    });
  }
};

const getAllPartners = async (req, res) => {
  // const { id } = req.params;
  console.log("esta es la ruta correcta");
  try {
    const partner = await User.aggregate([
      {
        $match: { type: "partner" },
      },
      {
        $lookup: {
          from: "partners",
          localField: "partner",
          foreignField: "_id",
          as: "partner",
        },
      },
      {
        $lookup: {
          from: "plans",
          localField: "partner.planType",
          foreignField: "_id",
          as: "planType",
        },
      },
      {
        $lookup: {
          from: "socialmedias",
          localField: "partner.socialNetworks",
          foreignField: "_id",
          as: "socialNetworks",
        },
      },
      {
        $lookup: {
          from: "gyms",
          localField: "partner.gyms",
          foreignField: "_id",
          as: "gyms",
        },
      },
      // {$unwind: {path: '$gyms', preserveNullAndEmptyArrays: true}},
    ]);
    // console.log(partner)
    res.json({
      ok: true,
      partner,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error",
    });
  }
};


const putPartner = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    lastName,
    email,
    phone,
    planType, //debe llegar como un id del plan, si no llega buscar en los datos del usuario
    cbu,
    cuil,
    socialNetworks, //debe llegar como un array de id
    gyms, //debe llegar como un array de id
    category, //debe llegar como un id
    userActive, //si llega seria como bolean
    paymentMethods, //debe llegar como un array de id
    paidOut,
    incomes, //debe llegar como un array de id
    payments, //debe llegar como un array de id
  } = req.body;

  try {
    //primero identifica el plan del usuario partner
    const user = await User.findById(id).populate("partner");
    const idPartnerPlan = planType ? planType : user.partner[0].planType;
    const partnerPlan = await Plan.findById(idPartnerPlan); //obtengo el plan del usuario

    if (!partnerPlan){
      // si por algo el id del plan no corresponde a alguno de la base termina aqui
      return res.status(404).send({
        msg: "no fue posible encontrar el plan del usuario, intente elegir un plan nuevamente",
      })
    };

      //se envian las redes sociale para su creacion o edicion
    let sMediaUser = [];
    if (socialNetworks && Array.isArray(socialNetworks)) { 
      sMediaUser = await putSocialMedia(id, socialNetworks);
    }
    // console.log(id, gyms[0])
      // se envian los gyms para su creacion o edicion
      let partnerGyms = "";
    if (gyms && Array.isArray(gyms) && gyms.length > 0) {
      partnerGyms = await postGyms(id, gyms);
    }

    const newPartner = {
      name: name ? name : user.name,
      lastName: lastName ? lastName : user.partner[0].lastName,
      email: email ? email : user.userName,
      phone: phone ? phone : user.partner[0].phone,
      planType: planType ? planType : user.partner[0].planType,
      cbu: cbu ? cbu : user.partner[0].cbu,
      cuil: cuil ? cuil : user.partner[0].cuil,
      category: category ? category : user.partner[0].category,
      userActive: userActive ? userActive : user.partner[0].userActive,
      paymentMethods: paymentMethods
        ? paymentMethods
        : user.partner[0].paymentMethods,
      paidOut: paidOut ? paidOut : user.partner[0].paidOut,
      incomes: incomes ? incomes : user.partner[0].incomes,
      payments: payments ? payments : user.partner[0].paymentMethods,
    };
    const partnerUpdated = await Partner.findByIdAndUpdate(
      user.partner[0]._id,
      newPartner,
      { new: true }
    ).populate("socialNetworks").populate("gyms").populate("planType");

    const userUpdated = await User.findById({ _id: id })
    return res.json({
      ok: true,
      msg: "La información del socio ha sido actualizada",
      // user: userUpdated,
      // partner: partnerUpdated,
      // partnerGyms
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: error.message,
    });
  }
};

module.exports = { getPartner, putPartner, getAllPartners };
