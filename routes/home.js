var express = require("express");
var router = express.Router();
var passport = require("../config/passport");

//Discount

router.get("/", (req, res) => {
    res.render("discount/index");
});

// Login

router.get("/login", function (req, res) {
    var username = req.flash("username")[0];
    var errors = req.flash("errors")[0] || {};
    res.render("home/login", {
        username: username,
        errors: errors,
    });
});

// Post Login

router.post(
    "/login",
    function (req, res, next) {
        var errors = {};
        var isValid = true;

        if (!req.body.username) {
            isValid = false;
            errors.username = "아이디를 입력하세요!";
        }
        if (!req.body.password) {
            isValid = false;
            errors.password = "비밀번호를 입력하세요!";
        }

        if (isValid) {
            next();
        } else {
            req.flash("errors", errors);
            res.redirect("/login");
        }
    },
    passport.authenticate("local-login", {
        successRedirect: "/boards",
        failureRedirect: "/login",
    })
);

// Logout

router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});

module.exports = router;
