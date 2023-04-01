echo Clearing generated files by prisma
rmdir /Q /s generated
rmdir /Q /s node_modules
del package.json
del package-lock.json
echo Done!