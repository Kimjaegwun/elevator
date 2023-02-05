![Skill](./assets/elevator.gif)

## `실행 방법`

- android

1. npm install
2. android studio 실행 > Device Manager에서 devie 실행
3. android 폴더 > local.properties 에서 sdk 위치를 /Users/(username)/Library/Android/sdk 형식으로 변경
   > terminal에서 npx react-native run-android 입력

- ios
  : npm install > xcode 실행 > ios 폴더 > xcworksapce 선택 > ios device 실행

## `폴더 구조`

- src
  - components
    - Box, Button, ...
  - navigation
    - root
  - screens
    - screen components, ...
  - types

* components - input이나 button 등을 컴포넌화를 시켜 분류
* navigation - root를 만들어 stack navigator 구조 생성
* screens - nav에 해당하는 screen component를 추가
* types - typescript 형식을 고려하여 type에 대한 변수 생성

## `코드`

- MakeElevator
  : 첫 화면으로 층수 및 엘리베이터 개수를 입력할수 있도록 inputform 및 button component를 활용하여 작성

- Elevators
  : 실제 층수 및 엘리베이터 모델을 구현한 화면으로 원하는 층을 누를시 clickFloor 함수를 통해 가장 가까운 E/V를 찾고
  해당 층수로 움직이도록 하였습니다. 그리고 각 층마다의 대기시간을 주기위해 wait 함수를 promise를 통해 비동기 처리를 함으로써
  대기시간을 주었습니다. E/V가 이동하는 움직임을 표현하기 위해 animtated view를 사용하였습니다. 그리고, 추가로 엘레베이터 운행시에는 새로운 모델이 생성하지 못하도록 하였습니다.

- screen design
  : scrollview와 flatlist를 활용하여 화면의 스크로를 구현하였습니다. 기본적으로 동일한 컴포넌트들이 반복되거나
  데이터 크기가 가변적인 곳에서는 flatlist를 활용하여 화면에 보여지는 부분만을 렌더링 함으로써 퍼포먼스 향상시키고자 하였습니다.
  그리고 animated를 사용해 modal을 구현하여 이용가능한 E/V가 없을시 toast가 나오도록 구현하였습니다.

## `Tech Stack`

- typescript
  : type 작성을 통해 코드에 목적을 명시하고 타입의 변수나 함수들에서 타입 추론을 통해 에러를 최소화하였습니다.
  컴파일 단계에서 오류를 예방할 수 있어 생산성을 향상하였습니다.

- react-hooks
  :useState를 사용하여 component 상태관리 / useEffect를 활용하여 life cycle에 맞춰 렌더링 될 때마다 특정 작업을 수행할 수 있도록하였습니다. 그리고 memo를 활용하여 함수형 컴포넌트 내부에서 발생하는 연산을 최적화하기 위해 노력하였습니다.

- react-native-navigation
  :react-native navigation을 이용하며 화면 이동을 하며, stack 구조로 screen이 쌓이도록 구현하였습니다.
