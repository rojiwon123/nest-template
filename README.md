# NestJS Template

<div align=center>

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

</div>

nestjs 프로젝트를 빠르게 시작하기 위한 간단한 템플릿 환경입니다.

[nestia](https://nestia.io)를 사용해 정확도 높은 **문서 자동화**와 **DTO 검증** 환경을 제공합니다.

[prisma-markdown](https://github.com/samchon/prisma-markdown)를 사용해 prisma schema를 mermaid 형식의 다이어그램으로 빌드합니다.

### nestia 적용한 엔드포인트 정의 예시

```ts
import { Controller, Get, Param } from "@nestjs/common";

import { Article } from "@/app/article/article.dto";

@Controller("articles")
export class ArticlesController {
    /**
     * JsDoc 주석으로 작성한 내용이 API 문서에 반영됩니다.
     *
     * @summary Get article
     * @tag Article
     * @security bearer
     * @param article_id id of article
     * @return Article Detail
     */
    @Get(":article_id")
    async get(@Param("article_id") article_id: string & typia.tags.Format<"uuid">): Promise<Article> {
        throw Error("not impl");
    }
}
```

## Appendix

- [Nestia 공식 가이드](https://nestia.io/docs/)
- [Typia 공식 가이드](https://typia.io/docs/)
- [prisma-markdown](https://www.npmjs.com/package/prisma-markdown)
