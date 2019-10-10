const { readText } = require('../tools')
const path = require('path')
const chalk = require('chalk')
const fs = require('fs-extra')
const modulesPath = path.resolve(__dirname,'./_module')
async function create (name){
    try {
        let content = await getModules()
        if(content.includes(name)){
            return console.log(chalk.red('添加模块失败：该模块已存在！'))
        }
        content.push(name)
        _update(content)
        console.log('添加模块成功:',name)
        console.log('当前模块:',content)
    } catch (error) {
        console.log('添加模块失败:',error)
    }
}
async function remove(name){
    try {
        let content = await getModules()
        content = content.filter(moduleName => moduleName !== name)
        _update(content)
        console.log('移除成功:',name)
        console.log('当前模块:',content)
    } catch (error) {
        console.log('移除失败:',error)
    }
}
//重命名一个模块
async function rename(sourceName,distName){

}
//获取当前模块列表
async function getModules(slient = true){
    let content
    if(!fs.existsSync(modulesPath)){
        fs.createFileSync(modulesPath)
        content = []
    }else{
        content = JSON.parse(readText(modulesPath) || "[]")
    }
    return content
}

//查看当前模块列表
async function list(slient = true){
    console.log(await getModules())
}

async function _update(content){
    fs.writeFileSync(
        modulesPath,
        JSON.stringify(content)
    )
}

module.exports = {
    list,
    getModules,
    create,
    remove,
    rename
}