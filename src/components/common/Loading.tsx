const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-lg font-semibold text-gray-700">页面加载中...</p>
        <p className="text-sm text-gray-500">请稍候</p>
      </div>
    </div>
  );
};

export default Loading;
