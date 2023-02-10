# Git

# 常用命令

> 配置用户信息

    git config --global user.name "Your Name" #配置用户名            
    git config --global user.email "email@example.com"  #配置邮箱
    git config --list #查看配置信息
    git config user.name 'lx01582452'
    git config user.email 'lx01582452@alibaba-inc.com'

> 克隆远程仓库指定分支

    git clone -b daily/3.17.0 http://gitlab.alibaba-inc.com/oss/ossnext.git
    # -b [分支名称]

> 创建并切换到指定开发分支

    git checkout -b lixiang/fix/dev/45934669

> 提交工作区代码到暂存区

    git add .

> 提交暂存区代码到版本库（提交之前配置邮箱）

    git commit -m 'fix: to #45934669'

> 本地分支推送到远程仓库

    git push origin lixiang/fix/dev/46289193

> 删除本地指定分支

    git branch -D lixiang/fix/dev/46453415

> 对比工作区和暂存区的文件差异

    git status

> 对比工作区和暂存区的代码差异

    git diff

> 撤销 commit

    git reset --soft HEAD^ # --soft(不删除工作区改动的代码，仅撤销commit，不撤销add)
    git reset --hard HEAD^ # --hard(删除工作区改动的代码，同时撤销commit和add)
    
    # HEAD^ 表示上一个版本，即上一次的commit，几个^代表几次提交，如果回滚两次就是HEAD^^ 
    # 或者写成HEAD~1，如果进行两次的commit，想要都撤回，可以使用HEAD~2。

> [**使用场景**](https://blog.csdn.net/Aqu415/article/details/126676557)：

> 1. 执行git commit之后，发现之前改动的文件中还有地方需要修改，但是不想重新再生成新的提交记录。二次修改完成，执行git add .后， 使用git commit --amend来替代git commit -m '描述信息',这样一来就不会生成新的提交记录。

> 2. 修改git commit -m '描述信息'的描述信息

    git commit --amend 

> 更新本地代码

    git checkout develop #step1：从开发分支切换到主分支
    git pull #step2：拉取主分支上的最新代码
    git checkout lixiang/fix/dev/45934669 #step3:切换回自己的开发分支
    git merge develop #step4：合并主分支上的代码，[处理冲突]

> 切换到同事的分支报错

    git checkout xxx
    # 错误信息：error: pathspec 'XXX' did not match any file(s) known to git
    
    # 解决：
    # 1.查看本地的所有的分支中是否有同事新创建的分支：
    git branch -a
    # 2.如果没看到，那么执行以下操作，这步是获取所有分支
    git fetch
    # 3.再次查看本地分支
    git branch -a
    # 4.切换到同事分支
    git checkout xxx