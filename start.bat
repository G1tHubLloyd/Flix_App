@echo off
echo Cleaning up ports and starting myFlix app...

REM Kill any node processes on ports 5002 and 5173
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":5002\|:5173"') do (
    taskkill /PID %%a /F >nul 2>&1
)

timeout /t 2 /nobreak

REM Start the dev servers
npm run dev
