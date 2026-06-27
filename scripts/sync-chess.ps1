# Sync the Chess Battlefield game from the dev copy into public/chess for hosting.
# Usage:  pwsh scripts/sync-chess.ps1   (or run from PowerShell)
# - copies index.html + models/ + assets/ + lib/ from the dev folder
# - injects <base href="/chess/"> (needed for the chess.lakshya.space subdomain)
# - removes duplicate *_b.glb (white is reused for black at runtime)

param([string]$Src = "G:\3dchess")
$Dst = Join-Path $PSScriptRoot "..\public\chess" | Resolve-Path -ErrorAction SilentlyContinue
if (-not $Dst) { $Dst = Join-Path $PSScriptRoot "..\public\chess"; New-Item -ItemType Directory -Force $Dst | Out-Null }

Copy-Item "$Src\index.html" $Dst -Force
foreach ($d in "models","assets","lib") { Copy-Item "$Src\$d" $Dst -Recurse -Force }

# inject <base href="/chess/"> right after <meta charset...> if not already there.
# Use explicit UTF-8 (no BOM) IO so em-dashes / emoji in the UI are NOT corrupted.
$idx = Join-Path $Dst "index.html"
$enc = New-Object System.Text.UTF8Encoding($false)
$html = [System.IO.File]::ReadAllText($idx, $enc)
if ($html -notmatch '<base\s') {
  $html = $html -replace '(<meta charset="[^"]*">)', ('$1' + "`r`n" + '<base href="/chess/">')
  [System.IO.File]::WriteAllText($idx, $html, $enc)
  Write-Host "injected <base href=/chess/>"
}

# dedupe black piece files
Remove-Item (Join-Path $Dst "models\*_b.glb") -Force -ErrorAction SilentlyContinue

$sz = (Get-ChildItem $Dst -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
Write-Host ("synced -> {0}  ({1:N1} MB)" -f $Dst, $sz)
