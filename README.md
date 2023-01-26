## Brokenman

Brokenman은 간단한 HTTP API 서버로 다음의 엔드포인트가 존재합니다.

| method | endpoint | 설명 |
| ------ | -------- | --- |
| GET | `/` | 첫 화면입니다 |
| GET | `/breakdown` | 이 요청을 보내면 더이상 `/`은 작동하지 않습니다 |
| GET | `/touchdb` | 데이터베이스 연결을 테스트합니다 |
