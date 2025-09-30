@echo off
rem version 2025-09-13
echo.
date /t
time /t
ver
echo.
echo TypeScript compiler
call tsc --version
echo.
echo tsc celestra.browser.ts --strict --declaration --declarationMap --allowJs --checkJs --pretty --diagnostics --removeComments --target ESNEXT --lib ESNEXT,DOM,DOM.iterable,DOM.asynciterable,ESNext.Iterator,webworker.importscripts
echo.
call tsc celestra.browser.ts --strict --declaration --declarationMap --allowJs --checkJs --pretty --diagnostics --removeComments --target ESNEXT --lib ESNEXT,DOM,DOM.iterable,DOM.asynciterable,ESNext.Iterator,webworker.importscripts
echo.
pause
echo.
echo tsc celestra.node.mts --strict --declaration --declarationMap --allowJs --checkJs --pretty --diagnostics --removeComments --target ESNEXT --lib ESNEXT,DOM,DOM.iterable,DOM.asynciterable,ESNext.Iterator,webworker.importscripts
echo.
call tsc celestra.node.mts --strict --declaration --declarationMap --allowJs --checkJs --pretty --diagnostics --removeComments --target ESNEXT --lib ESNEXT,DOM,DOM.iterable,DOM.asynciterable,ESNext.Iterator,webworker.importscripts
echo.
pause