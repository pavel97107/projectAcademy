"use strict";
import "@babel/polyfill";
import "nodelist-foreach-polyfill";
import elementClosest from "element-closest";
elementClosest(window);
var formDataPolyfill = require("formdata-polyfill");
var Promise = require("es6-promise").Promise;

import countTimer from "./modules/countTimer";
import toggleMenu from "./modules/toggleMenu";
import tabs from "./modules/tabs";
import animationWindow from "./modules/animationWindow";
import slider from "./modules/slider";
import command from "./modules/command";
import calc from "./modules/calc";
import sendForm from "./modules/sendForm";

countTimer();
toggleMenu();
tabs();
animationWindow();
slider();
command();
calc(100);
sendForm("form1", "input");
sendForm("form2", "input");
sendForm("form3", "input");
