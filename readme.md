约定：
- 统一使用react hooks风格开发
优化项：
- 添加Auth模块，提供统一的多端登录以及获取用户信息类
- 封装通用的request模块
- 添加一系列通用工具方法（src/utils/）
- 拓展cli，支持通过.env、.env.***的方式配置环境参数
*注：在项目中使用的环境变量，必须以TARO_APP_为前缀，如：TARO_APP_API否则，将只能在构建期间访问*
- 优化git commit 格式
- 自动生成changeLog
- 使用lint-staged只检查当前改动文件格式
- 测试覆盖率以及报告https://www.kancloud.cn/sllyli/npm-script/1243454 nyc

开发流程说明：
- 代码提交 统一使用yarn commit提交代码

commit选项说明：
feat 新功能
fix Bug 修复
docs 文档更新
style 代码的格式，标点符号的更新
refactor 代码重构
perf 性能优化
test 测试更新
build 构建系统或者包依赖更新
ci CI 配置，脚本文件等更新
chore 非 src 或者 测试文件的更新
revert commit 回退