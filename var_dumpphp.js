// jshint esversion: 6, multistr: true
// ------------------------------------------------------
// custom style for var_dump() with php extension xdebug2
// https://github.com/und3rdg/var_dump_php
// https://xdebug.org
// ------------------------------------------------------

export default function var_dump_php(){
  "use strict"
  const nodeList = document.querySelectorAll('.xdebug-var-dump')
  if(!nodeList.length){ return } // if there is nothing to do, fck off

  const option = {
    transformation : '.6s cubic-bezier(0.5, 0, 0, 1)',
    btnWidth       : '25px',
    wrapColor      : '#e9ebed',
    wrapBgColor    : '#000d',
    btnColor       : '#aaa2',
    openTxt        : '<',
    closeTxt       : '>'
  }
  const container = document.createElement('div')
  function createContainer(){
    container.classList.add('var_dump___container')

    container.style.position      = "absolute"
    container.style.zIndex        = '9999999'
    container.style.top           = "0"
    container.style.left          = "0"
    container.style.width         = "100%"
    container.style.display       = "flex"
    container.style.flexDirection = "column"
    container.style.alignItems    = "flex-start"
    container.style.margin        = '10px 0'

    nodeList.forEach(pre => pre.style.width = `calc(100% - ${option.btnWidth})`)
    document.body.appendChild(container)
  }


  function moveToContainer(el){
    const wrap = container.appendChild(document.createElement('div'))
    wrap.classList.add('var_dump___wrap') // not really needed, more for debuging
    wrap.appendChild(el)

    wrap.style.boxSizing      = 'border-box'
    wrap.style.width          = '100%'
    wrap.style.margin         = '10px 0'
    wrap.style.color          = option.wrapColor
    wrap.style.background     = option.wrapBgColor
    wrap.style.display        = 'flex'
    wrap.style.justifyContent = "space-between"
    wrap.style.overflow       = 'hidden'
    wrap.style.transition     = option.transformation
    el.style.transition       = option.transformation

    const btn = createBtn()
    wrap.prepend(btn)

    // maybe it eventListner should by in createBtn, but here i have easy access to variables
    btn.addEventListener('click',(e)=>{
      e.preventDefault()
      const isOpen = btn.innerText === option.openTxt
      if(isOpen){
        hideSingle(btn, wrap, el)
        return
      } 
      showSingle(btn, wrap, el)
    })
  }

  function createBtn(){
    var btn = document.createElement('div')
    btn.classList.add('var_dump___btn') // not really needed, more for debuging
    btn.innerText = option.openTxt

    btn.style.width          = option.btnWidth
    btn.style.background     = option.btnColor
    btn.style.fontSize       = `calc(${option.btnWidth} * 0.8)`
    btn.style.margin         = '0 20px 0 0'
    btn.style.cursor         = 'pointer'
    btn.style.display        = 'flex'
    btn.style.justifyContent = 'center'
    btn.style.alignItems     = 'center'

    return btn
  }


  function hideSingle(btn, wrap, el){
    btn.innerText    = option.closeTxt
    btn.style.margin = '0'

    wrap.style.width = option.btnWidth
    el.style.width   = '0px'

    el.style.visibility = 'hidden'
    el.style.opacity    = '0'
  }

  function showSingle(btn, wrap, el){
    btn.innerText    = option.openTxt
    btn.style.margin = '0 20px 0 0'

    wrap.style.width = '100%'
    el.style.width   = '100%'

    el.style.visibility = 'visible'
    el.style.opacity    = '1'
  }


  createContainer()
  nodeList.forEach(moveToContainer)
}


