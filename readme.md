**AUDIO APP** 

1. Get Novel List By Name And Tag
```ts
GET: api/app/novel-list/?{name: string}&{tag_index: number[]}
```

2. Get Novel By Id
```ts
GET: api/app/novel/{id: string}
```

3.  Get Novel Chapter List By Novel Id
```ts
GET: api/app/novel-chapter-list/{novel_id: string}
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
	author: string;
	introduction: string;
	tag: number[];
	imageUrl: string;
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
}
```

7. Post New Chapter
```ts
POST: api/admin/novel-chapter

body:
{
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
}

NovelChapter {
	id: string;
	novel_id: string;
	index: number;
	name: string;
	source: string;
}

NovelTag {
	name: string;
	index: number;
}
```
