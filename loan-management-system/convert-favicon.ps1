# PowerShell script to convert PNG to ICO
Add-Type -AssemblyName System.Drawing

# Load the PNG image
$pngPath = "C:\San loan\loan-management-system\public\favicon.png"
$icoPath = "C:\San loan\loan-management-system\public\favicon.ico"

try {
    # Load the image
    $image = [System.Drawing.Image]::FromFile($pngPath)
    
    # Create a new bitmap with 32x32 size for favicon
    $bitmap = New-Object System.Drawing.Bitmap(32, 32)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.DrawImage($image, 0, 0, 32, 32)
    
    # Save as ICO
    $bitmap.Save($icoPath, [System.Drawing.Imaging.ImageFormat]::Icon)
    
    Write-Host "Successfully converted PNG to ICO"
    
    # Clean up
    $graphics.Dispose()
    $bitmap.Dispose()
    $image.Dispose()
} catch {
    Write-Host "Error converting image: $($_.Exception.Message)"
}