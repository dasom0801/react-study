# Accessibility

+ 모든 사람이 사용할 수 있는 웹 사이트
+ 보조 기술로 웹 페이지를 해석 할 수 있도록 접근성 지원이 필요함
+ 리액트는 표준 HTML을 사용하여 액세스 가능한 웹 사이트를 완벽 지원

### WAI-ARIA

+ Web Accessibility Initiative - Accessible Rich Internet Applications

+ 모든 `aria-*` 속성은 JSXㅇ서 완벽하게 지원됨

+ 리액트의 대부분의 DOM 속성은 camelCase이지만, aria속성은 하이픈 케이스(cbab-case, lisp-case)

  ```jsx
  <input
      type="text"
      aria-label={labelText}
      aria-required="true"
      onChange={onchangeHandler}
      value={inputValue}
      name="name"
  />
  ```

### Semantic HTML

+ 시팬틱 HTML은 접근성의 기초
+ 다양한 HTML 요소를 사용하여 웹 사이트에서 정보 의미를 강화 
+ 리액트 코드가 작동하기 위해서 목록이나 테이블에 `<div>` 요소를 JSX에 추가 할 때 HTML의 의미를 깨트릴 수있다. 이 경우는 `React.Fragment` 를 사용하자

### Accessible Forms

+ `<input>` 과 `<textarea>`와 같은 모든 HTML Form 컨트롤에는 레이블을 지정해야 함(스크린 리더가 설명을 읽을 수 있게) 

+ 리액트에서 `for` 속성 대신에 `htmlFor`을 사용한다

  ```jsx
  <label htmlFor="namedInput">Name:</label>
  <input id="namedInput" type="text" name="name" />
  ```

### Focus Control

+ 키보드로만 완벽하게 작동할 수 있는지 확인하라!

#### 키보드 포커스와 포커스 아웃라인

+ 키보드 포커스는 키보드로 선택된 현재 DOM요소를 나타낸다.
+ 기본적으로 파란색 아웃라인이 생긴다
+ 포커스를 다른 방식으로 표현하는 경우만 CSS에서 `outline: 0`을 적용하여 제거할 것

#### 원하는 내용으로 건너뛰기

+ 원하는 내용으로 건너뛰는 기능을 제공하여 사용자의 키보드 탐색을 돕고 빠르게 한다.
+ Skiplink, Skip Navigation Likns는 키보드로 사용자가 조작할 때만 표시되는 숨겨진 탐색 링크

#### 프로그래밍으로 포커스 관리

+ 리액트는 런타임중에 HTML DOM을 지속적으로 수정하며 때문에 키보드 포커스가 손실되거나 예기치 않은 요소로 설정된다. > 프로그래밍으로 키보드 포커스를 올바른 방향으로 이동시켜야함

+ 예) 모달 창을 닫은 후에 모달 창을 연 다추에 포커스를 다시 설정

+ 리액트에서 포커스를 설정하려면 DOM요소에 대한 Refs를 사용할 수 있다. 

  ```javascript 
  class CustomTextInput extends React.Component {
      constructor(props) {
          super(porps);
          // textInput DOM 요소를 저장하기 위해 ref를 만든다.
          this.textInput = React.createRef();
      }
      render() {
          // input DOM에 대한 참조를 저장하기 위해 'ref' 콜백을 사용함 
          return (
              <input type="text" ref={this.textInput}/>
          );
      }
  }
  
  focus() {
      this.textInput.current.focus();
  }
  ```

+ 부모 컴포넌트가 자식 컴포넌트에 포커스를 설정해야할 때도 있다.

  ```javascript
  function CustomTextInput(props) {
      return (
      	<div>
          	<input ref={props.inputRef} />
  		</div>
      );
  }
  
  class Parent extends React.Component {
      constructor(props) {
          super(props);
          this.inputElement = React.createRef();
      }
      render() {
          return (
          	<CustomTextInput inputRef={this.inputElement} />
          );
      }
  }
  
  this.inputElement.current.focus();
  ```

### 마우스와 포인터 이벤트

+ 마우스나 포인터 이벤트의 모든 기능에 키보드만 사용하여 접근 가능한지 확인하라. 포인터 장치에만 의존하면 키보드 사용자가 배제된다.

### 고려해야할 기타 사항

+ 언어 설정 
  +  스크린리더가 올바른 음성 설정을 선택할 때 사용 `<html lang="en">`
+ 문서 타이틀 설정 
  + 사용자가 현재 페이지의 컨텍스트를 알 수 있도록 페이지의 컨텐트를 올바르게 설명한 `<title>`을 설정한다. 
+ 색 대비
  + 시력이 약한 사용자가 최대한 읽을 수 있도록 텍스트의 색 대비가 충분한지 확인 

### 개발과 테스팅 툴

+ 키보드

  + 가장 쉽고 중요한 검사중 하나 전체 웹사이트를 키보드만으로 사용가능한지 확인 하는 것 
  + `Tab`과 `Shift`+`Tab`만으로 탐색
  + `Enter`로 요소 활성화
  + 필요한 경우 화살표키로 메뉴, 드롭다운 같은 요소 확인

+ 개발 보조

  + eslint-plugin-jsx-a11y : JSX 접근성 문제와 관련하여 피드백 제공

  + `.eslintrc`파일 만들어서 플러그인 추가

    ```
    {
      "extends": ["react-app", "plugin:jsx-a11y/recommended"],
      "plugins": ["jsx-a11y"]
    }
    ```

+ 브라우저에서 테스트하기

  + aXe, aXe-core and react-axe : https://github.com/dequelabs/axe-core
  + WebAIM WAVE : http://wave.webaim.org/extension/
  + Accessibility inspectors and the Accessibility Tree :https://developer.paciellogroup.com/blog/2015/01/the-browser-accessibility-tree/

+ 스크린 리더

  + 브라우저와 스크린 리더의 조합은 중요. 선택한 스크린 리더에 가장 적합한 브라우저에서 응용 프로그램을 테스트하는 것이 좋다
  + NVDA in Firefox
  + VoiceOver in Safari
  + JAWS in Internet Explorer
  + ChromeVox in Google Chrome



