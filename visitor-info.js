// Vercel Serverless Function 示例
// 路径: /api/visitor-info.js

module.exports = (req, res) => {
  // 记录访问者IP
  const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
  
  // 记录请求头信息
  const headers = req.headers;
  
  // 构建响应数据
  const responseData = {
    ip: clientIp,
    headers: headers,
    timestamp: new Date().toISOString()
  };
  
  // 可以在这里添加日志记录到数据库或其他存储服务
  console.log('访问者信息:', responseData);
  
  // 设置CORS头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // 返回JSON响应
  res.status(200).json(responseData);
};