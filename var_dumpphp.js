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
    container.style.alignItems    = "flex-end"
    container.style.margin        = '10px 0'

    document.body.appendChild(container)
  }


  function moveToContainer(el){
    const wrap = container.appendChild(document.createElement('div'))
    wrap.classList.add('var_dump___wrap') // not really needed, but I feel is should stay
    wrap.appendChild(el)

    wrap.style.boxSizing      = 'border-box'
    wrap.style.width          = '100%'
    wrap.style.margin         = '10px 0'
    wrap.style.padding        = '0px'
    wrap.style.paddingLeft    = '20px'
    wrap.style.color          = '#e9ebed'
    wrap.style.background     = '#000d'
    wrap.style.display        = 'flex'
    wrap.style.justifyContent = "space-between"
    wrap.style.overflow       = 'hidden'
    wrap.style.transition     = '.6s cubic-bezier(0.5, 0, 0, 1)'
    el.style.transition       = '.6s cubic-bezier(0.5, 0, 0, 1)'

    const btn = createBtn()
    wrap.appendChild(btn)

    // maybe it eventListner should by in createBtn, but here i have easy access to variables
    btn.addEventListener('click',(e)=>{
      e.preventDefault()
      const isOpen = btn.innerText === '>'
      if(isOpen){
        hideSingle(btn, wrap, el)
        return
      } 
      showSingle(btn, wrap, el)
    })
  }

  function createBtn(){
    var btn = document.createElement('div')
    btn.innerText = '>'

    btn.style.width          = "20px"
    btn.style.background     = '#aaa1'
    btn.style.fontSize       = '14px'
    btn.style.display        = 'flex'
    btn.style.justifyContent = 'center'
    btn.style.alignItems     = 'center'

    return btn
  }


  function hideSingle(btn, wrap, el){
    btn.innerText = '<'

    wrap.style.width       = '20px'
    wrap.style.paddingLeft = '0px' // box-border so it is needed
    el.style.width         = '0px'

    el.style.visibility = 'hidden'
    el.style.opacity    = '0'
  }

  function showSingle(btn, wrap, el){
    btn.innerText = '>'

    wrap.style.width       = '100%'
    wrap.style.paddingLeft = '20px'
    el.style.width         = '100%'

    el.style.visibility = 'visible'
    el.style.opacity    = '1'
  }


  createContainer()
  nodeList.forEach(moveToContainer)
}

document.addEventListener('DOMContentLoaded', var_dump_php, false);

