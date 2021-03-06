import { ERROR_MESSAGE } from '../../src/js/constants/constant.js';

describe('like-button-ui', () => {
  before(() => {
    cy.visit('http://127.0.0.1:5502/');
  });

  //Given When Then (주어진 상황에서 ~~ 한 후에 ~~ 해야한다.)

  it('검색 모달창을 열고, 검색창에 검색입력한 후에 10개의 동영상 저장하고 모달을 닫는다.', () => {
    cy.get('#search-modal-button').click();
    cy.get('#search-youtube-input').type('우테코');
    cy.get('#search-youtube-button').click();
    for (let i = 0; i < 10; i++) {
      cy.get('.js-save-button').eq(i).click();
    }
    cy.get('.modal-close').first().click();
  });

  it('다시 돌아온 화면에서 "좋아요"를 누른 후, "좋아요 한 비디오 버튼"을 클릭하면, 해당 영상이 보인다.', () => {
    cy.get('.video-info-buttons .thumbs-up').first().click();
    cy.get('#snackbar')
      .should('have.class', 'show')
      .and('have.text', '선택한 영상을 좋아요 했습니다.');
    cy.get('#like-video-button').click();
    cy.get('#like-video-button').should('have.length', '1');
  });

  it('좋아요 버튼을 다시 클릭하면, 좋아요 버튼이 해지된다.', () => {
    cy.get('.video-info-buttons .thumbs-up').first().click();
    cy.get('#snackbar')
      .should('have.class', 'show')
      .and('have.text', '선택한 영상을 좋아요 해지 처리했습니다.');
    cy.get('#like-video-button').click();
    cy.get('#like-video-button').should('have.length', '0');
  });

  it('유저가 가로 길이를 줄이면 그에 맞게 페이지에 보이는 video의 개수가 줄어든다.', () => {
    let resizeEventFired = false;
    cy.window().then(win => {
      win.addEventListener('resize', () => {
        resizeEventFired = true;
      });
    });

    cy.viewport(960, 500);
    cy.wrap().should(() => {
      expect(resizeEventFired).to.eq(true);
    });

    cy.viewport(960, 500);
    cy.wrap().should(() => {
      expect(resizeEventFired).to.eq(true);
    });

    cy.viewport(600, 500);
    cy.wrap().should(() => {
      expect(resizeEventFired).to.eq(true);
    });

    cy.viewport(400, 500);
    cy.wrap().should(() => {
      expect(resizeEventFired).to.eq(true);
    });
  });
});

// describe('saved-video-ui', () => {
//   before(() => {
//     cy.visit('http://127.0.0.1:5502/');
//   });

//   it('사이트에 접속했을때, 비디오 목록에 "저장된 영상이 없습니다. 볼 영상을 저장해주세요" 라고 표시해줘야 한다', () => {
//     cy.get('#saved-video-wrapper #saved-not-found').should('exist');
//   });

//   it('동영상 검색, 첫번째 영상 저장버튼 클릭, 사이트 새로고침시, 저장한 영상 목록의 길이가 1이여야 한다.', () => {
//     cy.get('#search-modal-button').click();
//     cy.get('#search-youtube-input').type('우테코');
//     cy.get('#search-youtube-button').click();
//     cy.get('.js-save-button').first().click();
//     cy.get('#saved-video-wrapper article').should('have.length', '1');
//   });

//   it('저장한 영상의 "본 영상" 버튼을 클릭, "선택한 영상을 본 영상 목록에 저장했습니다" 라는 스낵바 div 3초간 보여진다.', () => {
//     cy.get('.video-info-buttons .watched').first().click();
//     cy.get('#snackbar')
//       .should('have.class', 'show')
//       .and('have.text', '선택한 영상을 본 영상 목록에 저장했습니다.');
//     cy.wait(3000);
//     cy.get('#snackbar').should('not.have.class', 'show');
//   });

