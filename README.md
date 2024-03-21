## 구현해야 할 게임은 Tic Tac Toe 게임의 변형입니다.

두 명의 플레이어가 게임을 하고, 3x3 크기 이상의 게임보드에 자신의 마크를 승리조건으로 설정한 숫자 이상 놓는 쪽이 승리하게 됩니다.

- 게임보드는 3x3, 4x4, 5x5 또는 그 이상의 격자 형태입니다.
- 플레이어 두명은 번갈아 가면서 마크가 없는 격자 칸 하나에 자신의 마크를 표시합니다.
- 마크를 놓았을 때 가로, 세로, 또는 대각선 방향으로 승리조건(최소 3, 최대 게임판의 행 숫자)으로 설정한 숫자로 놓였다면 해당 마크를 놓은 플레이어가 승리합니다.
- 모든 칸이 마킹되었지만 어느 플레이어도 승리하지 못한 경우 무승부가 됩니다.
- 각 플레이어는 게임 종료 전일 경우 각자 3회까지 무르기가 가능합니다. 무르기를 하면 마지막 마크가 놓이기 전의 상황으로 돌아갑니다.
- 플레이어가 자신의 차례일 때 15초 이내에 마크를 놓지 않으면, 빈 칸 중 하나에 랜덤하게 마크를 놓고 차례를 넘기게 됩니다.
- 새 차례가 시작되면 제한 시간은 15초로 초기화 됩니다.

다음 4개의 화면을 구현하면 됩니다.

1. 홈 - 게임 시작 버튼, 기록된 게임 보기 버튼 2개의 버튼이 있어야 합니다.

   1. 게임 시작 버튼으로 2로 이동합니다.
   2. 저장된 게임 버튼으로 4로 이동합니다.

2. 게임 설정 - 아래 설정에 필요한 화면과 시작 버튼이 있어야 합니다.

   1. 게임판의 크기(3x3, 4x4, 5x5, 또는 그 이상)와 승리 조건(최소 3, 최대 게임판의 행 숫자)을 설정할 수 있어야 합니다.
   2. 각 플레이어는 자신의 마크(동그라미, 세모, 네모, 엑스 등)과 마크의 색을 설정 할 수 있습니다. 기본 값은 플레이어1은 X - 파랑, 플레이어2는 O - 빨강 입니다.
   3. 먼저 마크를 놓는 플레이어를 설정할 수 있어야 합니다. 기본값은 랜덤입니다.
   4. 시작 버튼으로 3 으로 이동합니다.

3. 게임 화면- 게임을 진행하는 화면입니다.

   1. 게임을 진행하기 위한 게임보드가 표시되야 합니다.
   2. 두 플레이어에 대한 정보(마크, 마크색, 남은 무르기 횟수)가 있어야 합니다.
   3. 현재 차례에 사용 할 수 있는 남은 시간에 대한 정보가 있어야 합니다.
   4. 현재 마크를 놓을 플레이어가 누구인지 알수 있어야 합니다.
   5. 1 화면으로 이동 할 수 있는 버튼이 있어야 합니다.
   6. 실제 게임을 진행할 수 있어야 합니다. 종료 조건(플레이어 둘중 한명의 승리 혹은 무승부)가 충족되면 게임의 기록을 저장 할 수 있어야 합니다.
   7. 기록한 게임은 4에서 만든 화면에서 확인할 수 있어야 합니다.

4. 기록된 게임 보기 - 이전에 진행한 게임 기록을 확인하는 화면입니다.

   1. 3에서 진행한 게임의 종료 시의 상황을 볼 수 있어야 합니다.
   2. 게임판의 각 마크에는 몇번째로 놓인 마크인지가 표시되어야 합니다.
   3. 1 화면으로 이동 할 수 있는 버튼이 있어야 합니다.