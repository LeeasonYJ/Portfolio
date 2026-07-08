  // --------------Nav scroll-----------------
  const navAbout = document.querySelector('.nav a[href="#about"]');
  const navWork = document.querySelector('.nav a[href="#work"]');
  const aboutSection = document.getElementById('about');
  const workSection = document.getElementById('work');
 
  function updateNav(){
    const scrollY = window.scrollY + 200;
    const aboutTop = aboutSection.offsetTop;
    const workTop = workSection.offsetTop;
 
    // 모든 active 해제
    navAbout.classList.remove('active');
    navWork.classList.remove('active');
 
    // 현재 스크롤 위치에 따라 active 적용
    if(scrollY >= workTop){
      navWork.classList.add('active');
    } else if(scrollY >= aboutTop){
      navAbout.classList.add('active');
    }
    // cover 영역에서는 둘 다 비활성
  }
 
  window.addEventListener('scroll', updateNav);
 
  // 클릭 시에도 즉시 active 적용 (스크롤 이동 중 지연 방지)
  navAbout.addEventListener('click', function(){
    navAbout.classList.add('active');
    navWork.classList.remove('active');
  });
  navWork.addEventListener('click', function(){
    navWork.classList.add('active');
    navAbout.classList.remove('active');
  });



// ----------------cover title 타이핑 효과------------
  const files = [
    'images/title_text/P.png','images/title_text/O.png','images/title_text/R.png',
    'images/title_text/T.png','images/title_text/F.png','images/title_text/O.png',
    'images/title_text/L.png','images/title_text/I.png','images/title_text/O.png'
  ];
  const area = document.getElementById('typedArea');
  const maxRepeats = 3;
  let repeatCount = 0;
  let idx = 0;
 
  function typeForward(){
    if(idx < files.length){
      const img = document.createElement('img');
      img.src = files[idx];
      img.alt = '';
      area.appendChild(img);
      idx++;
      setTimeout(typeForward, 100 + Math.random() * 60);
    } else {
      repeatCount++;
      if(repeatCount < maxRepeats){
        setTimeout(typeBackward, 800);
      }
      // 3회 완료 시 글자 유지, 아무 동작 없이 종료
    }
  }
 
  function typeBackward(){
    const imgs = area.querySelectorAll('img');
    if(imgs.length > 0){
      area.removeChild(imgs[imgs.length - 1]);
      setTimeout(typeBackward, 50);
    } else {
      idx = 0;
      setTimeout(typeForward, 400);
    }
  }
 
  setTimeout(typeForward, 600);


  //------------- main case sub nav ----------------
  document.addEventListener('DOMContentLoaded', () => {
    const subNav = document.getElementById('subVerticalNav');
    const mainCaseStudy = document.getElementById('maincasestudy');
    const subSections = document.querySelectorAll('#main1, #main2, #main3');
    const navDots = document.querySelectorAll('.nav-dot');

    // 1. maincasestudy 구역 진입 및 이탈 감지 관찰자 생성
    const areaObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                subNav.classList.add('is-active');
            } else {
                subNav.classList.remove('is-active');
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 /* 해당 영역이 10% 이상 보일 때 활성화 */
    });

    if (mainCaseStudy) {
        areaObserver.observe(mainCaseStudy);
    }

    // 2. 내부 구역(main1, main2, main3) 활성화 상태 연동 관찰자 생성
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetId = entry.target.id;
                navDots.forEach(dot => {
                    if (dot.getAttribute('data-target') === targetId) {
                        dot.classList.add('is-current');
                    } else {
                        dot.classList.remove('is-current');
                    }
                });
            }
        });
    }, {
        root: null,
        rootMargin: '-30% 0px -60% 0px' /* 뷰포트 중앙 기준 감지 영역 조율 */
    });

    subSections.forEach(section => sectionObserver.observe(section));

    // 3. 클릭 시 부드러운 스크롤 이동 기능 바인딩
    navDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSelector = dot.getAttribute('href');
            const targetElement = document.querySelector(targetSelector);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});


