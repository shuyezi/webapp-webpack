console.log("demo/page.jsx");

import React from 'react';
import { Link } from 'react-router';
import './page.less';

//import images
import Img1 from './images/1.jpg';
import Img2 from './images/test/1.jpg';

class Demo extends React.Component {
	render () {
		return <div id='Demo'>
			<p>Hello World! I am from Demo/page.jsx.</p>
			<img src={Img1} style={{width:'100px', height:'100px', display:'block'}} />
			<div className='ttt'></div>
			<Link to='/'>To Index</Link>
		</div>
	}
}

export default Demo;