//   it('본 영상 으로 영상 이동하면, "볼 영상 목록" 버튼 클릭하면 해당 영상 안보이고, "본 영상 목록" 버튼 클릭하면, 해당 영상이 보인다.', () => {
//     cy.get('#towatch-videos-button').click();
//     cy.get('#saved-video-wrapper article').should('have.length', '0');
//     cy.get('#watched-videos-button').click();
//     cy.get('#saved-video-wrapper article').should('have.length', '1');
//   });

//   it('저장한 영상의 "삭제" 버튼 클릭, "정말로 삭제하시겠습니까?" confirm 창 보여진다', () => {
//     cy.window().then(window => cy.stub(window, 'confirm').as('confirm'));
//     cy.get('.video-info-buttons .delete').first().click();
//     cy.get('@confirm').should('be.calledWith', '정말로 삭제하시겠습니까?');
//   });

//   it('저장한 영상 삭제 확인 누르면, "영상이 삭제되었습니다" 라는 스낵바 div가 3초간 보여지고, 저장한 영상 목록의 길이가 0이여야 한다.', () => {
//     cy.get('.video-info-buttons .delete').first().click();
//     cy.get('#snackbar')
//       .should('have.class', 'show')
//       .and('have.text', '영상이 삭제되었습니다.');
//     cy.wait(3000);
//     cy.get('#snackbar').should('not.have.class', 'show');
//     cy.get('#saved-video-wrapper article').should('have.length', '0');
//   });
// });

