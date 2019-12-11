# onlinestudytools

A repository for the online study tools webapp as part of the MAXIMISE revision service.

## For collaborators:

This is a really quick tutorial on how to set up development on the project:

-   Get Git Bash from https://git-scm.com/ and make sure to add Git to your PATH so that you can use it for the following steps. Check that writing `git` in the command line doesn"t give you an error.

-   Create/open the folder in which you want to do your development for this project. Then open the command line in that folder and write `git clone https://github.com/maximiseuk/onlinestudytools.git`. This creates a copy of the project on your computer.

-   Then write `cd onlinestudytools` to enter the project folder on your computer.

-   **To work on an issue/feature, make sure to create a new branch!** Do this by writing `git checkout -b my-feature-name`. This only creates the branch on your computer, not on the online version.

-   Then make your changes to the source code on your computer.

-   When you"re done implementing a fix or feature, you need to tell Git to include all your changed files in the next commit: `git add *`. In VSCode, you can just go to the Source Control tab (_the one with the branches_) and hover over the CHANGES section, and click the plus icon.

-   Next, you need to commit your changes. This is used to keep track of what changes are made over time. Do this by either writing `git commit` or using the Source Control tab in VSCode, where you can just click the tick button at the top. Enter a meaningful description for the changes you made.

-   Now you need to update the online version of the project. To do this, write `git push origin my-feature-name` where `my-feature-name` is the same as it was in the first step. This creates a branch in the online version of the project named `my-feature-name`.

-   Finally, submit a pull request for your changes from the new branch you just created to the master branch. If one other collaborator verifies that the changes are OK, then the changes can be merged into the master branch.

- When you want to make another change, *you need to ensure that your local project is synced with the online version*. You can do this by writing `git fetch origin`, then `git checkout master` and finally `git merge origin master`. This means that you don't need to use `git clone` every time you want to make a change. The rest of the steps above remain the same.

 - Once your pull request has been accepted *please* merge it ASAP, because if you wait too long the next pull request made my someone else may not be able to be merged as it will be made on an out of date version of the project.

## List of guidelines for code formatting

### Do:
 - Use double quotes instead os single quotes
 - Use camel case for all variables (First letter capitalised for Components, otherwise uncapitalised)
 - Use desctiptive variable names (e.g. circleRadius instead of size)
 - Comment your code where necessary
 - keep larger components in their own files
 - Use ES6 syntax where possible
 - Compact code nicely (not so its unreadable, but avoid loads of nested for loops or ugly stuff like that)
 - Use const for variables where possible and declare varialbes with one const and then each variable indented on a new line

### Don't:
 - Lines longer than 80 characters
 - Silly comments for obvious things
 - Functions that carry out more than one action
 - Overuse new lines
 - Put spaces at the end of lines
=======
- When you want to make another change, *you need to ensure that your local project is synced with the online version*. You can do this by writing `git fetch origin`, then `git checkout master` and finally `git merge origin master`. This means that you don"t need to use `git clone` every time you want to make a change. The rest of the steps above remain the same.
