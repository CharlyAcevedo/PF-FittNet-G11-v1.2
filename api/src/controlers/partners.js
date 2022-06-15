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
// const { putSocialMedia } =require("./helpers");
const Gyms = require("../models/Gyms");




const getPartner = async (req, res) => {
  const { id } = req.params;
  // console.log(id, "esta es la ruta correcta");
  try {
    const partnerUser = await User.findById(id)
    .populate({
      path: "partner",
    })
    const gyms = partnerUser.partner.gyms;
    const partnerGyms = await Partner.findById(partnerUser.partner._id)
    .populate({
      path: "gyms",
      populate: {
        path: "address socialNetworks services"
      }
    })
    .populate({
      path: "planType socialNetworks"
    })
    res.json({
      ok: true,
      partner: partnerGyms,
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
    const idPartnerPlan = planType ? planType : user.partner.planType;
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
      lastName: lastName ? lastName : user.partner.lastName ? user.partner.lastName : "",
      email: email ? email : user.userName,
      phone: phone ? phone : user.partner.phone ? user.partner.phone : 0,
      planType: planType ? planType : user.partner.planType ? user.partner.planType : "6296df7d36f26a8c660979e7",
      cbu: cbu ? cbu : user.partner.cbu ? user.partner.cbu : 1111111111111111,
      cuil: cuil ? cuil : user.partner.cuil ? user.partner.cuil : 11111111111,
      // category: category ? category : user.partner.category ? user.partner.category : [],
      userActive: userActive ? userActive : user.partner.userActive ? user.partner.userActive : false,
      paymentMethods: paymentMethods
        ? paymentMethods
        : user.partner.paymentMethods ? user.partner.paymentMethods : [],
      paidOut: paidOut ? paidOut : user.partner.paidOut ? user.partner.paidOut : false,
      incomes: incomes ? incomes : user.partner.incomes ? user.partner.incomes : [],
      payments: payments ? payments : user.partner.payments ? user.partner.payments : [],
    };
    const partnerUpdated = await Partner.findByIdAndUpdate(
      user.partner._id,
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
