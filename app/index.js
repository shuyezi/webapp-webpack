/**
 * @name App入口文件
 */

console.log("app/index.js");

import React from 'react';
import ReactDOM from 'react-dom';
import routers from './routers';

ReactDOM.render(
	routers,
	document.getElementById("badminton")
);
