const fs = require("fs");
const axios = require("axios").default;

export const createLog = (info) => {
  var data =
    "date=" +
    info.date +
    "&hour=" +
    info.hour +
    "&action=" +
    info.action +
    "&error=" +
    info.error +
    "&error_description=" +
    info.error_description +
    "&whatsapp=" +
    info.whatsapp;
  axios({
    method: "post",
    url: "/",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    baseURL: "http://gestforce.com.br:4003/access/insert",
    data: data,
  });
};
