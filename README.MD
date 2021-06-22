## 프로젝트 목적 (Instaclone)

인스타그램 클론 코딩 Backend.

## 설치

<details>
<summary>apollo-server , graphql 설치 </summary>
  
```Shell
# NPM
npm install apollo-server graphql

# yarn

yarn add apollo-server graphql

````
</details>
<details>
<summary>babel 설치 </summary>

```Shell
# NPM
npm install --save-dev @babel/core
npm install @babel/preset-env @babel/node --save-dev


# yarn
yarn add --save-dev @babel/core
yarn add @babel/preset-env @babel/node --save-dev
````

</details>

<details>
<summary>Prisma 설치 </summary>

```Shell
# NPM
npm install prisma -D

# yarn
yarn add prisma -D
```

</details>

<details>
<summary>Prisma client 설치 </summary>

```Shell
# NPM
npm install @prisma/client

# yarn
yarn add @prisma/client
```

</details>

<details>
<summary>graphql tools 설치 </summary>

```Shell
# NPM
npm i graphql-tools

# yarn
yarn add graphql-tools]
```

</details>

<details>
<summary>dotenv 설치</summary>

```Shell
# NPM
npm i dotenv

# yarn
yarn add dotenv
```

</details>

## Babel 설정

1. babel.config.json 파일 생성 후 아래 코드 추가

```json
{
    "presets": ["@babel/preset-env"]
}
```

2. package.json script 수정

```json
"script": {
	"dev" : "nodemone --exec babel-node index"
}
```

## Apollo server

-   예제

```javascript
import { ApolloServer, gql } from "apollo-server";
// const { ApolloServer, gql } = require('apollo-server'); 위와 같이 대체
// 단, node 버전이 맞지 않으면 오류가 남 => bable 설치!

// The GraphQL schema
const typeDefs = gql`
    type Query {
        "A simple type for getting started!"
        hello: String
    }
`;

// A map of functions which return data for the schema.
const resolvers = {
    Query: {
        hello: () => "world",
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
```
- **Subscriptions**
	- 오랫동안 지속되는 GraphQl의 read operation
	- http가 아니고 websocket 프로토콜 기반으로 사용
	- apollo server에 기본적으로 **`PubSub`** 가 내장 되어있지만 교육용에 적당, 규모가 큰 실제 상품은 **`RedisPubSub`** 와 같은 다른 pubsub 이용
	- 기본 사용법(미들웨어 사용)
	```javascript
	import { PubSub, gql } from 'apollo-server';
	import {ApolloServer} from "apollo-server-express"
	import http from "http";
	import express from "express";
	
	
	const pubsub = new PubSub();
	const PORT = 4000;
	
	// Schema definition
	const typeDefs = gql`
		 type Query {
			currentNumber: Int
		}

		 type Subscription {
			numberIncremented: Int
		}
	`;

	// Resolver map
	const resolvers = {
		Query: {
			currentNumber() {
				return currentNumber;
			}
		},
		Subscription: {
			numberIncremented: {
				//asyncIterator : trigger들을 listen해줌, trigger는 String이다.
				subscribe: () => pubsub.asyncIterator(['NUMBER_INCREMENTED']),
			},
		}
	};
	
	const apollo = new ApolloServer({
  	typeDefs,
  	resolvers,
  	subscriptions: {
			path: '/subscriptions',
			onConnect: (connectionParams, webSocket, context) => {
				console.log('Client connected');
			},
			onDisconnect: (webSocket, context) => {
				console.log('Client disconnected')
			},
  	},
	});
	
	const app = express();
	apollo.applyMiddleware({ app });
	

	const httpServer = http.createServer(app);
	apollo.installSubscriptionHandlers(httpServer);

	httpServer.listen(PORT, () => {
			console.log(`Server is running on http://localhost:${PORT}`);
	});
	
	let currentNumber = 0;
	function incrementNumber() {
		currentNumber++;
		pubsub.publish('NUMBER_INCREMENTED', { numberIncremented: currentNumber });
		setTimeout(incrementNumber, 1000);
	}
	incrementNumber();
	
	```

## Prisma

-   `shell npx prisma init ` 명령어 실행 => prisma/schema.prisma & .evn 파일 생성
-   .env 파일에 Database 설정

```env
DATABASE_URL = 'postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA'
ex)
DATABASE_URL = 'postgresql://janedoe:janedoe@localhost:5432/janedoe?schema=hello-prisma'
```

-   **`USER`**: The name of your database user
-   **`PASSWORD`**: The password for your database user
-   **`PORT`**: The port where your database server is running (typically **`5432`** for PostgreSQL)
-   **`DATABASE`**: The name of the [database](https://www.postgresql.org/docs/12/manage-ag-overview.html)
-   **`SCHEMA`**: The name of the [schema](https://www.postgresql.org/docs/12/ddl-schemas.html) inside the database

-   prisma/schema.prisma파일 예제

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id      Int      @default(autoincrement()) @id
  email   String   @unique
  name    String?
  posts   Post[]
  profile Profile?
}

```

