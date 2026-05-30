# Extract individual collage elements from black-background sprite sheets
param(
  [string]$ElementDir = (Join-Path (Split-Path $PSScriptRoot -Parent) "element"),
  [string]$OutDir = (Join-Path (Split-Path $PSScriptRoot -Parent) "element\slices"),
  [int]$BlockSize = 32,
  [int]$MinBlockCount = 4,
  [int]$Padding = 8
)

Add-Type -AssemblyName System.Drawing

$Sheets = @(
  "0BA9A553848CBE4E65016C9F04BB1B06.png",
  "3A4DC7C1D22BA36AD40B5C5F78B04120.png",
  "D5EE22C16285FC6214C2C3FD1D2267AB.png",
  "DBE77B1CDF4EE9DCCC1EB70B3278846A.png"
)

function Test-ContentPixel($color) {
  return ($color.R + $color.G + $color.B) -gt 72
}

function Get-BlockGrid($bmp) {
  $w = $bmp.Width
  $h = $bmp.Height
  $cols = [math]::Ceiling($w / $BlockSize)
  $rows = [math]::Ceiling($h / $BlockSize)
  $grid = New-Object 'bool[,]' $rows, $cols

  for ($by = 0; $by -lt $rows; $by++) {
    for ($bx = 0; $bx -lt $cols; $bx++) {
      $x0 = $bx * $BlockSize
      $y0 = $by * $BlockSize
      $x1 = [math]::Min($x0 + $BlockSize, $w) - 1
      $y1 = [math]::Min($y0 + $BlockSize, $h) - 1
      $hits = 0
      $total = 0
      for ($y = $y0; $y -le $y1; $y++) {
        for ($x = $x0; $x -le $x1; $x++) {
          $total++
          if (Test-ContentPixel $bmp.GetPixel($x, $y)) { $hits++ }
        }
      }
      if ($hits / [math]::Max($total, 1) -gt 0.06) {
        $grid[$by, $bx] = $true
      }
    }
  }
  return ,@($grid, $rows, $cols, $w, $h)
}

function Get-Regions($grid, $rows, $cols) {
  $visited = New-Object 'bool[,]' $rows, $cols
  $regions = New-Object System.Collections.Generic.List[object]

  for ($by = 0; $by -lt $rows; $by++) {
    for ($bx = 0; $bx -lt $cols; $bx++) {
      if (-not $grid[$by, $bx] -or $visited[$by, $bx]) { continue }
      $stack = New-Object System.Collections.Stack
      $stack.Push("${by},${bx}")
      $visited[$by, $bx] = $true
      $minY = $by; $maxY = $by; $minX = $bx; $maxX = $bx
      $count = 0
      while ($stack.Count -gt 0) {
        $parts = ($stack.Pop() -split ',')
        $cy = [int]$parts[0]
        $cx = [int]$parts[1]
        $count++
        if ($cy -lt $minY) { $minY = $cy }
        if ($cy -gt $maxY) { $maxY = $cy }
        if ($cx -lt $minX) { $minX = $cx }
        if ($cx -gt $maxX) { $maxX = $cx }
        foreach ($key in @(
          "$($cy - 1),$cx",
          "$($cy + 1),$cx",
          "$cy,$($cx - 1)",
          "$cy,$($cx + 1)"
        )) {
          $np = $key -split ','
          $ny = [int]$np[0]
          $nx = [int]$np[1]
          if ($ny -lt 0 -or $ny -ge $rows -or $nx -lt 0 -or $nx -ge $cols) { continue }
          if (-not $grid[$ny, $nx] -or $visited[$ny, $nx]) { continue }
          $visited[$ny, $nx] = $true
          $stack.Push("${ny},${nx}")
        }
      }
      if ($count -ge $MinBlockCount) {
        $regions.Add([pscustomobject]@{ MinY = $minY; MaxY = $maxY; MinX = $minX; MaxX = $maxX; Blocks = $count })
      }
    }
  }
  return $regions
}

function Save-Region($bmp, $region, $imgW, $imgH, $destPath) {
  $x0 = [math]::Max(0, $region.MinX * $BlockSize - $Padding)
  $y0 = [math]::Max(0, $region.MinY * $BlockSize - $Padding)
  $x1 = [math]::Min($imgW - 1, ($region.MaxX + 1) * $BlockSize + $Padding - 1)
  $y1 = [math]::Min($imgH - 1, ($region.MaxY + 1) * $BlockSize + $Padding - 1)
  $rw = $x1 - $x0 + 1
  $rh = $y1 - $y0 + 1
  if ($rw -lt 40 -or $rh -lt 40) { return $false }

  $out = [System.Drawing.Bitmap]::new($rw, $rh, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($out)
  $g.Clear([System.Drawing.Color]::FromArgb(0, 0, 0, 0))

  for ($y = 0; $y -lt $rh; $y++) {
    for ($x = 0; $x -lt $rw; $x++) {
      $src = $bmp.GetPixel($x0 + $x, $y0 + $y)
      if (Test-ContentPixel $src) {
        $out.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $src.R, $src.G, $src.B))
      }
    }
  }
  $g.Dispose()
  $out.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $out.Dispose()
  return $true
}

if (-not (Test-Path $OutDir)) { New-Item -ItemType Directory -Path $OutDir | Out-Null }

$manifest = @()
foreach ($sheet in $Sheets) {
  $src = Join-Path $ElementDir $sheet
  if (-not (Test-Path $src)) { Write-Warning "Missing $src"; continue }
  $prefix = [System.IO.Path]::GetFileNameWithoutExtension($sheet).Substring(0, 8).ToLower()
  Write-Host "Processing $sheet ..."
  $bmp = [System.Drawing.Bitmap]::FromFile($src)
  $info = Get-BlockGrid $bmp
  $grid = $info[0]; $rows = $info[1]; $cols = $info[2]; $w = $info[3]; $h = $info[4]
  $regions = Get-Regions $grid $rows $cols
  $sorted = $regions | Sort-Object { $_.Blocks } -Descending
  $idx = 0
  foreach ($region in $sorted) {
    if ($idx -ge 14) { break }
    $name = "${prefix}_${idx}.png"
    $dest = Join-Path $OutDir $name
    if (Save-Region $bmp $region $w $h $dest) {
      $manifest += [pscustomobject]@{ file = "element/slices/$name"; sheet = $prefix; index = $idx }
      $idx++
    }
  }
  $bmp.Dispose()
  Write-Host "  -> $idx slices"
}

$manifest | ConvertTo-Json -Depth 3 | Set-Content (Join-Path $OutDir "manifest.json") -Encoding UTF8
Write-Host "Done. Output: $OutDir"
