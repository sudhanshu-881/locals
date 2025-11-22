@echo off
REM Git Commit Helper Script for Windows - Prevents hanging
REM Usage: git-commit-safe.bat "commit message" [--no-verify] [--push]

setlocal

set "MESSAGE=%~1"
set "NO_VERIFY=%~2"
set "PUSH=%~3"

REM Set environment to prevent editor from opening
set "GIT_EDITOR=true"
set "EDITOR=true"
set "VISUAL=true"

REM Configure git for non-interactive mode
git config core.editor "true" 2>nul
git config --global core.editor "true" 2>nul

REM Build commit command
set "COMMIT_CMD=git commit -m "%MESSAGE%""
if "%NO_VERIFY%"=="--no-verify" (
    set "COMMIT_CMD=%COMMIT_CMD% --no-verify"
)

REM Execute commit
echo Committing changes...
%COMMIT_CMD%

if %ERRORLEVEL% EQU 0 (
    echo Commit successful!
    
    if "%PUSH%"=="--push" (
        echo.
        echo Pushing to origin...
        git push origin main
        if %ERRORLEVEL% EQU 0 (
            echo Push successful!
        ) else (
            echo Push failed!
        )
    )
) else (
    echo Commit failed!
    exit /b 1
)

endlocal

