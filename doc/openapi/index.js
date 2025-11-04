const express = require("express");

express()
    .use(express.static(__dirname))
    .listen(3000, () => {
        console.log("Server running on http://localhost:3000");
    });
