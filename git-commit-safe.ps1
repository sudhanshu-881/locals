# Git Commit Helper Script - Prevents hanging in automated environments
# Usage: .\git-commit-safe.ps1 "commit message"

param(
    [Parameter(Mandatory=$true)]
    [string]$Message,
    
    [switch]$NoVerify,
    [switch]$Push
)

# Set environment variables to prevent editor from opening
$env:GIT_EDITOR = "true"
$env:EDITOR = "true"
$env:VISUAL = "true"

# Configure git to use non-interactive mode
git config core.editor "true" 2>$null
git config --global core.editor "true" 2>$null

# Build commit command
$commitCmd = "git commit -m `"$Message`""
if ($NoVerify) {
    $commitCmd += " --no-verify"
}

# Execute commit
Write-Host "Committing changes..." -ForegroundColor Cyan
$commitResult = Invoke-Expression $commitCmd

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Commit successful!" -ForegroundColor Green
    Write-Host $commitResult
    
    if ($Push) {
        Write-Host "`nPushing to origin..." -ForegroundColor Cyan
        $pushResult = git push origin main 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✓ Push successful!" -ForegroundColor Green
        } else {
            Write-Host "✗ Push failed:" -ForegroundColor Red
            Write-Host $pushResult
        }
    }
} else {
    Write-Host "✗ Commit failed:" -ForegroundColor Red
    Write-Host $commitResult
    exit 1
}

