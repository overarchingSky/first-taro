require('shelljs/global')
const ora = require('ora')
const fs = require('fs-extra')
const handlebars = require('handlebars')
const path = require('path')
const inquirer = require('inquirer')
const config = require('./config')
const moduleControl = require('../module')
const prefix = config.prefix
// 导入选项配置
const { readText, nameFormat } = require('../tools')
//读取templates目录中文件、目录
const tmps = fs.readdirSync(path.resolve(__dirname, './templates'))
async function buildQuestion(type){
  const moduleList = ["none",...await moduleControl.getModules()]
  return [
    {
      type: 'list',
      name: 'type',
      message: '请选择组件类型',
      default:type,
      choices: tmps,
      when (data) {
        return type === 'undefined' || type === 'null'
      }
    },
    {
      type: 'list',
      name: 'moduleName',
      message: '选择所属模块',
      default:'',
      choices: moduleList,
      when (data) {
        return config.useModule
      }
    },
    {
    type: 'input',
    name: 'dir',
    message: '请输入组件名称/路径:',
    validate: function (value) {
      if (/^[\-a-z\/]+$/.test(value)) {
        return true
      }
      return '组件名称只能包含小写字母、横杠(-)以及/!'
    }
    },
    {
      type: 'confirm',
      name: 'createViewAndPushToRouter',
      message: '是否生成view并更新到路由？',
      default: false
    }]
}


let sourceFiles

let spinner
async function createTemp (componentType) {
  if(!tmps.includes(componentType)){
    console.log(`模板${componentType}不存在！`)
    exit(0)
  }
  // 生成问题配置
  const promps = await buildQuestion(componentType)
  // 模板类型,模板名称
  let { dir, isForm, type,moduleName,createViewAndPushToRouter } = await inquirer.prompt(promps)
  componentType = componentType || type
  if(moduleName === 'none'){
    moduleName = ''
  }
  const tempDir = path.resolve(__dirname, `./templates/${componentType}`)
  const tmpFiles = fs.readdirSync(tempDir)

  try {
    spinner = ora('开始创建组件模板').start()
    createTemplate(tmpFiles,tempDir,dir, moduleName,createViewAndPushToRouter)
  } catch (error) {
    spinner.fail(`组件 ${dir} 的目录结构创建失败,错误信息如下:`)
    console.error(error)
  }
}

async function addViewToRouter (name,moduleName) {
  // 更新router
  const routerPath = path.resolve(config.router)
  let routerConf = readText(routerPath)
  let ctxArr = routerConf.split('\n').filter(item => !!item.replace(/\s/g, ''))//根据行拆分成数组，并过滤掉空行
  let  routerEntryInsertRowIndex = ctxArr.findIndex((row, index) => {
    return (row.trim() + ctxArr[index + 1]).replace(/\s/g, '') === ']})'
  })
  //生成模块化router
  if(moduleName){
    //检查router模块文件是否存在，如果不存在，则创建
    const routerModulePath = path.resolve(config.router,'../modules',`${moduleName}.js`)
    if(!fs.existsSync(routerModulePath)){
      fs.createFileSync(routerModulePath)
      fs.writeFileSync(routerModulePath,`export default [

]`)
      //在router主配置文件中引入router模块文件
      
      let reverseIndex = [...ctxArr].reverse().findIndex(row => {
        return /\.{3}require\('\.\/modules\/.*\)/.test(row)
      })
      if(reverseIndex > -1){
        routerEntryInsertRowIndex = ctxArr.length - reverseIndex
      }else{
        routerEntryInsertRowIndex = ctxArr.findIndex((row,index) => {
          //此处的算法，需要保证routes:和[符号中间不能有空行，这点已经在前面拆分文件内容为数组时做了
          return /routes:\[.*/.test(((ctxArr[index - 1] || '') + row).replace(/\s/g,''))
        })
      }
      if(/\.{3}require\('\.\/modules\/.*\)/.test(ctxArr[routerEntryInsertRowIndex - 1].trim())){
        ctxArr[routerEntryInsertRowIndex - 1] += ','
      }
      ctxArr.splice(routerEntryInsertRowIndex,0,`       ...require('./modules/${moduleName}')`)
      fs.writeFileSync(
        routerPath,
        ctxArr.join('\n')
      )
    }
    //将新的路由信息写入路由模块中
    //step-1 将文件根据行，拆分成数组
    let ctx = await readText(routerModulePath)
    console.log('module ctx',ctx)
    let moduleCtxRows = ctx.split('\n').filter(item => !!item.replace(/\s/g, ''))
    //step-2 根据文件最后一行，或最后两行加在一起的结果是否等于'}]'，取得准备写入的行号
    let moduleInsertRowIndex = moduleCtxRows.findIndex((row, index) => {
      return ((moduleCtxRows[index - 1] || '').replace(/\s/g, '') + row.trim()) === '}]'
    }) || 1//这里取1，是为了处理新建模块文件时，还没有写入过路由配置的情况，这种情况，上面一行代码匹配不到
    if(/[^\}]*\}/.test((moduleCtxRows[moduleInsertRowIndex - 1] || '').trim())){
      moduleCtxRows[moduleInsertRowIndex - 1] += ','
    }
    //step-3 保存到数组中
    moduleCtxRows.splice(moduleInsertRowIndex, 0, `    {
      path: '/${moduleName}/${name}',
      name: '${moduleName}-${name}',
      component: resolve => require(['${path.join('views',moduleName,name)}'], resolve),
      meta: { view: 'defaultView' }
    }`)
    //step-4 合并数组成字符串，并写入文件
    fs.writeFileSync(
      routerModulePath,
      moduleCtxRows.join('\n')
    )
  }else{
    if(/[^\}]*\}|\.{3}require\(.*\)/.test(ctxArr[routerEntryInsertRowIndex - 1].trim())){
      ctxArr[routerEntryInsertRowIndex - 1] += ','
    }
    ctxArr.splice(routerEntryInsertRowIndex, 0, `    {
      path: '/${name}',
      name: '${name}',
      component: resolve => require(['${path.join('views',name)}'], resolve),
      meta: { view: 'defaultView' }
    }`)
    let newCtx = ctxArr.join('\n')
    fs.writeFileSync(routerPath, newCtx)
  }
}

