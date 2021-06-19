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
```
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
```
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

## API 목록
<details>
  <summary>User</summary>

-   [X] Create Account
-   [X] See Profile
-   [X] Login
-   [X] Edit Profile
-   [X] CHange Avatar (Image Upload)
-   [x] Follow User
-   [x] Unfollow User
-   [x] See Followers with Paginataion
-   [x] See Follwing with Paginataion
-   [x] Computed Fields
-   [x] Search Users

</details>
<details>
<summary>Photos</summary>

-   [X] Upload Photo (Parse #)
-   [X] See Photo
-   [x] See Hashtags
-   [x] Search Photos
-   [x] Edit Photo
-   [x] Like / Unlike Photo
-   [x] See Photo Likes
-   [ ] See Photo Comments
-   [x] See Feed
-   [X] Is Mine (Delte Photo)

</details>
<details>
<summary>Comments</summary>

-   [X] Comment on Photo
-   [X] Edit Comment
-   [X] Delete Comment (Is Mine)
</details>
<details>
<summary>Refactor</summary>
  
-   [x] Mutation Responses
  
</details>
<details>
<summary>Extras</summary>
  
-   [ ] S3 Image Upload

</details>

## ERROR
- apollo-server fileupload 부분에서 아래와 같은 에러 발생
- fs를 통해 file readStream을 수행한 후 전송 했을 경우에는 발생하지 않았음.
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
2. ```shell npm cache clean --force``` 명령어 실행으로 캐시 초기화
3. ```shell npm i ``` 실행
