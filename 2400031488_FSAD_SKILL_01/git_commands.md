# Git Skill Experiment Commands

## First commit

# Git Skill Experiment Commands

Start project & Git setup, andfiles and stage

First commit

```
git commit -m "Initial commit"
```

Merge both branches into main

```
git checkout main
git merge feature-update
git merge bug-fix
```

If conflict happens

```
git status
```

Open conflicted file, remove conflict markers, keep final content, then:

```
git add notes.txt
git commit -m "Resolve merge conflict"
```

Final check

```
git log --oneline --graph --all
git status
```
