## git operations

```bash
git branch -va

# original setup of dev branch: 
git pull
git checkout -b openai origin/main
git push -u origin openai

# bring branch up to date
git checkout my-branch
git merge main (if out of date)

# commit and push
git add -A
git commit -m "my updates"
git push origin br-updates

```