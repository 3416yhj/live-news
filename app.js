const express = require('express');
const cors = require('cors');
const app = express();
const cron = require('node-cron');

// Netlify 주소만 허용
app.use(cors({
  origin: 'https://your-netlify-site.netlify.app'
}));

// 나머지 라우터
const newsRouter = require('./routes/news');
app.use('/api/news', newsRouter);

app.listen(3000, () => {
  console.log('서버 실행 중 http://localhost:3000'); //서버 주소로 바꿔
});

cron.schedule('*/10 * * * *', async () => {
  const news = await getEconomicNews();
  console.log('10분마다 뉴스 크롤링:', news.length, '개');
});