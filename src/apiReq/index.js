const axios = require("axios");
const crypto = require("crypto");

export default function APIRequest(method = "POST", url, data = "") {
  const path = "/api/v1" + url,
    expiresDate = Math.round(new Date().getTime() / 1000) + 60,
    postBody = data ? JSON.stringify(data) : data,
    headers = {
      "content-type": "application/json",
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "api-expires": expiresDate,
      "api-key": process.env.VUE_APP_apiKey,
      "api-signature": crypto
        .createHmac("sha256", process.env.VUE_APP_apiSecret)
        .update(method + path + expiresDate + postBody)
        .digest("hex"),
    },
    requestOptions = {
      headers: headers,
      method: method,
      url: process.env.VUE_APP_apiUrl + url,
      data: postBody,
    };

  return axios(requestOptions);
}
