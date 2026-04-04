$ErrorActionPreference = 'Stop'

$port = 5173
Set-Location -Path $PSScriptRoot

Write-Host '============================================'
Write-Host ' Dr. Kapure Clinic - LAN Dev Starter'
Write-Host '============================================'

# If something is already listening on 5173, stop it to avoid Vite port errors.
$existingListener = Get-NetTCPConnection -State Listen -LocalPort $port -ErrorAction SilentlyContinue | Select-Object -First 1
if ($existingListener) {
  $existingPid = $existingListener.OwningProcess
  try {
    Stop-Process -Id $existingPid -Force -ErrorAction Stop
    Write-Host "Stopped existing process on port $port (PID: $existingPid)."
  }
  catch {
    Write-Host "Could not stop PID $existingPid automatically. Close that app and rerun this command."
    throw
  }
}

# Pick IPv4 from the active network profile for easy mobile access.
$activeProfile = Get-NetConnectionProfile | Select-Object -First 1
$lanIp = $null
if ($activeProfile) {
  $lanIp = Get-NetIPAddress -AddressFamily IPv4 -InterfaceIndex $activeProfile.InterfaceIndex -ErrorAction SilentlyContinue |
    Where-Object { $_.IPAddress -notlike '169.254*' } |
    Select-Object -First 1 -ExpandProperty IPAddress
}

if (-not $lanIp) {
  $lanIp = 'localhost'
}

Write-Host ''
Write-Host 'Dev server links:'
Write-Host "  Local  : http://localhost:$port/"
Write-Host "  Mobile : http://${lanIp}:$port/"
Write-Host ''
Write-Host 'Starting Vite dev server...'
Write-Host ''

npm run dev -- --host 0.0.0.0 --port $port --strictPort
