#!/bin/sh
WAIT_TIME=300 # 待機時間を300秒に設定

# npm run storybookをバックグラウンドで実行し、標準出力をstorybook.logにリダイレクト
npm run storybook -- --ci | tee ./storybook.log &

# for nextjs started が表示されるまで待つ
echo "Waiting for 'for nextjs started' to appear in the logs..."
START_TIME=$(date +%s)
while true; do
  if grep -q "for nextjs started" ./storybook.log; then
    echo "'for nextjs started' found in the logs."
    break
  fi
  CURRENT_TIME=$(date +%s)
  ELAPSED_TIME=$((CURRENT_TIME - START_TIME))
  if [ "$ELAPSED_TIME" -ge "$WAIT_TIME" ]; then
    echo "Timeout reached after ${WAIT_TIME} seconds. Exiting."
    exit 1
  fi
  sleep 1
done

npm run test-storybook
TEST_RESULT=$?

# storybookのプロセスを取得し、終了
STORYBOOK_PROCESS=$(ps aux | grep 'storybook dev' | grep -v grep | awk '{print $2}')
if [ -n "$STORYBOOK_PROCESS" ]; then
  echo "Killing storybook process with PID: $STORYBOOK_PROCESS"
  kill -9 $STORYBOOK_PROCESS
else
  echo "Storybook process not found"
fi

if [ $TEST_RESULT -ne 0 ]; then
  echo "npm run test-storybook failed. Exiting."
  exit 1
fi