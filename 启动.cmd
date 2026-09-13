@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo  ============================================
echo   个人作品集 - 启动开发服务器（热更新）
echo   地址: http://127.0.0.1:5173
echo   改完代码保存后，浏览器会自动刷新
echo   关闭这个窗口即停止服务
echo  ============================================
echo.
rem 稍等 4 秒再打开浏览器，避免页面先于服务器加载
start "" cmd /c "timeout /t 4 >nul && start http://127.0.0.1:5173"
call npm run dev
pause
