# Development startup script for Finance Tracker
Write-Host "🚀 Starting Finance Tracker Development Environment" -ForegroundColor Green

# Start backend
Write-Host "📡 Starting backend server..." -ForegroundColor Blue
Start-Process -WindowStyle Normal -FilePath "powershell" -ArgumentList "-Command", "cd 'C:\Users\rohit\backend'; npm run dev"

# Wait for backend to start
Write-Host "⏳ Waiting for backend to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# Start frontend
Write-Host "🎨 Starting frontend server..." -ForegroundColor Blue
Start-Process -WindowStyle Normal -FilePath "powershell" -ArgumentList "-Command", "cd 'C:\Users\rohit\Downloads\project-bolt-sb1-s5ja7rhi\project'; npm run dev"

Write-Host "✅ Both servers starting..." -ForegroundColor Green
Write-Host "🌐 Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "📡 Backend:  http://localhost:3001" -ForegroundColor Cyan
Write-Host "📖 API Docs: See C:\Users\rohit\backend\docs\local-auth-guide.md" -ForegroundColor Cyan

Write-Host "`n💡 Press any key to continue..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
