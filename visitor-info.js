// 腾讯云Serverless Function 示例
// 路径: /api/visitor-info

exports.main = async (event, context) => {
  // 记录访问者IP（从event中获取）
  let clientIp = '';
  if (event.headers && event.headers['x-forwarded-for']) {
    clientIp = event.headers['x-forwarded-for'].split(',')[0];
  } else if (event.requestContext && event.requestContext.clientIp) {
    clientIp = event.requestContext.clientIp;
  }
  
  // 记录请求头信息
  const headers = event.headers || {};
  
  // 构建响应数据
  const responseData = {
    ip: clientIp,
    headers: headers,
    timestamp: new Date().toISOString()
  };
  
  // 日志记录（可在腾讯云控制台查看）
  console.log('访问者信息:', responseData);
  
  // 返回标准SCF响应格式（必须包含statusCode、headers、body）
  return {
    isBase64Encoded: false,
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', // 允许跨域
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type'
    },
    body: JSON.stringify(responseData)
  };
};