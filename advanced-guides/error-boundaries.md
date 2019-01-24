# Error Boundaries

+ UI의 일부인 JavaScript 에러는 전체 앱을 망가트려서는 안 된다. 

+ 이러한 문제를 해결하기 위해 React 16은 'error boundary'를 도입함

+  error boundary는 React 컴포넌트로서 자식 컴포넌트 트리에서 발생한 JavaScript 에러를 Catch하고 이러한 에러를 기록하여 에러가 발생한 컴포넌트 트리 대신 폴백 UI를 표시한다. 

+ error boundary는 렌더링, 라이프 사이클 메소드 및 그 아래의 전체 트리 생성자에서 오류를 catch한다. 

+ error boundary가 catch하지 않는 에러

  + 이벤트 핸들러
  + 비동기 코드 (ex: setTimeout, requestAnimationFrame 콜백)
  + 서버 사이드 렌더링
  + error boundary 자체에서 발생한 에러

+ 클래스 컴포넌트는 `getDerivedStateFromError` 또는 `componentDidCatch()` 중 하나(혹은 둘 다) 를 정의하면 error boundary가 된다. 

+ 에러가 발생한 후 `getDrivedStateFromError()`를 사용하여 대체 UI를 렌더링함

+ `componentDidCatch()`를 사용하여 에러 정보를 기록

  ```jsx
  class ErrorBoundary extends React.Component {
      constructor(props) {
          super(props);
          this.state = {hasError: false};
      }
      
      static getDrivedStateFromError(error) {
          // state를 업데이트하여 다음에 폴백 UI를 렌더링한다 
          return {hasError: true};
      }
      componentDidCatch(error, info) {
          // 에러를 기록할 수 있다
          logErrorToMyService(error, info);
      }
      
      render() {
          if(this.state.hasError) {
              // 커스텀 폴백 UI를 렌더할 수 있다
              return <h1>Something went wrong.</h1>
          }
          
          return this.props.children;
      }
  }
  ```

  일반 컴포넌트에서 사용

  ```jsx
  <ErrorBoundary>
  	<MyWidget />
  </ErrorBoundary>
  ```

### Error Boundary의 위치

+ 서버 측 프레임워크가 종종 충돌을 처리하는 것 처럼, 에러 메세지를 표시하기 위해 error boundary를 최상위 컴포넌트로 감쌀 수 있다.
+ 개별 위젯을 error boundary로 랩핑하여 앱의 나머지 부분이 충돌하지 않도록 할 수 있다. 

