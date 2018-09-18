// jshint esversion: 6, multistr: true
// ------------------------------------------------------
// custom style for var_dump() with php extension xdebug2
// https://xdebug.org
// ------------------------------------------------------

export default function var_dump(){
  "use strict"
  let nodeList = document.querySelectorAll('.xdebug-var-dump')
  if(!nodeList){ return }

  const margin = 5

  function setStyle(item){
    item.style.position   = 'absolute'
    item.style.left       = '50%'
    item.style.transform  = 'translate(-50%, 0)'
    item.style.height     = 'auto'
    item.style.width      = '90vw'
    item.style.padding    = '10px'
    item.style.color      = '#e9ebed'
    item.style.background = 'rgba(0,0,0,0.85)'
    item.style.zIndex     = '9999999'
  }

  function setPosition(top, item){
    setStyle(item)
    item.style.top = top + 'px'
    top += item.offsetHeight + margin
    item.addEventListener('click',(e)=>{
      e.preventDefault()
      item.style.display = "none"
    })
    return top
  }


  function nodeListToArray(nodeList){
    var i = nodeList.length
    var arr = new Array(i)
    while(i--){ arr[i] = nodeList[i] }
    return arr
  }

  nodeListToArray(nodeList).reduce(setPosition, 0)
}

document.addEventListener('DOMContentLoaded', var_dump, false);

