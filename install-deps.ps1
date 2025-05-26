# Script para instalar dependencias de manera confiable
Write-Host "=== Iniciando instalación de dependencias ===" -ForegroundColor Cyan

# 1. Limpiar la caché de npm
Write-Host "Limpiando caché de npm..." -ForegroundColor Yellow
try {
    npm cache clean --force
    Write-Host "Caché de npm limpiada correctamente" -ForegroundColor Green
} catch {
    Write-Host "Error al limpiar la caché de npm: $_" -ForegroundColor Red
}

# 2. Instalar las dependencias principales primero
$packages = @(
    "next@15.3.2",
    "react@^18.2.0",
    "react-dom@^18.2.0",
    "typescript@^5.3.3"
)

foreach ($pkg in $packages) {
    Write-Host "Instalando $pkg..." -ForegroundColor Yellow
    try {
        npm install $pkg --legacy-peer-deps --no-audit --prefer-offline
        Write-Host "$pkg instalado correctamente" -ForegroundColor Green
    } catch {
        Write-Host "Error al instalar $pkg : $_" -ForegroundColor Red
    }
}

# 3. Instalar dependencias de desarrollo
$devPackages = @(
    "@types/node@^20.11.25",
    "@types/react@^18.2.64",
    "@types/react-dom@^18.2.21",
    "eslint@^8.56.0",
    "eslint-config-next@15.3.2",
    "postcss@^8.4.35",
    "tailwindcss@^3.4.1",
    "autoprefixer@^10.4.20"
)

foreach ($pkg in $devPackages) {
    Write-Host "Instalando $pkg como dependencia de desarrollo..." -ForegroundColor Yellow
    try {
        npm install --save-dev $pkg --legacy-peer-deps --no-audit --prefer-offline
        Write-Host "$pkg instalado correctamente" -ForegroundColor Green
    } catch {
        Write-Host "Error al instalar $pkg : $_" -ForegroundColor Red
    }
}

# 4. Instalar el resto de dependencias
$otherDeps = @(
    "framer-motion@^12.0.6",
    "next-themes@^0.4.6",
    "react-icons@^5.5.0",
    "clsx@^2.1.0",
    "tailwind-merge@^2.2.1",
    "tailwindcss-animate@^1.0.7"
)

foreach ($pkg in $otherDeps) {
    Write-Host "Instalando $pkg..." -ForegroundColor Yellow
    try {
        npm install $pkg --legacy-peer-deps --no-audit --prefer-offline
        Write-Host "$pkg instalado correctamente" -ForegroundColor Green
    } catch {
        Write-Host "Error al instalar $pkg : $_" -ForegroundColor Red
    }
}

Write-Host "=== Instalación de dependencias completada ===" -ForegroundColor Cyan
