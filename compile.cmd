@echo off
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

rem from https://www.typescriptlang.org/tsconfig/
rem es3, es5, es6/es2015, es2016, es2017, es2018, es2019,
rem es2020, es2021, es2022, es2023, es2024, esnext 