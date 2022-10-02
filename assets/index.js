(function() {
  // 导航
  {
    const navDoms = {
      'home': document.getElementById('home'),
      'product': document.getElementById('product'),
      'about-us': document.getElementById('about-us'),
      'team-background': document.getElementById('team-background'),
      'investors': document.getElementById('investors'),
    }
  
    const offset = {
      'about-us': -150,
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
  {
    let lang = localStorage.getItem('lang') || 'en'
    const currLangDom = document.getElementById('lang')

    let isShowLangOptions = false
    const selectDom = document.querySelector('.select')
    const selectedLangValueDom = document.querySelector('.select-value')
    const langOptions = document.querySelectorAll('.select-option')

    selectedLangValueDom.addEventListener('click', () => {
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
      selectedLangValueDom.textContent = lang === 'en' ? 'English' : '中文'

      document.body.setAttribute('data-lang', lang)

      document.querySelectorAll('[data-i18n]').forEach(dom => {
        const key = dom.getAttribute('data-i18n')
        dom.textContent = window[lang][key]
      })
    }
  }
})()