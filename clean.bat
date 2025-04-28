@echo off
echo Cleaning up .next directory...
if exist .next (
  echo Removing .next directory...
  rd /s /q .next
)
echo Done!