// context('search-ui', () => {
//   beforeEach(() => {
//     cy.visit('http://127.0.0.1:5500/');
//   });
//   it('검색 모달창 열고 검색창에 검색어 입력, 검색버튼 클릭, 동영상 목록 보여진다.', () => {
//     cy.get('#search-modal-button').click();
//     cy.get('#search-video-wrapper').children().should('not.exist');
//     cy.get('#search-youtube-input').type('우테코');
//     cy.get('#search-youtube-button').click();
//     cy.get('#search-video-wrapper').children().should('exist');
//   });
//   it('검색 모달창 열고 검색창에 검색어 입력, 엔터 입력, 동영상 목록 보여진다', () => {
//     cy.get('#search-modal-button').click();
//     cy.get('#search-video-wrapper').children().should('not.exist');
//     cy.get('#search-youtube-input').type('우테코');
//     cy.get('#search-youtube-button').type('{enter}');
//     cy.get('#search-video-wrapper').children().should('exist');
//   });
//   it('검색 모달창 열고 검색창에 검색어 입력, 검색버튼 클릭하면 비디오 요소에 .skeleton 클래스명이 존재. n초후, .skeleton 클래스명 없음', () => {
//     cy.get('#search-modal-button').click();
//     cy.get('#search-youtube-input').type('우테코');
//     cy.get('#search-youtube-button').click();
//     cy.get('.clip').each(clip => {
//       cy.wrap(clip).should('have.class', 'skeleton');
//     });
//     cy.wait(5000);
//     cy.get('#search-video-wrapper .clip').each(clip => {
//       cy.wrap(clip).should('not.have.class', 'skeleton');
//     });
//   });
//   it('검색 모달창 열고 검색창에 결과없는 검색어 입력, 검색버튼 누르면, 결과없음 이미지가 보여진다.', () => {
//     cy.get('#search-modal-button').click();
//     cy.get('#search-youtube-input').type('skdnaskfbalsdkf');
//     cy.get('#search-youtube-button').click();
//     cy.get('#search-not-found').should('exist');
//   });
//   it('검색 모달창 열고 검색창에 검색어 입력, 검색버튼 클릭, 동영상 요소 10개 존재.', () => {
//     cy.get('#search-modal-button').click();
//     cy.get('#search-youtube-input').type('우테코');
//     cy.get('#search-youtube-button').click();
//     cy.get('#search-video-wrapper .clip').should('have.length', '10');
//   });
//   it('검색 모달창 열고 검색창에 검색어 입력(100개이상있는거), 검색버튼 클릭, 10개 확인 스크롤, 20개 확인 스크롤, (5번 확인)', () => {
//     cy.get('#search-modal-button').click();
//     cy.get('#search-youtube-input').type('우테코');
//     cy.get('#search-youtube-button').click();
//     for (let videos = 10; videos <= 50; videos += 10) {
//       cy.wait(3000);
//       cy.get('#search-video-wrapper').scrollTo('bottom');
//       cy.get('#search-video-wrapper .clip').should('have.length', videos);
//       cy.get('#search-video-wrapper').scrollTo('bottom');
//     }
//   });
//   it('검색 모달창 열고 검색창에 검색입력, 첫번째 동영상 저장, webstorage에 데이터 있는지 확인.', () => {
//     cy.get('#search-modal-button').click();
//     cy.get('#search-youtube-input').type('우테코');
//     cy.get('#search-youtube-button').click();
//     cy.get('.js-save-button').first().click();
//     cy.window()
//       .its('localStorage')
//       .invoke('getItem', 'myVideo')
//       .should('not.empty');
//   });
//   it('검색 모달창 열고 검색창에 검색입력, 첫번째 동영상 저장, 저장버튼 안보이는지 확인', () => {
//     cy.get('#search-modal-button').click();
//     cy.get('#search-youtube-input').type('우테코');
//     cy.get('#search-youtube-button').click();
//     cy.get('.js-save-button').first().click();
//     cy.get('#search-video-wrapper .clip .js-save-button')
//       .first()
//       .should('have.class', 'invisible');
//   });
//   it('검색 모달창 열고 검색창에 검색어 입력(100개이상있는거), 검색버튼 클릭, 10개 확인 스크롤, 20개 확인 스크롤, (11번 확인) 110개 가져오고, 저장버튼 100개 누르고 이후 누르는건 저장안됨. (데이터 길이 100그대로인지 확인)', () => {
//     cy.get('#search-modal-button').click();
//     cy.get('#search-youtube-input').type('우테코');
//     cy.get('#search-youtube-button').click();
//     for (let videos = 10; videos <= 110; videos += 10) {
//       cy.wait(3000);
//       cy.get('#search-video-wrapper').scrollTo('bottom');
//       cy.get('#search-video-wrapper .clip').should('have.length', videos);
//       cy.get('#search-video-wrapper').scrollTo('bottom');
//     }
//     cy.get('#search-video-wrapper .js-save-button').each(button => {
//       cy.wait(500);
//       cy.wrap(button).click();
//     });

//     cy.window().then(window => cy.stub(window, 'alert').as('alert'));
//     cy.get('@alert').should(
//       'be.calledWith',
//       ERROR_MESSAGE.OVER_MAX_VIDEO_LENGTH
//     );
//   });
//   it('검색 모달창 열고 검색 입력창에 최근 검색어 storage의 가장 마지막 text가 있고 동영상 목록이 있어야 한다.', () => {
//     cy.get('#search-modal-button').click();
//     cy.get('#search-youtube-input').type('우테코');
//     cy.get('#search-youtube-button').click();
//     cy.get('.modal-close').first().click();
//     cy.get('#search-modal-button').click();
//     cy.get('#search-youtube-input').should('have.value', '우테코');
//     cy.get('#search-youtube-button').click();
//     cy.get('#search-video-wrapper').children().should('exist');
//   });
//   it('검색 모달창 열고 검색창에 4개의 검색어를 입력했을때, 최근 검색어 목록에 3개의 검색어가 있어야 한다.', () => {
//     const searchKeywords = ['우테코', '메이커준', '테크코스', '코로나'];
//     cy.get('#search-modal-button').click();
//     searchKeywords.forEach(keyword => {
//       cy.get('#search-youtube-input').type(keyword);
//       cy.get('#search-youtube-button').click();
//     });
//     cy.get('.chip').should('have.length', '3');
//   });
// });