/**
 * 新建模板
 * @param {String} name 模板名称
 * @param {Boolean} needView 是否生成组件配置文件
 */
function createTemplate (tempFiles,tempDir,dir, moduleName,needView) {
  let arr = dir.split('/')
  // 组件名称
  let name = arr.splice(arr.length - 1, 1)[0]
  const fullName = prefix ? `${prefix}-${name}` : name
  let compPath
  compPath = path.resolve(config.cmoponentsOutputPath,moduleName,dir)

  const viewPath = path.resolve(config.viewOuputPath,moduleName,`${name}.vue`)
  // 目标文件map
  const distFiles = {
    
  }
  tempFiles.forEach(file => {
    distFiles[file] = path.resolve(compPath, file)
  })
  if (needView && fs.existsSync(viewPath)) {
    return spinner.fail(`views/${name} 已经存在,无法创建`)
  }
  if (fs.existsSync(compPath)) {
    spinner.fail(`components/${dir} 已经存在,无法创建`)
  } else {
    let data = {
      componentName:fullName,
      humpComponentName: nameFormat(fullName),
      componentDir:path.join(moduleName,dir)
    }
    Object.keys(distFiles).forEach(fileName => {
      let tmp = readText(path.resolve(tempDir,fileName))
      fs.createFileSync(distFiles[fileName])
      fs.writeFileSync(
        distFiles[fileName],
        handlebars.compile(tmp)(data)
      )
    })

    // 生成view并更新到router
    if (needView) {
      const componentName = moduleName ? `${moduleName}-${fullName}` : fullName
      let data = {
        componentName,
        humpComponentName: nameFormat(componentName),
        componentDir:path.join(moduleName,dir)
      }
      // 输出view文件
      const content = `<template>
  <{{componentName}} class="{{componentName}}__page"></{{componentName}}>
</template>

<script>
import {{humpComponentName}} from 'cps/{{componentDir}}/withData'
export default {
  name: '{{componentName}}__view',
  components: {
    '{{componentName}}': {{humpComponentName}}
  }
}
</script>
      `
      fs.createFileSync(viewPath)
      fs.writeFileSync(
        viewPath,
        handlebars.compile(content)(data)
      )
      // 添加到router中
      addViewToRouter(name,moduleName)
    }

    spinner.succeed(`组件 ${name} 的目录结构已完成初始化`)
  }
}

module.exports =  createTemp
