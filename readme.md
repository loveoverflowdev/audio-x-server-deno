**AUDIO APP** 

1. Get Novel List
```ts
GET: api/app/novel-list/?{name: string}&{tag[]: number[]}
```

2. Get Novel
```ts
GET: api/app/novel/{id: string}
```
3. Get Novel Chapter
```ts
GET: api/app/novel-chapter/{id: string}
```
4. Get Novel Tag List
```ts
GET: api/app/novel-tag-list/{index}
```
```ts
index == 0: All
index == 1: Dashboard only
index == 2: Search only
```

&nbsp;
**ADMIN**

5. Post Novel
```ts
POST: api/admin/novel

body:
{
	id: string;
	author: string;
	introduction: string;
	tag: number[];
	imageUrl: string;
	chapterList: Chapter[];
}
```
6. Put Novel
```ts
PUT: api/admin/novel

body:
{
	id: string;
	author: string;
	introduction: string;
	tag: number[];
	imageUrl: string;
	chapterList: Chapter[];
}
```

7. Post New Chapter
```ts
POST: api/admin/novel-chapter

body:
{
	id: string;
	novel_id: string;
	index: number;
	name: string;
	source: string;
}
```
8. Put New Chapter
```ts
PUT: api/admin/novel-chapter

body:
{
	id: string;
	novel_id: string;
	index: number;
	name: string;
	source: string;
}
```
&nbsp;

**MODEL**
```ts
Novel {
	id: string;
	author: string;
	introduction: string;
	tag: number[];
	imageUrl: string;
	chapterList: Chapter[];
}

NovelChapter {
	id: string;
	index: number;
	name: string;
	source: string;
}

NovelTag {
	name: string;
	index: number;
}
```
