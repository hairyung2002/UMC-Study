import React from "react";

Cookies.set("userToken", "abcd1234", { expires: 7});
const token = Cookies.get("userToken");
console.log(token)

Cookies.remove("userToken");

