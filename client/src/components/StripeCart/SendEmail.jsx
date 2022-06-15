import axios from "axios";

export async function SendEmail(put) {  
  const email = await axios({
    method: "post",
    url: "/api/service/emails/",
    data: put,
    headers: { "X-Requested-With": "XMLHttpRequest" },
    withCredentials: true,
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.log(error));

  if (email.sended === true) { return true }
  if (email.sended === false) { return false }
}