//--------------inprogress & miniproject & footer top 값 계산 ----------------
$(function () {
    var mcHeight = $('#maincasestudy').outerHeight();
    $('#inprogress').css('top', mcHeight + 'px');

    var ipHeight = $('#inprogress').outerHeight();
    $('#miniproject').css('top', (mcHeight + ipHeight) + 'px');

    var mpHeight = $('#miniproject').outerHeight();
    $('#footer').css('top', (mcHeight + ipHeight + mpHeight) + 'px');
});


//---------------- open-btn popup(modal) ----------------

const popupOverlay = document.getElementById('popupOverlay');
const popupBox     = document.getElementById('popupBox');
const popupContent = document.getElementById('popupContent');

function openPopup(name){
  // 닫기 애니메이션 도중 다시 열 경우 : 진행 중이던 퇴장 상태를 취소
  popupOverlay.classList.remove('closing');

  // 타입 공통 클래스(popup--mockup)와 개별 커스텀용 클래스(popup--duck-mockup)를 함께 부여
  const type = name.split('-').pop();
  popupBox.className = `popup popup--${type} popup--${name}`;

  // 해당 팝업의 template 내용을 복제해서 삽입 (없으면 비워둠)
  const tpl = document.getElementById('popup-' + name);
  if (tpl) popupContent.replaceChildren(tpl.content.cloneNode(true));
  else popupContent.replaceChildren();

  popupOverlay.classList.add('open');   // .open이 붙으면서 CSS의 slide-in 애니메이션 시작
  document.body.style.overflow = 'hidden';   // 팝업이 열린 동안 뒤 페이지 스크롤 잠금
}

function closePopup(){
  // 이미 닫혔거나 퇴장 애니메이션 진행 중이면 무시 (연타 방지)
  if (!popupOverlay.classList.contains('open') || popupOverlay.classList.contains('closing')) return;

  // 1단계 : .closing을 붙여 slide-out 애니메이션 시작 (오버레이는 그대로 유지)
  popupOverlay.classList.add('closing');

  // 2단계 : 퇴장 애니메이션이 끝난 뒤에 오버레이까지 숨김
  popupBox.addEventListener('animationend', () => {
    // 퇴장 도중 openPopup으로 취소된 경우엔 아무것도 하지 않음
    if (!popupOverlay.classList.contains('closing')) return;
    popupOverlay.classList.remove('open', 'closing');
    document.body.style.overflow = '';
  }, { once: true });
}

// 이벤트 위임 : 문서 전체에서 한 번만 감지하므로 open-btn이 몇 개든 코드 추가 없이 동작
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.open-btn[data-popup]');
  if (btn) openPopup(btn.dataset.popup);
});

// 닫기 : > 버튼 / 바깥 어두운 영역 클릭 / ESC 키
document.getElementById('popupClose').addEventListener('click', closePopup);
popupOverlay.addEventListener('click', (e) => {
  if (e.target === popupOverlay) closePopup();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closePopup();
});


// iframe 팝업 자동 맞춤 : 내용 영역 높이에 딱 맞는 배율을 실측 계산
const frameWrap = popupContent.querySelector('.duck-iframe');
if (frameWrap){
  frameWrap.style.transform = `scale(${popupContent.clientHeight / 1014})`;
}

function openMockupPopup() {
    var box = document.getElementById('popupBox');
    if (!box.querySelector('.figma-iframe')) {          /* 첫 오픈에만 복제 */
        var tpl = document.getElementById('popup-duck-mockup');
        box.appendChild(tpl.content.cloneNode(true));
    }
    /* 이후는 클래스 토글만 — iframe은 건드리지 않음 */
}

/* 팝업 내부 요소 조작 시 전체 스크롤 위치 초기화 증상 해결 목적 */
var savedScrollY = 0;

function lockScroll() {
    savedScrollY = window.scrollY;                    /* 잠그기 전 위치 저장 */
    document.body.style.overflow = 'hidden';
}

function unlockScroll() {
    document.body.style.overflow = '';
    window.scrollTo(0, savedScrollY);                 /* 원위치 복원 */
}



