## Brokenman

### Deploy
1. AWS Access Key 및 Secret을 GitHub Actions Secret에 저장해야 합니다. 키는 다음과 같습니다.
    - `AWS_ACCESS_KEY_ID`
    - `AWS_SECRET_ACCESS_KEY`
2. 프로비저닝 후, 처음 단 한번 ECS 태스크 정의로부터 JSON을 복사하여 `.aws/task-definition.json` 파일에 붙여넣기해야 합니다.

### APIs
Brokenman은 간단한 HTTP API 서버로 다음의 엔드포인트가 존재합니다.

| method | endpoint | 설명 |
| ------ | -------- | --- |
| GET | `/` | 첫 화면입니다 |
| GET | `/breakdown` | 이 요청을 보내면 더이상 `/`은 작동하지 않습니다 |
| GET | `/touchdb` | 데이터베이스 연결을 테스트합니다 |