타입에 ?가 붙으면 unrequired 붙지 않으면 required로 설정

-   데이터 베이스에 User 테이블 생성
-   명령창에 아래 코드 실행

```shell
npx prisma migrate dev init
```

## Prisma client

-   예제

```javascript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const userAccount = async ({ name, email }) => {
    await prisma.user.create({
        data: {
            name,
            email,
            posts: {
                create: { title: "Hello World" },
            },
            profile: {
                create: { bio: "I like turtles" },
            },
        },
    });
};

const allUsers = async () => {
    await prisma.user.findMany({
        include: {
            posts: true,
            profile: true,
        },
    });
};
```

-   prisma client 조건 및 사용법 참조
-   Link: **https://www.prisma.io/docs/concepts/components/prisma-client/crud**

## graphql-tools

-   같은 패턴의 이름을 가진 파일을 한번에 찾아 merge 시킬 수 있다.
-   예제

```javascript
import { loadFilesSync, mergeTypeDefs, mergeResolvers } from "graphql-tools";

const loadedTypeDefs = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
const typeDefs = mergeTypeDefs(loadedTypeDefs);

const loadedResolvers = loadFilesSync(
    `${__dirname}/**/*.{queries,mutations}.js`
);
const resolvers = mergeResolvers(loadedResolvers);

const schema = makeExecutableSchema({ typeDefs, resolvers });
```

## dotenv

-   .env파일을 읽을 수 있다.
-   가장 상위 폴더에 선언해 준다.
-   사용법

```js
require('dotenv').config()
import ...
...
...

const PORT = process.env.PORT;
```

## API 목록

<details>
  <summary>User</summary>

-   [x] Create Account
-   [x] See Profile
-   [x] Login
-   [x] Edit Profile
-   [x] CHange Avatar (Image Upload)
-   [x] Follow User
-   [x] Unfollow User
-   [x] See Followers with Paginataion
-   [x] See Follwing with Paginataion
-   [x] Computed Fields
-   [x] Search Users

</details>
<details>
<summary>Photos</summary>

-   [x] Upload Photo (Parse #)
-   [x] See Photo
-   [x] See Hashtags
-   [x] Search Photos
-   [x] Edit Photo
-   [x] Like / Unlike Photo
-   [x] See Photo Likes
-   [x] See Photo Comments
-   [x] See Feed
-   [x] Delte Photo

</details>
<details>
<summary>Comments</summary>

-   [x] Comment on Photo
-   [x] Edit Comment
-   [x] Delete Comment
</details>
<details>
<summary>Refactor</summary>

-   [x] Mutation Responses

</details>
<details>
<summary>Extras</summary>
  
-   [x] S3 Image Upload

</details>
<details>
<summary>DMs</summary>
  
-    [x] See Rooms
-    [x] Send Message (Create Room)
-    [x] See Room
-    [x] Computed Fields
-    [x] See (Read) Message
-    [x] Realtime Messages

</details>

## ERROR

-   apollo-server fileupload 부분에서 아래와 같은 에러 발생
-   fs를 통해 file readStream을 수행한 후 전송 했을 경우에는 발생하지 않았음.

```shell
(node:53998) [DEP0135] DeprecationWarning: ReadStream.prototype.open() is deprecated

(Use node --trace-deprecation ...to show where the warning was created)
```

원인 : node.js v.14이후로 나오는 에러..

해결 방법

```json
// package.json
// 1. 맨 아래에 추가
"resolutions": {
    "fs-capacitor": "^6.2.0",
    "graphql-upload": "^11.0.0"
  }

// 2. preinstall script 생성

"preinstall":"npx npm-force-resolutions"
```

[pakage.json]

1. 위와 같이 package.json에 추가후 node_modules 삭제
2. `shell npm cache clean --force` 명령어 실행으로 캐시 초기화
3. `shell npm i ` 실행
