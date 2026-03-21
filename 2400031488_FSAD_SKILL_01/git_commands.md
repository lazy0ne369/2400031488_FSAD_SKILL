# Git Skill Experiment Commands

## Using an existing project to demonstrate git commands

## Git setup, and files and push

### Go to your existing project folder(just as an example)
cd "D:\KLU\FullStack\react-workspace\reactmodel1"

### Initialize Git
git init

### Configure Git
git config --global user.name "lazy0ne369"

### Stage and commit your React project
git add .
git commit -m "Initial commit: Added project files"

### Connect to GitHub
git remote add origin https://github.com/lazy0ne369/myfsdpro.git

### Set main as branch
git branch -M main

### push
git push -u origin main --force

## For branch creation, updates, and merge

### Create & switch to 'feature' branch
git checkout -b feature-update

### Stage & commit -> README
git add README.md
git commit -m "Add a short project overview to README"

### Push 'feature' branch to GitHub
git push -u origin feature-update

### Switching back to main branch
git checkout main

### create & switch to 'bug-fix' branch
git checkout -b bug-fix

### Add a note about the fix
Add-Content Notes.txt "updated project notes ."

### Stage and commit the notes change
git add Notes.txt
git commit -m "Update notes with a small bug fix"

### Push 'bug-fix' branch to GitHub
git push -u origin bug-fix

### Switch back to the main branch
git checkout main

### Merge both branches into main
git merge feature-update
git merge bug-fix

### Final Push the updated main branch
git push origin main
