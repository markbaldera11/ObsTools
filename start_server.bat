@echo off
setlocal enabledelayedexpansion

REM Check if Python is installed
python --version 2>NUL
if %errorlevel% equ 0 (
    echo Python is already installed.
) else (
    echo Python is not installed. Installing Python...
    REM Download and install Python (you can modify the version and URL as needed)
    powershell -command "Invoke-WebRequest -Uri https://www.python.org/ftp/python/3.9.7/python-3.9.7-amd64.exe -OutFile python-installer.exe"
    start /wait python-installer.exe /quiet InstallAllUsers=1 PrependPath=1
    del python-installer.exe

    REM Verify if Python was installed successfully
    python --version 2>NUL
    if %errorlevel% equ 0 (
        echo Python installation succeeded.
    ) else (
        echo Python installation failed.
        exit /b 1
    )
)

REM Start the local web server
cd /d %~dp0
start cmd /k "python -m http.server 8000"

REM Get the relative path and URL encode it
set "path=%~dp0"
for %%i in (/) do set "path=!path:%%i=%%5C!"
set "file=index.html"
set "url=http://localhost:8000/%file%"

echo.
echo The local web server is running. Open the following link in your browser:
echo [Click here to open plugin.html](%url%)
pause

:end
