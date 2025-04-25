import { Col, Row, Typography } from 'antd';
import styles from './hotTools.module.scss';

const HotTools = () => {
	const tools = [
		{
			name: 'DeepSeek',
			icon: 'https://cdn.deepseek.com/chat/icon.png',
			desc: '代替GPT的国产免费AI大模型',
			link: 'https://chat.deepseek.com/'
		},
		{
			name: '豆包',
			icon: '//lf-flow-web-cdn.doubao.com/obj/flow-doubao/doubao/web/logo-icon.png',
			desc: '字节跳动出品的大模型AI工具',
			link: 'https://www.doubao.com/'
		},
		{
			name: '百度图片AI',
			icon: 'https://gips3.baidu.com/it/u=618760020,1553692199&fm=3028&app=3028&f=PNG&fmt=auto&q=94&size=f90_90',
			desc: '提供图片的各种AI处理,如去水印、抠图等',
			link: 'https://image.baidu.com/search/index?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fm=detail&hs=0&xthttps=111110&sf=1&fmq=1713767239197_R&pv=&ic=0&nc=1&z=&se=&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&word=bdaitpzs%E7%99%BE%E5%BA%A6AI%E5%9B%BE%E7%89%87%E5%8A%A9%E6%89%8Bbdaitpzs'
		},
		{
			name: 'Kimi',
			icon: 'https://statics.moonshot.cn/kimi-web-seo/assets/kimi-home-BCnxCuPX.png',
			desc: '提供免费的AI生成PPT功能',
			link: '#'
		}
	];

	return (
		<div className={styles['hot-tools-container']}>
			<div style={{ marginBottom: 20 }}>
				<span className={styles['gradient-title']}>站外工具</span>
			</div>
			<Row gutter={16}>
				{tools.map((tool) => (
					<Col key={tool.name} xs={24} sm={12} md={8} lg={6}>
						<a
							href={tool.link}
							target="_blank"
							style={{ padding: 16, borderRadius: 12 }}
						>
							<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
								<div
									style={{
										width: 48,
										height: 48,
										borderRadius: 8,
										overflow: 'hidden'
									}}
								>
									<img
										src={tool.icon}
										alt={tool.name}
										style={{ width: '100%', height: '100%' }}
									/>
								</div>
								<div style={{ flex: 1 }}>
									<Typography.Title
										level={4}
										ellipsis
										style={{
											margin: 0,
											fontSize: 16,
											fontWeight: 500,
											color: '#333'
										}}
									>
										{tool.name}
									</Typography.Title>
									<Typography.Text
										ellipsis
										style={{ margin: '4px 0 0', fontSize: 12, color: '#666' }}
									>
										{tool.desc}
									</Typography.Text>
								</div>
							</div>
						</a>
					</Col>
				))}
			</Row>
		</div>
	);
};

export default HotTools;
