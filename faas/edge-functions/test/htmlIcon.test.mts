import { JSDOM } from 'jsdom';
import getFaviconUrl from '../src/htmlIcon/search.mts';

// 模拟Request对象
class MockRequest {
  constructor(public url: string) {}
}

// 测试获取百度图标
async function testBaiduIcon() {
  try {
    console.log('测试获取百度图标...');
    // 创建模拟请求对象
    const request = new MockRequest('http://localhost:8888/?url=baidu.com');
    // 调用函数
    const result = await getFaviconUrl(request);
    console.log('测试结果:', result);
  } catch (error) {
    console.error('测试失败:', error);
  }
}

// 测试修复后的版本
async function testFixedVersion() {
  try {
    console.log('测试修复后的版本...');
    const targetUrl = 'https://baidu.com';
    // 直接请求百度
    const response = await fetch(targetUrl);
    const html = await response.text();
    console.log('HTML长度:', html.length);
    // 解析HTML
    const dom = new JSDOM(html);
    const document = dom.window.document;
    // 查找图标
    const iconLinks = document.querySelectorAll('link[rel*="icon"], link[rel*="ICON"]');
    console.log('找到的图标标签数量:', iconLinks.length);
    // 输出所有找到的图标
    iconLinks.forEach((link, index) => {
      console.log(`图标 ${index + 1}:`);
      console.log('  rel:', link.getAttribute('rel'));
      console.log('  href:', link.getAttribute('href'));
      console.log('  sizes:', link.getAttribute('sizes'));
      console.log('  type:', link.getAttribute('type'));
    });
  } catch (error) {
    console.error('修复版本测试失败:', error);
  }
}

// 运行测试
async function runTests() {
  await testBaiduIcon();
  console.log('------------------------');
  await testFixedVersion();
}

runTests();