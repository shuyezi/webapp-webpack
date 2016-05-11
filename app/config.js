/**
 * @name App的一些配置信息
 */

//环境配置
import { env } from '../.env';
exports.env = env;

//api借口配置
exports.apis = {
	index: '/home'
}

//domain配置
exports.domain = {
	debug: 'http://www.dingzhanghe.com',
	test: 'http://www.dingzhanghe.com',
	production: 'http://www.dingzhanghe.com'
}