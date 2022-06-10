import axios from "axios";

export async function SendEmail (userId, saleId) {
    const emailData = {
        userId: userId,
        saleId: saleId
    }    
    console.log(emailData, 'emailData')

    const email = await axios({
        method: "post",
        url: "/api/service/emails/",
        data: emailData,
        headers: { "X-Requested-With": "XMLHttpRequest" },
        withCredentials: true,
      })
        .then((res) => {
          return res.data;
        })
        .catch((error) => console.log(error));

    if(email.sended === true){ return true}
    if(email.sended === false){ return false}
}