console.log("test/page.jsx");

import React from 'react';
import { Button, Icon, Row, Col, Switch, Calendar, Carousel, message, Pagination } from 'antd';
import 'antd/style/index.less';
import './page.less';


class Test extends React.Component {
	
	switchOnChange (checked) {
		console.log(`switch to ${checked}`);
	}

	onPanelChange (value, mode) {
		console.log(value, mode);
	}

	messageHandle () {
		message.config({
		  top: window.innerHeight * 0.5
		});
		message.destroy();
		message.loading('正在加载...', 5);
	};

	render () {
		return <div id='Test'>
			<div className='block'>
				<h2>按钮们</h2>
				<Button type="primary"  size="large"><Icon type="search" />我是按钮</Button>
				<br />
				<Button loading>加载中...</Button>
				<br />
				<Button type="primary" size="large">
					<Icon type="search" />
					大按钮
				</Button>
				<br />
				<Button onClick={this.messageHandle}>自定义时长提示</Button>
			</div>

			<div className='block'>
				<h2>LINK们</h2>
				<Icon type="step-backward" />
				<Icon type="step-forward" />
				<Icon type="fast-backward" />
				<Icon type="fast-forward" />
				<Icon type="shrink" />
			</div>

			<div className='block'>
				<h2>layouts们</h2>
				<Row>
					<Col span="12">.col-12</Col>
					<Col span="12">.col-12</Col>
				</Row>
				<Row className="testRowClassName">
					<Col span="8">.col-8</Col>
					<Col span="8">.col-8</Col>
					<Col span="8" className="testColClassName">.col-8</Col>
				</Row>
			</div>

			<div className='block'>
				<h2>开关们</h2>
				<Switch defaultChecked="开" checkedChildren="开" unCheckedChildren="关" onChange={this.switchOnChange.bind(this)} />
				<br />
				<Switch />
			</div>

			<div className='block'>
				<h2>日历们</h2>
				<Calendar fullscreen={false} onPanelChange={this.onPanelChange.bind(this)} />
			</div>

			<div className='block'>
				<h2>滚屏们</h2>
				<Carousel effect="scrollx" dots="false">
					<div><h3>1</h3></div>
					<div><h3>2</h3></div>
					<div><h3>3</h3></div>
					<div><h3>4</h3></div>
				</Carousel>
			</div>
		</div>
	}
}

export default Test;