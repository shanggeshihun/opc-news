@echo off
echo ========================================
echo OPC News 自动更新演示
echo ========================================
echo.
echo 1. 手动更新数据
echo 2. 查看日志
echo 3. 启动调度器（后台运行）
echo 4. 退出
echo.
set /p choice="请选择操作 (1-4): "

if "%choice%"=="1" (
    echo.
    echo 正在更新数据...
    call npm run update-news
    echo.
    echo 数据已更新！
    pause
) else if "%choice%"=="2" (
    echo.
    if exist logs\scheduler.log (
        echo === 调度器日志 ===
        type logs\scheduler.log
    ) else (
        echo 日志文件不存在
    )
    echo.
    pause
) else if "%choice%"=="3" (
    echo.
    echo 启动调度器...
    echo 注意: 此窗口关闭后调度器将停止
    echo 建议使用 PM2 进行生产环境部署
    echo.
    call npm run scheduler:start
    pause
) else if "%choice%"=="4" (
    exit
) else (
    echo 无效选择
    pause
)