;(function () {
  var win = window
  var doc = win.document
  var docEl = doc.documentElement
  var tid

  function refreshRem () {
    // console.log('refresh rem')

    var width = docEl.getBoundingClientRect().width
    if (width > 540) {
      // 最大宽度
      width = 540
    }
    var rem = width / 3.2
    docEl.style.fontSize = rem + 'px'
  }

  win.addEventListener(
    'resize',
    function () {
      clearTimeout(tid)
      tid = setTimeout(refreshRem, 300)
    },
    false
  )

  win.addEventListener(
    'pageshow',
    function (e) {
      if (e.persisted) {
        clearTimeout(tid)
        tid = setTimeout(refreshRem, 300)
      }
    },
    false
  )

  refreshRem()
})()