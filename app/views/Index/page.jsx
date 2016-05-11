console.log("index/page.jsx");

import React from 'react';
import { Link } from 'react-router';
import { get } from 'ajax';
import { apis, domain, env } from '../../config';
import './page.less';

//import images
import Img1 from './images/1.jpg';

class Index extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			linkName: 'TO DEMO FROM STATE',
			author: ''
		}
	}

	componentWillMount() {
	 	get(domain[env] + apis.index, false, function (result) {
	 		this.setState({
	 			linkName: 'TO DEMO WITH REQUEST 22',
	 			author: result.obj.name
	 		});
	 	}.bind(this));
	}

	render () {
		return <div id='Index'>
			<p>Hello World! I am from Index/page.jsx.</p>
			<img src={Img1} style={{width:'100px', height:'100px'}} />
			<Link to='demo'>{this.state.linkName}</Link>
			<div className=''>作者名字：{this.state.author}</div>
		</div>
	}

}

export default Index;