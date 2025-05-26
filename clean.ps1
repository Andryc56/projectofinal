# Script para limpiar el proyecto
Write-Host "Limpiando el proyecto..." -ForegroundColor Green

# Detener procesos que puedan estar usando node_modules
Write-Host "Deteniendo procesos de Node.js..." -ForegroundColor Yellow
Get-Process | Where-Object { $_.ProcessName -eq 'node' } | Stop-Process -Force -ErrorAction SilentlyContinue

# Eliminar node_modules si existe
if (Test-Path "node_modules") {
    Write-Host "Eliminando node_modules..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
}

# Eliminar package-lock.json si existe
if (Test-Path "package-lock.json") {
    Write-Host "Eliminando package-lock.json..." -ForegroundColor Yellow
    Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
}

# Eliminar .next si existe
if (Test-Path ".next") {
    Write-Host "Eliminando carpeta .next..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
}

# Instalar dependencias
Write-Host "Instalando dependencias..." -ForegroundColor Green
npm install --legacy-peer-deps

Write-Host "¡Limpieza y reinstalación completadas!" -ForegroundColor Green
