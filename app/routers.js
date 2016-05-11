/**
 * @name App路由文件
 */

import React from 'react';
import { Router, Route, hashHistory } from 'react-router';

//pages
import Index from './views/Index/page';
import Demo from './views/Demo/page';
import Test from './views/Test/page';

export default (
	<Router history={hashHistory}>
		<Route path="/" component={Index} />
		<Route path="demo" component={Demo} />
		<Route path="test" component={Test} />
	</Router>
);