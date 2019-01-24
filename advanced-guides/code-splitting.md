# Code-Splitting

### 번들링

+ 대부분의 리액트 앱은 Webpack이나 Browserify같은 툴을 사용해서 번들된 파일은 갖는다.
+ '번들링'은 import한 파일을 하나의 파일, 즉 '번들'로 병합하는 프로세스
+ 웹페이지는 한 번에 전체 앱을 로드한다.

### 코드 분할

+ 앱이 커짐에 따라 번들도 커짐, 대형 서드파티 라이브러리를 포함한 경우는 특히. 
+ 실수로 너무 커져서 앱을 로드하는데 오랜 시간이 걸리지 않게 번들에 포함된 코드를 주의 깊게 관찰해야 함. 
+ 코드 분할하면 사용자가 현재 필요로하는 것만 lazy-load할 수 있어서 앱의 성능을 향상시킬 수 있다. 
+ 앱의 전체 코드 양을 줄이지는 않지만, 사용자가 필요하지 않을 수도 있는 코드를 로드하는 것을 피하고 초기로드 중에 필요한 코드의 양을 줄임.

### import()

+ 앱을 분할하는 가장 좋은 방법은 동적 import() 구문을 사용하는 것

  ```javascript
  import('./math').then(math => {
      console.log(math.add(16,26));
  });
  ```

  + 동적 import()는 아직 표준이 아님

### React.lazy

+ React.lazy와 Suspense는 서버 사이드 렌더링에서 아직 사용할 수 없음

  ```jsx
  const OtherComponent = React.lazy(() => import('./OtherComponent'));
  
  function MyComponent() {
      return (
      	<div>
          	<OtherComponent />
          </div>
      );
  }
  ```

  + 이 컴포넌트가 렌더링되면 OtherComponent를 포함한 번들이 자동적으로 로드된다.

+ **Suspense**

  + MyComponent를 렌더링 할 때 OtherComponent가 포함 된 모듈이 아직 로드되지 않은 경우 로딩중 같은 내용을 표시해야함. 
  + fallback porps는 컴포넌트가 로드 될 동안 렌더링함. 모든 React 요소를 허용.
  + 서스펜스 컴포넌트는 lazy 컴포넌트 상위에 둘 수있다. 
  + 하나의 서스펜스 컴포넌트로 여러 lazy 컴포넌트를 감쌀 수도 있다.

  ```jsx
  const OtherComponent = React.lazy(() => import('./OtherComponent'));
  
  function MyComponent() {
      return (
          <div>
          	<Suspense fallback={<div>Loading...</div>}
          		<OtherComponent />
          	</Suspense>
          </div>
      );
  }
  ```

+ **오류 경계**

  + 네트워크 장애등으로 인해 모듈 로드에 실패하면 오류가 트리거 됨
  + 이러한 오류를 처리하여 UX를 개선하고 복구 관리를 할 수 있다. 
  + Error Boundary를 만들면 네트워크 오류가 발생했을 때 오류 상태를 표시하기 위해서 lazy 컴포넌트 상위 아무 곳에나 사용 가능

  ```jsx
  import MyErrorBoundary from './MyErrorBoundary';
  const OtherComponent = React.lazy(() => import('./OtherComponent'));
  const AnotherComponent = Ract.lazy(() => import('./AnotherComponent'));
  
  const MyComponent = () => (
  	<div>
      	<MyErrorBoundary>
          	<Suspense fallback={<div>Loading...</div>}>
              	<section>
                  	<OtherComponent />
                      <AnotherComponent />
                  </section>
              </Suspense>    
          </MyErrorBoundary>
      </div>
  )
  ```

### Route 기반 코드 분할

+ 라우트에 따라서 코드 분할을 하면 좋음. 

+ 대부분의 경우 페이지를 전환할 때 로드하는 시간이 소요된다.

  ```jsx
  import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
  import React, {Suspense, laxy} from 'react';
  
  const Home = lazy(() => import('./routes/Home'));
  const About = lazy(() => import('./routes/About'));
  
  const App = () => (
  	<Router>
      	<Suspense fallback={<div>Loading...</div>}>
          	<Switch>
              	<Route exact path="/" component={Home}/>
                  <Route path="/about" component={About}/>
              </Switch>
          </Suspense>
      </Router>
  );
  ```

