(function() {
  const isMobile = (() => {
    var win = window
    var doc = win.document
    var docEl = doc.documentElement
    var width = docEl.getBoundingClientRect().width
    return width <= 540
  })()
  // 导航
  {
    const navDoms = {
      'home': document.getElementById('home'),
      'product': document.getElementById('product'),
      'our-mission': document.getElementById('our-mission'),
      'team-background': document.getElementById('team-background'),
      'investors': document.getElementById('investors'),
    }
  
    const offset = {
      'our-mission': -150,
      'team-background': -150,
      'investors': -150,
    }
  
    handleNav()
  
    function handleNav() {
      [...document.querySelectorAll('[data-to]')].forEach(
        nav => {
          nav.addEventListener('click', e => {
            const to = nav.getAttribute('data-to')
            scrollIntoView(navDoms[to], offset[to])
          })
        }
      )
    }
  
    function scrollIntoView(tarDom, offset) {
      if(!tarDom) {
        return
      }
      let top = getOffsetTop(tarDom);
      if (offset) {
          top = top + offset;
      }
      document.documentElement.scrollTo({
          top,
          behavior: 'smooth',
      });
    }

    // 移动端导航的处理
    if(isMobile) {
      const menuWrap = document.querySelector('.mobile-menu');
      [...document.querySelectorAll('.menu-handle, .mobile-menu-item-has-sub .mobile-menu-text')].forEach(item => {
        item.addEventListener('click', (e) => {
          item.parentNode.classList.toggle('unfold')
          e.stopPropagation()
        })
      });

      [...document.querySelectorAll('.mobile-menu-item')].forEach(item => {
        item.addEventListener('click', () => {
          menuWrap.classList.remove('unfold')
        })
      })
    }
  
    // 获取 dom 元素相对于 body 的高度
    function getOffsetTop(dom) {
      let totalTop = 0;
  
      while (dom.offsetParent) {
          totalTop += dom.offsetTop;
          dom = dom.offsetParent;
      }
  
      return totalTop;
    }
  }

  // 多语言
  const initI18n = (() => {
    let lang = localStorage.getItem('lang') || 'en'
    const currLangDom = document.getElementById('lang')

    let isShowLangOptions = false
    const selectDom = document.querySelector('.select')
    const selectedLangValueDom = document.querySelector('.select-value')
    const langOptions = document.querySelectorAll('.select-option')

    selectedLangValueDom && selectedLangValueDom.addEventListener('click', () => {
      if(!isShowLangOptions) {
        selectDom.classList.add('unfold')
      } else {
        selectDom.classList.remove('unfold')
      }
      isShowLangOptions = !isShowLangOptions
    })

    langOptions.forEach(dom => {
      dom.addEventListener('click', e => {
        setLanguage(dom.getAttribute('data-value'))
        selectDom.classList.remove('unfold')
        isShowLangOptions = false
      })
    });

    setLanguage(lang)

    currLangDom.addEventListener('click', () => {
      lang = lang === 'en' ? 'zh' : 'en'
      setLanguage(lang)
    })

    function setLanguage(lang = 'en') {
      localStorage.setItem('lang', lang)
      currLangDom.textContent = lang === 'en' ? 'EN' : '中'
      if(selectedLangValueDom) {
        selectedLangValueDom.textContent = lang === 'en' ? 'English' : '中文'
      }

      document.body.setAttribute('data-lang', lang)

      updateTextLanguage()
    }

    function updateTextLanguage () {
      const lang = localStorage.getItem('lang') || 'en'
      document.querySelectorAll('[data-i18n]').forEach(dom => {
        const key = dom.getAttribute('data-i18n')
        dom.textContent = window[lang][key]
      })
    }

    return {
      updateTextLanguage
    }
  })

  const {updateTextLanguage} = initI18n()

  // 移动端轮播
  {
    if(isMobile) {
      const list = ['upload-code', 'analysis-reports', 'detection-capability'].map((type, index) => {
        return {
          content: `
          <div class="product-feature-item ${type}">
              <div class="feature-h1" data-i18n="feature${index + 1}Title"></div>
              <div class="feature-h2" data-i18n="feature${index + 1}Des"></div>
            </div>
          `
        }
      })
      const slider = new iSlider({
        dom: document.getElementById('product-slide'),
        data: list,
        duration: 2000,
        isAutoplay: true,
        // isDebug: true,
        isLooping: true,
        // isOverspread: true, // 让图片平铺整个浏览器屏幕
        plugins: ['dot', 'button']
      });

      updateTextLanguage()
      slider.on('slideChanged', () => {
        updateTextLanguage()
      })

    }
  }
})()