import { Helmet } from 'react-helmet-async';

import { useState } from 'react';

function HomePage() {
  const [count, setCount] = useState(0);

  function handleClick() {
    // 在闭包创建时就获取当前的count值
    const currentCount = count;
    setTimeout(() => {
      console.log('点击时的count:', currentCount);
      console.log('当前的count:', count); // 仍然是闭包捕获的值
    }, 3000);
  }

  return (
    <>
      <Helmet>
        <title>🐻‍❄️ 首页</title>
      </Helmet>
      <div>
        <p>计数: {count}</p>
        <button onClick={() => setCount(count + 1)}>增加</button>
        <button onClick={handleClick}>延迟打印</button>
      </div>
    </>
  );
}

export default HomePage;
