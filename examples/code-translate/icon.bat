@REM % 进入图标缓存目录%
cd /c %userprofile%\AppData\Local\Microsoft\Windows\Explorer

@REM %关闭Windows资源管理器explorer%
taskkill /f /im explorer.exe

@REM %延时3s%
ping -n 3 127.0.0.1>nul

@REM %删除图标缓存数据库%
@REM attrib -h iconcache_.db
del iconcache_.db /a

@REM %延时3s%
ping -n 3 127.0.0.1>nul

@REM %重启Windows资源管理器explorer%
start explorer
